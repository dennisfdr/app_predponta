
import { useFormik } from 'formik'
import { 
    AutoComplete, 
    AutoCompleteChangeParams, 
    AutoCompleteCompleteMethodParams 
} from 'primereact/autocomplete'
import { FormEvent, useEffect, useRef, useState } from 'react'


import { 
    useEmpresaService, 
    useMaquinaService, 
    useMaquinaEquipamentoService, 
    useComponenteService,
    useMedicaoService,
    useArquivoUploadService } from 'app/services'

import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Dialog } from 'primereact/dialog'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Dropdown } from 'primereact/dropdown'
import { validationScheme } from './validationScheme'
import { Maquina } from 'app/model/maquinas'
import { Empresa } from 'app/model/empresas'
import { HistoricoComponente } from 'app/model/historico_componentes'
import { MaquinaEquipamento } from 'app/model/maquina_equipamentos'
import { Componente } from 'app/model/componentes'
import React from 'react'
import useSWR from 'swr'
import { AxiosResponse } from 'axios'
import { httpClient } from 'app/http'
import { getEnvironmentData } from 'worker_threads'
import { Checkbox } from 'primereact/checkbox'
import { Toast } from 'primereact/toast'
import { TabPanel, TabView } from 'primereact/tabview'
import { ArquivoUpload } from 'app/model/arquivoUpload'
import { Calendar } from 'primereact/calendar'

import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import Link from 'next/link'
import { useRouter } from 'next/router'


interface ArquivoUploadFormProps {
    onSubmit: (arquivoUpload: ArquivoUpload) => void;
   
}

const formScheme: ArquivoUpload = {
    aruCodigo: '',
    aruDescricao: '',
    aruArquivo: null,
    aruNomeOriginalArquivo:'',
    aruData:'',
    empresa: null 
    
}

export const ArquivoUploadForm: React.FC<ArquivoUploadFormProps> = ({
    onSubmit,
   
}) => {

    
    const maquinaService = useMaquinaService();
    const empresaService = useEmpresaService();
    const maquinaEquipamentoService = useMaquinaEquipamentoService();
    const componenteService = useComponenteService();
    
    const [ listaEmpresas, setListaEmpresas ] = useState<Empresa[]>([])
    const [ mensagem, setMensagem] = useState<string>('')
    const [ maquina, setMaquina ] = useState<Maquina>(null);
    const [ empresa, setEmpresa] = useState<Empresa>(null);
   // const [ listaSetor, setListaSetor] = useState<Setor[]>([])
    const [ listaMaquina, setListaMaquina ] = useState<Maquina[]>([]);
    const [ listaMaquinaEquipamento, setListaMaquinaEquipamento ] = useState<MaquinaEquipamento[]>([]);
    const [ listaComponente, setListaComponente ] = useState<Componente[]>([]);
   // const [ listaMedicao, setListaMedicao ] = useState<Medicao[]>([]);

    const [ maquinaEquipamento, setMaquinaEquipamento ] = useState<MaquinaEquipamento>(null);
    const [ componente, setComponente ] = useState<Componente>(null);
 //   const [ setor, setSetor ] = useState<Setor>(null);



    const [globalFilter, setGlobalFilter] = useState<string>();
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable>(null);

   const [selectedArquivoUpload, setSelectedArquivoUpload] = useState<ArquivoUpload[]>([]);
    const [ maquinas, setMaquinas ] = useState<Maquina[]>([]);

    const [deleteEmpresasDialog, setDeleteEmpresasDialog] = useState(false);

    const [ date1, setAlteraData1 ] = useState<Date | Date[] | undefined>(undefined);

     /*Copiar estas variávies*/
     const [ entidades, setEntidades ] = useState<ArquivoUpload[]>([]);
     const [ entidade, setEntidade ] = useState<ArquivoUpload>(null);
     const [mostraBotao, setMostraBotao] = useState(false);
     const [deleteDialog, setDeleteDialog] = useState(false);
     const [entidadeDialog, setEntidadeDialog] = useState(false);
     const [submitted, setSubmitted] = useState(false);
     const entidadeService = useArquivoUploadService();
     const router = useRouter() 
     const {    query: { id },  } = router

    /*Tratamento de Imagens*/
    const [images, setImages] = useState([])
    const [imageURLS, setImageURLS] = useState([])

    //Usando na imagem
    const [ aruDescricaoVisao, setAruDescricaoVisao ] = useState<string>('');
    const [ aruNomeOriginalArquivoVisao, setAruNomeOriginalArquivoVisao ] = useState<string>('');
    const [ aruDataVisao, setAruDataVisao ] = useState<Date | Date[] | undefined>(undefined);
    const [ aruArquivoVisao, setAruArquivoVisao] = useState(null);
    const [ index, setIndex] = useState(0);
    

    

    const formik = useFormik<ArquivoUpload>({
        onSubmit,
        initialValues: formScheme,
        validationSchema: validationScheme
    })


/* Limpar formulário*/ 
const limparFormulario = () => {

    formik.setFieldValue("aruCodigo", '')
    formik.setFieldValue("aruDescricao", '' )
    formik.setFieldValue("aruArquivo", '')
    formik.setFieldValue("aruNomeOriginalArquivo", '' )
    formik.setFieldValue("aruData", '' )


}



/*Carregando Empresas/Setor*/
  const getEmpresas = () => {
    empresaService.listar().then(response => setListaEmpresas(response))
    //setListaSetor(null);
  }; 

  useEffect(() => { 
   
    getEmpresas();
    
  }, []); 


 /* Métodos do CRUD (listar, gravar, editar, excluir)*/ 

const getEntidades = () => {
    entidadeService.listar().then(response => setEntidades(response))
  }; 

  useEffect(() => { 
   
    getEntidades();
    
  }, []);

const carregarEmpresabyId = () =>  {

    if (id != null){
        empresaService.carregar(id).then(empresa => { 
            setEmpresa(empresa);
            formik.setFieldValue("empresa", empresa);
            
        });
    }   

} 

useEffect(() => { 

carregarEmpresabyId();

}, []);

  const salvar = (entidade: ArquivoUpload) => { 

    if(id != null){
        carregarEmpresabyId();
        
    } 
   
   
    entidadeService.salvar(entidade).then(response => {
            setEntidade(response); 
            //setEntidades((state) => [...state, { ...response }]);  
            toast.current.show({ severity: 'success', summary: 'Cadastro com sucesso', life: 3000 });
            /*Limpando formulário*/
            limparFormulario(); 
            getEntidades();
            
        

        })       
    }

const alterar = async () =>  {
    entidadeService.atualizar(formik.values).then(response => {
        toast.current.show({ severity: 'success', summary: 'Alerado  com sucesso', life: 3000 });
        /*Limpando formulário*/
        limparFormulario();
        /*Alterando Caption Botão*/
        setMostraBotao(false);

        getEntidades();
    })
}

const deletar = async () =>  {
    entidadeService.deletar(entidade.aruCodigo).then(response => {
        setDeleteDialog(false);  
        toast.current.show({ severity: 'success', summary: 'Deletado com sucesso!!', life: 3000 });
        getEntidades();
        
    })
}

const editEntidade = (entidade: ArquivoUpload) => {

    /*Altera caption do botão para ALTERAR*/
    setMostraBotao(true);

    /* Campos do formulário*/

    formik.setFieldValue("aruCodigo", entidade.aruCodigo)
    formik.setFieldValue("aruDescricao", entidade.aruDescricao )
    formik.setFieldValue("aruArquivo", entidade.aruArquivo)
    formik.setFieldValue("aruNomeOriginalArquivo", entidade.aruNomeOriginalArquivo )
    formik.setFieldValue("aruData", entidade.aruData )
    
    
    
}

const consultaEntidade = (entidade: ArquivoUpload) => {

    setEntidade({...entidade})
    setEntidadeDialog(true);
    setMostraBotao(false);  
    
  
}

const confirmDelete = (entidade: React.SetStateAction<ArquivoUpload>) => {
    setEntidade(entidade);
    setDeleteDialog(true);
}

    


    

     
    /* Métodos da Tabela */


    const exportCSV = () => {
        dt.current?.exportCSV({selectionOnly:false});
    }


    const confirmDeleteSelected = () => {
        setDeleteEmpresasDialog(true);
    }

    

    

    const header = (
        <div className="flex flex-column md:flex-row md:align-items-right justify-content-between">
           <div className="mt-1 md:mt-0 flex justify-content-end">
                <Button icon="pi pi-trash" className="p-button-danger mr-2 p-button-rounded" onClick={confirmDeleteSelected} disabled={!selectedArquivoUpload || !selectedArquivoUpload.length} tooltip="Delete" tooltipOptions={{position: 'bottom'}} />
                <Button icon="pi pi-upload" className="p-button-help p-button-rounded" onClick={exportCSV} tooltip="Export" tooltipOptions={{position: 'bottom'}} />
                <span className="p-input-icon-left w-full md:w-auto">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e: FormEvent<HTMLInputElement>) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." className="w-full lg:w-auto" />
                </span>
            </div>
        </div>
    );

    const actionBodyTemplate = (rowData: ArquivoUpload) => {
        return (
            <React.Fragment> 
                    <Button icon="pi pi-search" className="p-button-rounded p-button-info"  tooltip='Consultar' tooltipOptions={{position: 'bottom'}} type="button"  onClick={() => consultaEntidade(rowData)}/>      
                    <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" tooltip='Editar' tooltipOptions={{position: 'bottom'}} type="button" onClick={() => editEntidade(rowData)}/>
                    <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" tooltip='Deletar' tooltipOptions={{position: 'bottom'}} type="button" onClick={() => confirmDelete(rowData)} />
            </React.Fragment>
        );
    }

    const hideDeleteDialog = () => {
        setDeleteDialog(false);
    }

    const deleteDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deletar} />
        </React.Fragment>
    );

    const hideDialog = () => {
        setSubmitted(false);
        setEntidadeDialog(false);
    }

    const handleEmpresaChange = (e: { value: Empresa}) => {
        setEmpresa(e.value)                 
        formik.setFieldValue("empresa", e.value)   
    }

    // Trabalhando com imagems

    const handleChange = (event: any) => {

        let file = event.target.files[0];

        
        if (event.target.files && event.target.files[0]) {
          const i = event.target.files[0];
          
          setAruArquivoVisao(i);
         
    
    
        }
      };

    const uploadImageToClient = (event: any) => {
        if (event.target.files && event.target.files[0]) {
            setImages((imageList) => [...imageList, event.target.files[0]]);
            setImageURLS((urlList) => [
                ...urlList,
                URL.createObjectURL(event.target.files[0])
            ]);
        }
    };



    const imageBodyTemplate = (rowData: ArquivoUpload) => {
        return (
                 <Zoom>
                     <img
                         alt="Clique para exapandir a imagem"
                         src={rowData.aruArquivo}
                         width="500"
                      />
                 </Zoom>      
                
        ); 
     }

     
    const onBasicUpload = () => {       
        return toast.current?.show({severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode'});
    }

    

      const handleAddImagens = () => {   
          
        
        let _entidade = {...entidade}

        _entidade.aruDescricao = aruDescricaoVisao
        _entidade.aruData = converteData(aruDataVisao)
        _entidade.aruNomeOriginalArquivo = aruNomeOriginalArquivoVisao
        _entidade.aruArquivo = imageURLS[index]
        _entidade.empresa = formik.values.empresa

        console.log(_entidade)
        salvar(_entidade)
        
        setAruDescricaoVisao(''),
        setAruDataVisao(null),
        setAruArquivoVisao(''),
        setIndex(index+1)

        
        console.log(entidade)
       
    }

    const converteData = (dataImagem: Date | Date[]) => {
 
        var dataUTC = new Date(""+dataImagem).toString();
        var novaDataISO = new Date(dataUTC).toISOString();
        return novaDataISO;


    }

   /* const handleSetorChange = (e: { value: any}) => {
        setSetor(e.value)
        maquinaService.carregarBySetor(e.value).then(maquinas => setListaMaquina(maquinas))   
    }

    const handleMaquinaChange = (e: { value: any}) => {
        setMaquina(e.value)
        maquinaEquipamentoService.carregarByMaquina(e.value).then(maquinaEquipamento => setListaMaquinaEquipamento(maquinaEquipamento))

        
    }

    const handleMaquinaEquipamentoChange = (e: { value: any}) => {
        setMaquinaEquipamento(e.value)
        componenteService.carregarByMaquinaEquipamento(e.value).then(componente => setListaComponente(componente))


        
    }

    const handleComponenteChange = (e: { value: any}) => {
         setComponente(e.value)
         formik.setFieldValue("componente", e.value)
    }*/


   


    

    return (

        

                <div className="surface-card border-round shadow-2 p-4">
                        
                        
                        <span className= "text-900 text-2xl font-medium mb-4 block">Cadastro de Imagens</span>
                        
                        
                        <form onSubmit={formik.handleSubmit}>

                                <Toast ref={toast} />

                            
                                        <div className="grid">
                                             
                                           {/* <div className="col-6">
                                                <label style={{ color: "white" }} htmlFor="setor">Setor: *</label>
                                                <Dropdown 
                                                    style={{ width: "100%" }}
                                                    value={setor}
                                                    options={listaSetor} 
                                                    onChange={handleSetorChange} 
                                                    optionLabel="setNome" 
                                                    placeholder="Selecione o Setor" 
                                                    />
                                                    

                                            </div> 

                                            <div className="col-6">
                                                <label style={{ color: "white" }} htmlFor="maquina">Maquina: *</label>
                                                <Dropdown 
                                                    style={{ width: "100%" }}
                                                    value={maquina} 
                                                    options={listaMaquina} 
                                                    onChange={handleMaquinaChange} 
                                                    optionLabel="maqNome" 
                                                    placeholder="Selecione a Máquina" 
                                                    />

                                            </div> 

                                            <div className="col-6">
                                                <label style={{ color: "white" }} htmlFor="maquina_equipamento">MaquinaEquipamento: *</label>
                                                <Dropdown 
                                                    style={{ width: "100%" }}
                                                    value={maquinaEquipamento} 
                                                    options={listaMaquinaEquipamento} 
                                                    onChange={handleMaquinaEquipamentoChange} 
                                                    optionLabel="maeNome" 
                                                    placeholder="Selecione a MáquinaEquipamento" />

                                            </div> 

                                            <div className="col-6">
                                                <label style={{ color: "white" }} htmlFor="componente">Componente: *</label>
                                                <Dropdown 
                                                    style={{ width: "100%" }}
                                                    value={componente} 
                                                    options={listaComponente} 
                                                    onChange={handleComponenteChange} 
                                                    optionLabel="comNome" 
                                                    placeholder="Selecione o Componente" />

                                            </div> */}
                                            
                                            
                                            
                                            
                                            
                                            
                                            {/*<div className="col-2">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="medCodigo">Codigo</label>
                                                        <InputText style={{ width: "100%" }}  disabled placeholder="Código Medicao" id="medCodigo" name="medCodigo" value={formik.values.medCodigo} />

                                                    </span>

                                    
                                            </div>*/}

                                        {!id &&  

                                            <div className="col-6">
                                                <label style={{ color: "white" }} htmlFor="empresa">Empresa: *</label>
                                                <Dropdown 
                                                    style={{ width: "100%" }}
                                                    value={empresa} 
                                                    options={listaEmpresas}
                                                    onChange={handleEmpresaChange} 
                                                    optionLabel="empNome" 
                                                    placeholder="Selecione a Empresa" />

                                            </div>
                                        }

                                            <div className="col-2">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="aruCodigo">Codigo</label>
                                                        <InputText style={{ width: "100%" }}  disabled placeholder="Código Imagem" id="aruCodigo" name="aruCodigo" value={formik.values.aruCodigo} />

                                                    </span>

                                    
                                        </div>


                                           {/*} <div className="col-3">
                                                <span >
                                                    <label style={{ color: "white" }} htmlFor="aruDescricao"> Descrição: *</label> <br></br>
                                                    <InputText style={{ width: "100%" }} placeholder="Digite descrição imagem" id="aruDescricao" name="aruDescricao" value={formik.values.aruDescricao} onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                </span>

                                            </div>

                                            

                                            <div className="col-3">
                                                <span className="ml-2">
                                                    <label style={{ color: "white" }} htmlFor="aruData">Data: *</label>  <br></br>
                                                    <Calendar style={{ width: "58%" }} placeholder="Digite a próxima data" id="aruData" name="aruData" value={date1} onChange={formik.handleChange} dateFormat="dd/mm/yy" mask="99/99/9999" showIcon onBlur={formik.handleBlur} />

                                                </span>

                                            </div>

                                            <div className="col-3">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="aruNomeOriginalArquivo"> Nome Original: *</label> <br></br>
                                                        <InputText style={{ width: "100%" }} placeholder="Digite Nome Original Arquivo" id="aruNomeOriginalArquivo" name="aruNomeOriginalArquivo" value={formik.values.aruNomeOriginalArquivo} onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                        </div> */} 

                                        <div className="col-3">
                                                <span >
                                                    <label style={{ color: "white" }} htmlFor="aruDescricaoVisao"> Descrição: *</label> <br></br>
                                                    <InputText style={{ width: "100%" }} placeholder="Digite descrição imagem" id="aruDescricaoVisao" name="aruDescricaoVisao" value={aruDescricaoVisao} onChange={e => setAruDescricaoVisao(e.target.value)} onBlur={formik.handleBlur} />

                                                </span>

                                        </div>

                                        <div className="col-3">
                                            <span className="ml-2">
                                                <label style={{ color: "white" }} htmlFor="aruDataVisao">Data: *</label>  <br></br>
                                                <Calendar style={{ width: "90%" }} placeholder="Digite data da imagem" id="aruDataVisao" name="aruDataVisao" value={aruDataVisao}onChange={e => setAruDataVisao(e.target.value)} dateFormat="dd/mm/yy" mask="99/99/9999" showIcon onBlur={formik.handleBlur} />
                                                
                                            </span>

                                        </div>

                                        <div className="col-3">
                                            <span className="ml-2">
                                                <label style={{ color: "white" }} htmlFor="aruNomeOriginalArquivoVisao">Nome Original: *</label>  <br></br>
                                                <InputText style={{ width: "90%" }} placeholder="Digite Nome Original" id="aruNomeOriginalArquivoVisao" name="aruNomeOriginalArquivoVisao" value={aruNomeOriginalArquivoVisao} onChange={e => setAruNomeOriginalArquivoVisao(e.target.value)} onBlur={formik.handleBlur} />
                                                
                                            </span>

                                        </div>


                                            <div className="col-2">
                                                <span className="ml-2">
                                    
                                                        <input type="file" style={{ display: "none" }} id="aruArquivoVisao" name="aruArquivoVisao" accept="image/*"   onChange={uploadImageToClient} />
                                                        <>                   
                                                        <label  className="avatar" htmlFor="aruArquivoVisao"  >Carregar Imagens: *</label>                               
                                                        <style jsx global>{`
                                                            .avatar {
                                                                        border-radius: 5px;
                                                                        border: 1px solid ##F0E68C;
                                                                        padding: 5px 5px;
                                                                        width: 210px;
                                                                        height: 40px;
                                                                        background: khaki;
                                                                        color: black;
                                                                        display: block;
                                                                        fontFamily: Times, Times New Roman, serif;
                                                                        text-align: center; 
                                                                        cursor: pointer;
                                                                        
                                                                        transiction: .5s
                                                                        background-color: #F0E68C;
                                                                    }
                                                            .avatar:hover {
                                                                color: red;
                                                                backgroud: white;

                                                                
                                                            }     
                                                            `}</style>
                                                        </>  
                                                </span>

                                            </div>

                                            


                                            
                                           
                                    </div>

                                    {!mostraBotao &&
                                        <Button type="button" label="Salvar" icon="pi pi-check" onClick={handleAddImagens}/>
                                    } {mostraBotao &&
                                        <Button  type="button" label="Alterar" icon="pi pi-check" onClick={alterar}/>
                                    } 

                                        <Link href={{ 
                                                pathname: "/cadastros/setor", 
                                                query: { id: empresa?.empCodigo },
                                                
                                                }}>
                                                <Button>Cadastrar Setor </Button>  
                                                
                                        </Link>
                                

                                
                        <div>

                            <DataTable ref={dt} value={entidades} selection={selectedArquivoUpload} onSelectionChange={(e) => setSelectedArquivoUpload(e.value)}
                                dataKey="aruCodigo" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Histórico Componentes"
                                globalFilter={globalFilter}  header={header} responsiveLayout="stack" emptyMessage="Nenhum registro cadastrado">
                                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                                <Column field="aruCodigo" header="Código" sortable style={{ minWidth: '12rem' }}></Column>
                                <Column field="aruData" header="Data" sortable style={{ minWidth: '16rem' }}></Column> 
                                <Column field="aruDescricao" header="Descricao" sortable style={{ minWidth: '16rem' }}></Column> 
                                <Column header="Image" body={imageBodyTemplate}></Column>
                                <Column field="aruArquivo" header="Imagem" sortable style={{ minWidth: '16rem' }}></Column> 
                                <Column field="aruNomeOriginalArquivo" header="Nome Original" sortable style={{ minWidth: '16rem' }}></Column> 
                                 <Column field="empresa" header="Empresa" sortable style={{ minWidth: '10rem' }}></Column>
                                <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                                
                            </DataTable>

                        </div>

                        <Dialog visible={entidadeDialog} breakpoints={{'960px': '75vw', '640px': '100vw'}} style={{width: '40vw'}} header="Cadastro de Medição" modal className="p-fluid" footer={entidadeDialog} onHide={hideDialog}>
             
                                <div className="col-2">
                                    <span className="ml-2">
                                        <label style={{ color: "white" }} htmlFor="medCodigo">Codigo</label>
                                        <InputText style={{ width: "100%" }}  disabled placeholder="Código Medição" id="medCodigo" name="medCodigo" value={entidade?.aruCodigo} />

                                    </span>

                                </div>

                                <div className="col-4">

                                    <span className="ml-2">
                                        <label style={{ color: "white" }} htmlFor="aruData">Data* </label>
                                        <InputText style={{ width: "100%" }}  disabled placeholder="Digite a Data" id="aruData" name="aruData" value={entidade?.aruDescricao}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                    </span>

                                </div>

                                <div className="col-4">

                                    <span className="ml-2">
                                        <label style={{ color: "white" }} htmlFor="aruDescricao">Data* </label>
                                        <InputText style={{ width: "100%" }}  disabled placeholder="Digite a Descrição" id="aruDescricao" name="aruDescricao" value={entidade?.aruDescricao}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                    </span>

                                </div>

                                <div className="col-4">

                                    <span className="ml-2">
                                        <label style={{ color: "white" }} htmlFor="aruArquivo">Arquivo* </label>
                                        <InputText style={{ width: "100%" }}  disabled placeholder="Digite a Data" id="aruArquivo" name="aruArquivo" value={entidade?.aruArquivo}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                    </span>

                                </div>

                                <div className="col-4">

                                    <span className="ml-2">
                                        <label style={{ color: "white" }} htmlFor="aruNomeOriginalArquivo">Nome Original Arquivo* </label>
                                        <InputText style={{ width: "100%" }}  disabled placeholder="Digite a Data" id="aruNomeOriginalArquivo" name="aruNomeOriginalArquivo" value={entidade?.aruNomeOriginalArquivo}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                    </span>

                                </div>

                                

                                                
                        </Dialog>

                        <Dialog visible={deleteDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteDialogFooter} onHide={hideDeleteDialog}>
                            <div className="flex align-items-center justify-content-center">
                                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                                {entidade && <span>Tem certeza que quer deletar? <b>{entidade.aruCodigo}</b>?</span>}
                            </div>
                        </Dialog>

                


                </form>
                
            </div>
       
    );
}