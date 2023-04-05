
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
    useInspecaoTermograficaService,
    useInspecaoTermograficaPecaService,
    useCondicoesAmbienteService, 
    useSetorService
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
import { InspecaoAcusticaLocal } from 'app/model/inspecao_acustica_local'
import { InspecaoTermografica } from 'app/model/inspecao_termografica'
import { InspecaoTermograficaPeca } from 'app/model/inspecao_termografica_peca'
import { CondicoesAmbiente } from 'app/model/condicoes_ambiente'


interface CondicoesAmbienteFormProps {
    onSubmit: (condicoesAmbiente: CondicoesAmbiente) => void;
   
}

const formScheme: CondicoesAmbiente = {
    
    camCodigo:'',
    camTemperatura:'',
    camCarga:'',
    camPontoTermograma:'',
    camEmissividade:'',
    inspecaoTermograficaPeca: null
    
}

export const CondicoesAmbienteForm: React.FC<CondicoesAmbienteFormProps> = ({
    onSubmit,
   
}) => {

    
    const maquinaService = useMaquinaService();
    const empresaService = useEmpresaService();
    const maquinaEquipamentoService = useMaquinaEquipamentoService();
    const componenteService = useComponenteService();
    const medicaoService = useMedicaoService();
    const inspecaoTermograficaService = useInspecaoTermograficaService();
    const inspecaoTermograficaServicePeca = useInspecaoTermograficaPecaService();
    const condicoesAmbienteService = useCondicoesAmbienteService();
    


    
    const [ listaEmpresas, setListaEmpresas ] = useState<Empresa[]>([])
    const [ mensagem, setMensagem] = useState<string>('')
    const [ maquina, setMaquina ] = useState<Maquina>(null);
    const [ empresa, setEmpresa] = useState<Empresa>(null);
    const [ listaSetor, setListaSetor] = useState<Setor[]>([])
    const [ listaMaquina, setListaMaquina ] = useState<Maquina[]>([]);
    const [ listaMaquinaEquipamento, setListaMaquinaEquipamento ] = useState<MaquinaEquipamento[]>([]);
    const [ listaComponente, setListaComponente ] = useState<Componente[]>([]);
    const [ listaMedicao, setListaMedicao ] = useState<Medicao[]>([]);
    const [ listaInspecaoTermografica, setListaInspecaoTermografica ] = useState<InspecaoTermografica[]>([]);
    const [ listaInspecaoTermograficaPeca, setListaInspecaoTermograficaPeca ] = useState<InspecaoTermograficaPeca[]>([]);
    const [ listaCondicoesAmbiente, setListaCondicoesAmbiente ] = useState<CondicoesAmbiente[]>([]);

    
    
    const [ maquinaEquipamento, setMaquinaEquipamento ] = useState<MaquinaEquipamento>(null);
    const [ componente, setComponente ] = useState<Componente>(null);
    const [ setor, setSetor ] = useState<Setor>(null);
    const [ medicao, setMedicao ] = useState<Medicao>(null);
    const [ inspecaoTermografica, setInspecaoTermografica ] = useState<InspecaoTermografica>(null);
    const [ inspecaoTermograficaPeca, setInspecaoTermograficaPeca ] = useState<InspecaoTermograficaPeca>(null);
    const [ condicoesAmbiente, setCondicoesAmbiente ] = useState<CondicoesAmbiente>(null);



    const [globalFilter, setGlobalFilter] = useState<string>();
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable>(null);

    const [selectedCondicoesAmbiente, setSelectedCondicoesAmbiente] = useState<CondicoesAmbiente[]>([]);
    const [ maquinas, setMaquinas ] = useState<Maquina[]>([]);

    const [deleteEmpresasDialog, setDeleteEmpresasDialog] = useState(false);

    const [ date1, setAlteraData1 ] = useState<Date | Date[] | undefined>(undefined);

    /*Copiar estas variávies*/
    const [ entidades, setEntidades ] = useState<CondicoesAmbiente[]>([]);
    const [ entidade, setEntidade ] = useState<CondicoesAmbiente>(null);
    const [mostraBotao, setMostraBotao] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [entidadeDialog, setEntidadeDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const entidadeService = useCondicoesAmbienteService();
    const setorService = useSetorService();
    

    

    const formik = useFormik<CondicoesAmbiente>({
        onSubmit,
        initialValues: formScheme,
        validationSchema: validationScheme
    })


/* Limpar formulário*/ 
const limparFormulario = () => {

    

    formik.setFieldValue("camCodigo", '')
    formik.setFieldValue("camCarga", '' )
    formik.setFieldValue("camEmissividade", '' )
    formik.setFieldValue("camPontoTermograma", '' )
    formik.setFieldValue("camTemperatura", '' )
    
    
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
    entidadeService.deletar(entidade.camCodigo).then(response => {
        setDeleteDialog(false);  
        toast.current.show({ severity: 'success', summary: 'Deletado com sucesso!!', life: 3000 });
        getEntidades();
        
    })
}

const editEntidade = (entidade: CondicoesAmbiente) => {

    /*Altera caption do botão para ALTERAR*/
    setMostraBotao(true);

    /* Campos do formulário*/

    formik.setFieldValue("camCodigo", entidade.camCodigo)
    formik.setFieldValue("camCarga", entidade.camCarga )
    formik.setFieldValue("camEmissividade", entidade.camEmissividade )
    formik.setFieldValue("camPontoTermograma", entidade.camPontoTermograma )
    formik.setFieldValue("camTemperatura", entidade.camTemperatura )
    
    
    
}

const consultaEntidade = (entidade: CondicoesAmbiente) => {

    setEntidade({...entidade})
    setEntidadeDialog(true);
    setMostraBotao(false);  
  
}

const confirmDelete = (entidade: React.SetStateAction<CondicoesAmbiente>) => {
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
                <Button icon="pi pi-trash" className="p-button-danger mr-2 p-button-rounded" onClick={confirmDeleteSelected} disabled={!selectedCondicoesAmbiente || !selectedCondicoesAmbiente.length} tooltip="Delete" tooltipOptions={{position: 'bottom'}} />
                <Button icon="pi pi-upload" className="p-button-help p-button-rounded" onClick={exportCSV} tooltip="Export" tooltipOptions={{position: 'bottom'}} />
                <span className="p-input-icon-left w-full md:w-auto">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e: FormEvent<HTMLInputElement>) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." className="w-full lg:w-auto" />
                </span>
            </div>
        </div>
    );

    const actionBodyTemplate = (rowData: CondicoesAmbiente) => {
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
        setorService.carregarByEmpresa(e.value).then(setors => setListaSetor(setors))               
          
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
        inspecaoTermograficaService.carregarByMedicao(e.value).then(inspecaoTermografica => setListaInspecaoTermografica(inspecaoTermografica))
    }
        
    

    const handleInspecaoTermograficaChange = (e: { value: any}) => {
        setInspecaoTermografica(e.value)
        console.log(e.value)
        inspecaoTermograficaServicePeca.carregarByInspecaoTermografica(e.value).then(inspecaoTermograficaPeca => setListaInspecaoTermograficaPeca(inspecaoTermograficaPeca))

    }
    

    const handleInspecaoTermograficaPecaChange = (e: { value: any}) => {
        setInspecaoTermograficaPeca(e.value)
        formik.setFieldValue("inspecaoTermograficaPeca", e.value)
    }


   


    

    return (

        

                <div className="surface-card border-round shadow-2 p-4">
                        <span className="text-900 text-2xl font-medium mb-4 block">Cadatro de Condições Ambiente:</span>
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
                                                <label style={{ color: "white" }} htmlFor="inspecaoTermografica">Inspecao Termográfica: *</label>
                                                <Dropdown 
                                                    style={{ width: "100%" }}
                                                    value={inspecaoTermografica} 
                                                    options={listaInspecaoTermografica} 
                                                    onChange={handleInspecaoTermograficaChange} 
                                                    optionLabel="iteCodigo" 
                                                    placeholder="Selecione a Inspecao Termografica" />

                                            </div> 

                                            <div className="col-6">
                                                <label style={{ color: "white" }} htmlFor="inspecaoTermograficaPeca">Inspecao Termográfica Peca: *</label>
                                                <Dropdown 
                                                    style={{ width: "100%" }}
                                                    value={inspecaoTermograficaPeca} 
                                                    options={listaInspecaoTermograficaPeca} 
                                                    onChange={handleInspecaoTermograficaPecaChange} 
                                                    optionLabel="itpCodigo" 
                                                    placeholder="Selecione a Inspecao Termografica Peca" />

                                            </div> 
                                            
                                            
                                            
                                            
                                            
                                            
                                            <div className="col-2">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="camCodigo">Codigo:</label>
                                                        <InputText style={{ width: "100%" }}  disabled placeholder="Código CondicoesAmbiente" id="camCodigo" name="camCodigo" value={formik.values.camCodigo} />

                                                    </span>

                                    
                                            </div>

                                            <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="camCarga">Carga*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a Carga" id="camCarga" name="camCarga" value={formik.values.camCarga}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.camCarga}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="camEmissividade">Emissividade*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a Emissividade" id="camEmissividade" name="camEmissividade" value={formik.values.camEmissividade}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.camEmissividade}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="camPontoTermograma">Ponto Termograma*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite o Ponto Termograma" id="camPontoTermograma" name="camPontoTermograma" value={formik.values.camPontoTermograma}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.camPontoTermograma}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="camTemperatura">Temperatura*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite o Ponto Termograma" id="camTemperatura" name="camTemperatura" value={formik.values.camTemperatura}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.camTemperatura}
                                                    </small>

                                                    
                                           </div>



                                            
                                            
                                    </div>

                                    {!mostraBotao &&
                                        <Button type="button" label="Salvar" icon="pi pi-check" onClick={salvar}/>
                                    } {mostraBotao &&
                                        <Button  type="button" label="Alterar" icon="pi pi-check" onClick={alterar}/>
                                    } 
                                
                                

                                
                        <div>

                            <DataTable ref={dt} value={entidades} selection={selectedCondicoesAmbiente} onSelectionChange={(e) => setSelectedCondicoesAmbiente(e.value)}
                                dataKey="camCodigo" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Histórico Componentes"
                                globalFilter={globalFilter}  header={header} responsiveLayout="stack">
                                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                                <Column field="camCodigo" header="Código" sortable style={{ minWidth: '10rem' }}></Column>
                                <Column field="camCarga" header="Carga" sortable style={{ minWidth: '10rem' }}></Column>
                                <Column field="camEmissividade" header="Emissividade" sortable style={{ minWidth: '10rem' }}></Column>
                                <Column field="camPontoTermograma" header="Ponto Termograma" sortable style={{ minWidth: '10rem' }}></Column>
                                <Column field="camTemperatura" header="Temperatura" sortable style={{ minWidth: '10rem' }}></Column>
                                <Column field="inspecaoTermograficaPeca.itpCodigo" header="Inspeção Termográfica" sortable style={{ minWidth: '10rem' }}></Column>
                                <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                                
                            </DataTable>

                        </div>

                        <Dialog visible={entidadeDialog} breakpoints={{'960px': '75vw', '640px': '100vw'}} style={{width: '40vw'}} header="Cadastro de Inspeção Termográfica" modal className="p-fluid" footer={entidadeDialog} onHide={hideDialog}>
             
                                                        <div className="col-2">

                                <span className="ml-2">
                                    <label style={{ color: "white" }} htmlFor="camCodigo">Codigo</label>
                                    <InputText style={{ width: "100%" }}  disabled placeholder="Código Condições Ambientais" id="camCodigo" name="camCodigo" value={entidade?.camCodigo} />

                                </span>


                                </div>

                                <div className="col-4">

                                <span className="ml-2">
                                    <label style={{ color: "white" }} htmlFor="camCarga">Acao Carga*</label>
                                    <InputText style={{ width: "100%" }}  disabled placeholder="Digite a Carga" id="camCarga" name="camCarga" value={entidade?.camCarga}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                </span>

                                </div>

                                <div className="col-4">

                                <span className="ml-2">
                                    <label style={{ color: "white" }} htmlFor="camEmissividade">Emissividade*</label>
                                    <InputText style={{ width: "100%" }}  disabled placeholder="Digite o Custo Emissividade" id="camEmissividade" name="camEmissividade" value={entidade?.camEmissividade}    />

                                </span>




                                </div>

                                <div className="col-4">

                                <span className="ml-2">
                                    <label style={{ color: "white" }} htmlFor="camPontoTermograma">Ponto Termograma*</label>
                                    <InputText style={{ width: "100%" }}  disabled placeholder="Digite o Custo Preditiva" id="camPontoTermograma" name="camPontoTermograma" value={entidade?.camPontoTermograma}    />

                                </span>




                                </div>

                                
                                
                                <div className="col-4">

                                <span className="ml-2">
                                    <label style={{ color: "white" }} htmlFor="camTemperatura">Temperatura*</label>
                                    <InputText style={{ width: "100%" }}  disabled placeholder="Digite os Equipamentos" id="camTemperatura" name="camTemperatura" value={entidade?.camTemperatura}    />

                                </span>
                                </div>
                
                        </Dialog>

                        <Dialog visible={deleteDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteDialogFooter} onHide={hideDeleteDialog}>
                            <div className="flex align-items-center justify-content-center">
                                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                                {entidade && <span>Tem certeza que quer deletar? <b>{entidade.camCodigo}</b>?</span>}
                            </div>
                        </Dialog>


                


                </form>
                
            </div>
       
    );
}