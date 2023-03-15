
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
    useMedicaoAnaliseVibracaoService, 
    useStatusComponenteVibracaoService
     } from 'app/services'

import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Dialog } from 'primereact/dialog'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Dropdown } from 'primereact/dropdown'
import { validationScheme } from './validationScheme'
import { Maquina } from 'app/model/maquinas'
import { Empresa } from 'app/model/empresas'
import { Setor } from 'app/model/setor'
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
import { Medicao } from 'app/model/medicao'
import { Calendar } from 'primereact/calendar'
import { StatusComponenteVibracao } from 'app/model/status_componente_vibracao'
import { MedicaoAnaliseVibracao } from 'app/model/medicao_analise_vibracao'



interface StatusComponenteVibracaoFormProps {
    onSubmit: (statusComponenteVibracao: StatusComponenteVibracao) => void;
   
}

const formScheme: StatusComponenteVibracao = {
    scvCodigo:'',
    scvDescricao:'',
    scvCor:'',
    scvOrdem:'',
    medicaoAnaliseVibracao: null
    
}

export const StatusComponenteVibracaoForm: React.FC<StatusComponenteVibracaoFormProps> = ({
    onSubmit,
   
}) => {

    
    const maquinaService = useMaquinaService();
    const empresaService = useEmpresaService();
    const maquinaEquipamentoService = useMaquinaEquipamentoService();
    const componenteService = useComponenteService();
    const medicaoService = useMedicaoService();
    const medicaoAnaliseVibracaoService = useMedicaoAnaliseVibracaoService();
    


    
    const [ listaEmpresas, setListaEmpresas ] = useState<Empresa[]>([])
    const [ mensagem, setMensagem] = useState<string>('')
    const [ maquina, setMaquina ] = useState<Maquina>(null);
    const [ empresa, setEmpresa] = useState<Empresa>(null);
    const [ listaSetor, setListaSetor] = useState<Setor[]>([])
    const [ listaMaquina, setListaMaquina ] = useState<Maquina[]>([]);
    const [ listaMaquinaEquipamento, setListaMaquinaEquipamento ] = useState<MaquinaEquipamento[]>([]);
    const [ listaComponente, setListaComponente ] = useState<Componente[]>([]);
    const [ listaMedicao, setListaMedicao ] = useState<Medicao[]>([]);
    const [ listaMedicaoAnaliseVibracao, setListaMedicaoAnaliseVibracao ] = useState<MedicaoAnaliseVibracao[]>([]);


    const [ listaStatusComponenteVibracao, setListaStatusComponenteVibracao ] = useState<StatusComponenteVibracao[]>([]);

    const [ maquinaEquipamento, setMaquinaEquipamento ] = useState<MaquinaEquipamento>(null);
    const [ componente, setComponente ] = useState<Componente>(null);
    const [ setor, setSetor ] = useState<Setor>(null);
    const [ medicao, setMedicao ] = useState<Medicao>(null);
    const [ medicaoAnaliseVibracao, setMedicaoAnaliseVibracao ] = useState<MedicaoAnaliseVibracao>(null);



    const [globalFilter, setGlobalFilter] = useState<string>();
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable>(null);

    const [selectedStatusComponenteVibracao, setSelectedStatusComponenteVibracao] = useState<StatusComponenteVibracao[]>([]);
    const [ maquinas, setMaquinas ] = useState<Maquina[]>([]);

    const [deleteEmpresasDialog, setDeleteEmpresasDialog] = useState(false);

    const [ date1, setAlteraData1 ] = useState<Date | Date[] | undefined>(undefined);

    /*Copiar estas variávies*/
    const [ entidades, setEntidades ] = useState<StatusComponenteVibracao[]>([]);
    const [ entidade, setEntidade ] = useState<StatusComponenteVibracao>(null);
    const [mostraBotao, setMostraBotao] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [entidadeDialog, setEntidadeDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const entidadeService = useStatusComponenteVibracaoService();
    

    

    const formik = useFormik<StatusComponenteVibracao>({
        onSubmit,
        initialValues: formScheme,
        validationSchema: validationScheme
    })


/* Limpar formulário*/ 
const limparFormulario = () => {

    formik.setFieldValue("medCodigo", '')
    formik.setFieldValue("medData", '' )
    formik.setFieldValue("medCodigo", '')
    formik.setFieldValue("medData", '' )
    
}



/*Carregando Empresas/Setor*/
  const getEmpresas = () => {
    empresaService.listar().then(response => setListaEmpresas(response))
    setListaSetor(null);
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

  const salvar = () => { 
    entidadeService.salvar(formik.values).then(response => {
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
    entidadeService.deletar(entidade.scvCodigo).then(response => {
        setDeleteDialog(false);  
        toast.current.show({ severity: 'success', summary: 'Deletado com sucesso!!', life: 3000 });
        getEntidades();
        
    })
}

const editEntidade = (entidade: StatusComponenteVibracao) => {

    /*Altera caption do botão para ALTERAR*/
    setMostraBotao(true);

    /* Campos do formulário*/

    formik.setFieldValue("medCodigo", entidade.scvCodigo)
    formik.setFieldValue("medData", entidade.scvDescricao )
    formik.setFieldValue("medCodigo", entidade.scvOrdem)
    formik.setFieldValue("medData", entidade.scvCor )
    

    
    
    
}

const consultaEntidade = (entidade: StatusComponenteVibracao) => {

    setEntidade({...entidade})
    setEntidadeDialog(true);
    setMostraBotao(false);  
  
}

const confirmDelete = (entidade: React.SetStateAction<StatusComponenteVibracao>) => {
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
                <Button icon="pi pi-trash" className="p-button-danger mr-2 p-button-rounded" onClick={confirmDeleteSelected} disabled={!selectedStatusComponenteVibracao || !selectedStatusComponenteVibracao.length} tooltip="Delete" tooltipOptions={{position: 'bottom'}} />
                <Button icon="pi pi-upload" className="p-button-help p-button-rounded" onClick={exportCSV} tooltip="Export" tooltipOptions={{position: 'bottom'}} />
                <span className="p-input-icon-left w-full md:w-auto">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e: FormEvent<HTMLInputElement>) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." className="w-full lg:w-auto" />
                </span>
            </div>
        </div>
    );

    const actionBodyTemplate = (rowData: StatusComponenteVibracao) => {
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
           
    }

    const handleSetorChange = (e: { value: any}) => {
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
         medicaoService.carregarByComponente(e.value).then(medicao => setListaMedicao(medicao))
         
    }

    const handleMedicaoChange = (e: { value: any}) => {
        setMedicao(e.value)
        medicaoAnaliseVibracaoService.carregarByMedicao(e.value).then(medicaoAnaliseVibracao => setListaMedicaoAnaliseVibracao(medicaoAnaliseVibracao))
    }

    const handleMedicaoAnaliseVibracaoChange = (e: { value: any}) => {
        setMedicaoAnaliseVibracao(e.value)
        formik.setFieldValue("medicaoAnaliseVibracao", e.value)
    }


   


    

    return (

        

                <div className="surface-card border-round shadow-2 p-4">
                        <span className="text-900 text-2xl font-medium mb-4 block">Cadatro de Status Componenete Vibracao:</span>
                        <form onSubmit={formik.handleSubmit}>

                        <Toast ref={toast} />

                            
                                        <div className="grid">
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
                                            <div className="col-6">
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

                                            </div> 

                                            <div className="col-6">
                                                <label style={{ color: "white" }} htmlFor="medicao">Medicao: *</label>
                                                <Dropdown 
                                                    style={{ width: "100%" }}
                                                    value={medicao} 
                                                    options={listaMedicao} 
                                                    onChange={handleMedicaoChange} 
                                                    optionLabel="medCodigo" 
                                                    placeholder="Selecione a Medicao" />

                                            </div> 

                                            <div className="col-6">
                                                <label style={{ color: "white" }} htmlFor="medicaoAnaliseVibracao">MedicaoAnaliseVibracao: *</label>
                                                <Dropdown 
                                                    style={{ width: "100%" }}
                                                    value={medicaoAnaliseVibracao} 
                                                    options={listaMedicaoAnaliseVibracao} 
                                                    onChange={handleMedicaoAnaliseVibracaoChange} 
                                                    optionLabel="mavCodigo" 
                                                    placeholder="Selecione a MedicaoAnaliseVibracao" />

                                            </div> 

                                            <div className="col-2">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="scvCodigo">Codigo</label>
                                                        <InputText style={{ width: "100%" }}  disabled placeholder="Código StatusComponenteVibração" id="scvCodigo" name="scvCodigo" value={formik.values.scvCodigo} />

                                                    </span>

                                    
                                            </div>

                                            <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="scvDescricao">Descrição*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a Descrição" id="scvDescricao" name="scvDescricao" value={formik.values.scvDescricao}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.scvDescricao}
                                                    </small>
                                            </div>

                                            <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="scvCor">Cor*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a Cor" id="scvCor" name="scvCor" value={formik.values.scvCor}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.scvCor}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="scvOrdem">Ordem*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a Ordem" id="scvOrdem" name="scvOrdem" value={formik.values.scvOrdem}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.scvOrdem}
                                                    </small>

                                                    
                                           </div>

                                            
                                    </div>

                                   {!mostraBotao &&
                                        <Button type="button" label="Salvar" icon="pi pi-check" onClick={salvar}/>
                                    } {mostraBotao &&
                                        <Button  type="button" label="Alterar" icon="pi pi-check" onClick={alterar}/>
                                    } 
                                

                                
                        <div>

                            <DataTable ref={dt} value={entidades} selection={selectedStatusComponenteVibracao} onSelectionChange={(e) => setSelectedStatusComponenteVibracao(e.value)}
                                dataKey="scvCodigo" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Histórico Componentes"
                                globalFilter={globalFilter}  header={header} responsiveLayout="stack">
                                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                                <Column field="scvCodigo" header="Código" sortable style={{ minWidth: '12rem' }}></Column>
                                <Column field="scvDescricao" header="Descrição" sortable style={{ minWidth: '12rem' }}></Column>
                                <Column field="scvCor" header="Cor" sortable style={{ minWidth: '12rem' }}></Column>
                                <Column field="scvOrdem" header="Ordem" sortable style={{ minWidth: '12rem' }}></Column>
                                <Column field="medicaoAnaliseVibracao.mavCodigo" header="MedicaoAnaliseVibracao" sortable style={{ minWidth: '10rem' }}></Column>
                                <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                                
                            </DataTable>

                        </div>
                        <Dialog visible={entidadeDialog} breakpoints={{'960px': '75vw', '640px': '100vw'}} style={{width: '40vw'}} header="Cadastro de Medição" modal className="p-fluid" footer={entidadeDialog} onHide={hideDialog}>
             
             <div className="col-2">
                 <span className="ml-2">
                     <label style={{ color: "white" }} htmlFor="scvCodigo">Codigo: </label>
                     <InputText style={{ width: "100%" }}  disabled placeholder="Código Medição" id="scvCodigo" name="scvCodigo" value={entidade?.scvCodigo} />

                 </span>

             </div>

             <div className="col-4">

                 <span className="ml-2">
                     <label style={{ color: "white" }} htmlFor="scvDescricao">Descrição* </label>
                     <InputText style={{ width: "100%" }}  disabled placeholder="Digite a Descrição" id="scvDescricao" name="scvDescricao" value={entidade?.scvDescricao}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                 </span>

             </div>

             <div className="col-4">

                 <span className="ml-2">
                     <label style={{ color: "white" }} htmlFor="scvOrdem">Ordem* </label>
                     <InputText style={{ width: "100%" }}  disabled placeholder="Digite a Ordem" id="scvOrdem" name="scvOrdem" value={entidade?.scvOrdem}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                 </span>

             </div>

             <div className="col-4">

                <span className="ml-2">
                    <label style={{ color: "white" }} htmlFor="medCor">Cor* </label>
                    <InputText style={{ width: "100%" }}  disabled placeholder="Digite a Cor" id="scvCor" name="scvCor" value={entidade?.scvCor}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                </span>

            </div>




                             
     </Dialog>

     <Dialog visible={deleteDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteDialogFooter} onHide={hideDeleteDialog}>
         <div className="flex align-items-center justify-content-center">
             <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
             {entidade && <span>Tem certeza que quer deletar? <b>{entidade.scvDescricao}</b>?</span>}
         </div>
     </Dialog>


                


                </form>
                
            </div>
       
    );
}