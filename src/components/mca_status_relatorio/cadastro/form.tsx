
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
    useAnaliseOleoService,
    useMcaMedicaoService,
    useMcaRelatorioService,
    useMcaCircuitoService,
    useMcaStatusRelatorioService, 
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
import { McaMedicao } from 'app/model/mca_medicao'
import { McaRelatorio } from 'app/model/mca_relatorio'
import { McaCircuito } from 'app/model/mca_circuito'
import { McaStatusRelatorio } from 'app/model/mca_status_relatorio'




interface McaStatusRelatorioFormProps {
    onSubmit: (mcaStatusRelatorio: McaStatusRelatorio) => void;
   
}

const formScheme: McaStatusRelatorio = {
   
    mcasrCodigo:'',
    mcasrDescricao:'',
    mcasrCor:'',
    
        
}

export const McaStatusRelatorioForm: React.FC<McaStatusRelatorioFormProps> = ({
    onSubmit,
   
}) => {

    
    const maquinaService = useMaquinaService();
    const empresaService = useEmpresaService();
    const maquinaEquipamentoService = useMaquinaEquipamentoService();
    const componenteService = useComponenteService();
    const medicaoService = useMedicaoService();
    const mcaMedicaoService = useMcaMedicaoService();
    const mcaRelatorioService = useMcaRelatorioService();
    const mcaCircuitoService = useMcaCircuitoService();
    const mcaStatusRelatorioService = useMcaStatusRelatorioService();


    
    const [ listaEmpresas, setListaEmpresas ] = useState<Empresa[]>([])
    const [ mensagem, setMensagem] = useState<string>('')
    const [ maquina, setMaquina ] = useState<Maquina>(null);
    const [ empresa, setEmpresa] = useState<Empresa>(null);
    const [ listaSetor, setListaSetor] = useState<Setor[]>([])
    const [ listaMaquina, setListaMaquina ] = useState<Maquina[]>([]);
    const [ listaMaquinaEquipamento, setListaMaquinaEquipamento ] = useState<MaquinaEquipamento[]>([]);
    const [ listaComponente, setListaComponente ] = useState<Componente[]>([]);
    const [ listaMedicao, setListaMedicao ] = useState<Medicao[]>([]);
    const [ listaMcaMedicao, setListaMcaMedicao ] = useState<McaMedicao[]>([]);
    const [ listaMcaRelatorio, setListaMcaRelatorio ] = useState<McaRelatorio[]>([]);
    const [ listaMcaCircuito, setListaMcaCircuito ] = useState<McaCircuito[]>([]);
    const [ listaMcaStatusRelatorio, setListaMcaStatusRelatorio ] = useState<McaStatusRelatorio[]>([]);

    const [ maquinaEquipamento, setMaquinaEquipamento ] = useState<MaquinaEquipamento>(null);
    const [ componente, setComponente ] = useState<Componente>(null);
    const [ setor, setSetor ] = useState<Setor>(null);
    const [ medicao, setMedicao ] = useState<Medicao>(null);
    const [ mcaMedicao, setMcaMedicao ] = useState<McaMedicao>(null);
    const [ mcaStatusRelatorio, setMcaStatusRelatorio ] = useState<McaStatusRelatorio>(null);



    const [globalFilter, setGlobalFilter] = useState<string>();
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable>(null);

    const [selectedMcaStatusRelatorio, setSelectedMcaStatusRelatorio] = useState<McaStatusRelatorio[]>([]);
    const [ maquinas, setMaquinas ] = useState<Maquina[]>([]);

    const [deleteEmpresasDialog, setDeleteEmpresasDialog] = useState(false);

    const [ date1, setAlteraData1 ] = useState<Date | Date[] | undefined>(undefined);

    /*Copiar estas variávies*/
    const [ entidades, setEntidades ] = useState<McaStatusRelatorio[]>([]);
    const [ entidade, setEntidade ] = useState<McaStatusRelatorio>(null);
    const [mostraBotao, setMostraBotao] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [entidadeDialog, setEntidadeDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const entidadeService = useMcaStatusRelatorioService();
    

    

    const formik = useFormik<McaStatusRelatorio>({
        onSubmit,
        initialValues: formScheme,
        validationSchema: validationScheme
    })


/* Limpar formulário*/ 
const limparFormulario = () => {

    formik.setFieldValue("mcasrCodigo", '')
    formik.setFieldValue("mcasrDescricao", '' )
    formik.setFieldValue("mcasrCor", '' )
    
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
    entidadeService.deletar(entidade.mcasrCodigo).then(response => {
        setDeleteDialog(false);  
        toast.current.show({ severity: 'success', summary: 'Deletado com sucesso!!', life: 3000 });
        getEntidades();
        
    })
}

const editEntidade = (entidade: McaStatusRelatorio) => {

    /*Altera caption do botão para ALTERAR*/
    setMostraBotao(true);

    /* Campos do formulário*/

    formik.setFieldValue("mcasrCodigo", entidade.mcasrCodigo)
    formik.setFieldValue("mcasrDescricao", entidade.mcasrDescricao )
    formik.setFieldValue("mcasrCor", entidade.mcasrCor )
    
    
}

const consultaEntidade = (entidade: McaStatusRelatorio) => {

    setEntidade({...entidade})
    setEntidadeDialog(true);
    setMostraBotao(false);  
  
}

const confirmDelete = (entidade: React.SetStateAction<McaStatusRelatorio>) => {
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
                <Button icon="pi pi-trash" className="p-button-danger mr-2 p-button-rounded" onClick={confirmDeleteSelected} disabled={!selectedMcaStatusRelatorio || !selectedMcaStatusRelatorio.length} tooltip="Delete" tooltipOptions={{position: 'bottom'}} />
                <Button icon="pi pi-upload" className="p-button-help p-button-rounded" onClick={exportCSV} tooltip="Export" tooltipOptions={{position: 'bottom'}} />
                <span className="p-input-icon-left w-full md:w-auto">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e: FormEvent<HTMLInputElement>) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." className="w-full lg:w-auto" />
                </span>
            </div>
        </div>
    );

    const actionBodyTemplate = (rowData: McaStatusRelatorio) => {
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

    




    /* Alterar se for para relacionar com outras tabelas

    const handleEmpresaChange = (e: { value: Empresa}) => {
        setEmpresa(e.value)                 
        setListaSetor(e.value.setor)   
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
        mcaMedicaoService.carregarByMedicao(e.value).then(mcaMedicao => setListaMcaMedicao(mcaMedicao))
    }

    const handleMcaMedicaoChange = (e: { value: any}) => {
        setMcaMedicao(e.value)
        formik.setFieldValue("mcaMedicao", e.value)
    } */


   


    

    return (

        

                <div className="surface-card border-round shadow-2 p-4">
                        <span className="text-900 text-2xl font-medium mb-4 block">Cadatro de MCA Status Relatório:</span>
                        <form onSubmit={formik.handleSubmit}>

                        <Toast ref={toast} />

                            
                                  <div className="grid">
                                            
                                            <div className="col-2">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcasrCodigo">Codigo</label>
                                                        <InputText style={{ width: "100%" }}  disabled placeholder="Código McaStatusRelatorio" id="mcasrCodigo" name="mcasrCodigo" value={formik.values.mcasrCodigo} />

                                                    </span>

                                    
                                            </div>

                                            <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcasrDescricao">Descrição*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a Descrição" id="mcasrDescricao" name="mcasrDescricao" value={formik.values.mcasrDescricao}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.mcasrDescricao}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcasrCor">Cor*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a Cor" id="mcasrCor" name="mcasrCor" value={formik.values.mcasrCor}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.mcasrCor}
                                                    </small>

                                                    
                                           </div>

                                            
                                    </div>

                                    {!mostraBotao &&
                                        <Button type="button" label="Salvar" icon="pi pi-check" onClick={salvar}/>
                                    } {mostraBotao &&
                                        <Button  type="button" label="Alterar" icon="pi pi-check" onClick={alterar}/>
                                    } 
                                
                                

                                
                        <div>

                            <DataTable ref={dt} value={entidades} selection={selectedMcaStatusRelatorio} onSelectionChange={(e) => setSelectedMcaStatusRelatorio(e.value)}
                                dataKey="mcasrCodigo" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Histórico Componentes"
                                globalFilter={globalFilter}  header={header} responsiveLayout="stack">
                                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                                <Column field="mcasrCodigo" header="Código" sortable style={{ minWidth: '12rem' }}></Column>
                                <Column field="mcasrDescricao" header="Descrição" sortable style={{ minWidth: '12rem' }}></Column>
                                <Column field="mcasrCor" header="Cor" sortable style={{ minWidth: '10rem' }}></Column>
                                <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                                
                            </DataTable>

                        </div>

                        <Dialog visible={entidadeDialog} breakpoints={{'960px': '75vw', '640px': '100vw'}} style={{width: '40vw'}} header="Cadastro de Medição" modal className="p-fluid" footer={entidadeDialog} onHide={hideDialog}>
             
                                <div className="col-2">
                                    <span className="ml-2">
                                        <label style={{ color: "white" }} htmlFor="mcasrCodigo">Codigo: </label>
                                        <InputText style={{ width: "100%" }}  disabled placeholder="Código Medição" id="mcasrCodigo" name="mcasrCodigo" value={entidade?.mcasrCodigo} />

                                    </span>

                                </div>

                                <div className="col-4">

                                    <span className="ml-2">
                                        <label style={{ color: "white" }} htmlFor="mcasrDescricao">Descrição:  </label>
                                        <InputText style={{ width: "100%" }}  disabled placeholder="Digite a Descrição" id="mcasrDescricao" name="mcasrDescricao" value={entidade?.mcasrDescricao}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                    </span>

                                </div>

                                <div className="col-4">

                                    <span className="ml-2">
                                        <label style={{ color: "white" }} htmlFor="mcasrCor">Cor:  </label>
                                        <InputText style={{ width: "100%" }}  disabled placeholder="Digite a Descrição" id="mcasrCor" name="mcasrCor" value={entidade?.mcasrCor}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                    </span>

                                </div>

                                                
                        </Dialog>

                        <Dialog visible={deleteDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteDialogFooter} onHide={hideDeleteDialog}>
                            <div className="flex align-items-center justify-content-center">
                                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                                {entidade && <span>Tem certeza que quer deletar? <b>{entidade.mcasrCodigo}</b>?</span>}
                            </div>
                        </Dialog>

                


                </form>
                
            </div>
       
    );
}