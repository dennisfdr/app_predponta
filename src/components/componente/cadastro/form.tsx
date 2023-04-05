
import { useFormik } from 'formik'
import { 
    AutoComplete, 
    AutoCompleteChangeParams, 
    AutoCompleteCompleteMethodParams 
} from 'primereact/autocomplete'
import { FormEvent, useEffect, useRef, useState } from 'react'


import { useEmpresaService, useMaquinaService, useMaquinaEquipamentoService, useComponenteService, useSetorService } from 'app/services'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Dialog } from 'primereact/dialog'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Dropdown } from 'primereact/dropdown'
import { validationScheme } from './validationScheme'
import { Maquina } from 'app/model/maquinas'
import { MaquinaEquipamento } from 'app/model/maquina_equipamentos'
import { Componente } from 'app/model/componentes'

import { Empresa } from 'app/model/empresas'
import { Setor } from 'app/model/setor'
import React from 'react'
import useSWR from 'swr'
import { AxiosResponse } from 'axios'
import { httpClient } from 'app/http'
import { getEnvironmentData } from 'worker_threads'
import { Checkbox } from 'primereact/checkbox'
import { Toast } from 'primereact/toast'
import { TabPanel, TabView } from 'primereact/tabview'



interface ComponenteFormProps {
    onSubmit: (componete: Componente) => void;
   
}

const formScheme: Componente = {
    comCodigo:'',
    comNome: '',
    comStatus: '',
    maquinaequipamentoMAECODIGO: null
}

export const ComponenteForm: React.FC<ComponenteFormProps> = ({
    onSubmit,
   
}) => {

    
    const maquinaService = useMaquinaService();
    const empresaService = useEmpresaService();
    const maquinaEquipamentoService = useMaquinaEquipamentoService();
    const componenteService = useComponenteService();
    const setorService = useSetorService();
    
    const [ listaEmpresas, setListaEmpresas ] = useState<Empresa[]>([])
    const [ mensagem, setMensagem] = useState<string>('')
    const [ maquina, setMaquina ] = useState<Maquina>(null);
    const [ maquinaEquipamento, setMaquinaEquipamento ] = useState<MaquinaEquipamento>(null);
    const [ listaMaquinaEquipamento, setListaMaquinaEquipamento ] = useState<MaquinaEquipamento[]>([]);
    const [ componente, setComponente ] = useState<Componente>(null);
    const [ empresa, setEmpresa] = useState<Empresa>(null);
    const [ listaSetor, setListaSetor] = useState<Setor[]>([])

    const [globalFilter, setGlobalFilter] = useState<string>();
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable>(null);

    const [selectedComponentes, setSelectedComponentes] = useState<Componente[]>([]);
    const [ componentes, setComponentes ] = useState<Componente[]>([]);
    const [ maquinaEquipamentos, setMaquinaEquipamentos ] = useState<Componente[]>([]);

    const [deleteEmpresasDialog, setDeleteEmpresasDialog] = useState(false);

     /* Ativação das TabView */
    const [activeIndex1, setActiveIndex1] = useState(0);

    const [mostraBotao, setMostraBotao] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [componenteDialog, setComponenteDialog] = useState(false);
    const [ listaMaquina, setListaMaquina ] = useState<Maquina[]>([]);
    const [ setor, setSetor ] = useState<Setor>(null);
    

    const formik = useFormik<Componente>({
        onSubmit,
        initialValues: formScheme,
        validationSchema: validationScheme
    })

    /* Limpar formulário*/ 
    const limparFormulario = () => {

        formik.setFieldValue("comCodigo", '')
        formik.setFieldValue("comNome", '')
        formik.setFieldValue("comStatus", '')        

    }



    /*Carregando Empresas/Setor*/
      const getEmpresas = () => {
        empresaService.listar().then(response => setListaEmpresas(response))
        
      }; 
    
      useEffect(() => { 
       
        getEmpresas();
        
      }, []); 


     /* Métodos do CRUD (listar, gravar, editar, excluir)*/ 

    const getComponentes = () => {
        componenteService.listar().then(response => setComponentes(response))
      }; 
    
      useEffect(() => { 
       
        getComponentes();
        
      }, []);

      const salvar = () => { 
        componenteService.salvar(formik.values).then(response => {
                setComponente(response); 
                setComponentes((state) => [...state, { ...response }]);  
                toast.current.show({ severity: 'success', summary: 'Cadastro com sucesso', life: 3000 });
                /*Limpando formulário*/
                limparFormulario(); 
                getComponentes();
                
            

            })       
        }

    const alterar = async () =>  {
        componenteService.atualizar(formik.values).then(response => {
            toast.current.show({ severity: 'success', summary: 'Alerado  com sucesso', life: 3000 });
            /*Limpando formulário*/
            limparFormulario();
            /*Alterando Caption Botão*/
            setMostraBotao(false);

            getComponentes();
        })
    }

    const deletar = async () =>  {
        componenteService.deletar(componente.comCodigo).then(response => {
            setDeleteDialog(false);  
            toast.current.show({ severity: 'success', summary: 'Deletado com sucesso!!', life: 3000 });
            getComponentes();
            
        })
    }

    const hideDeleteDialog = () => {
        setDeleteDialog(false);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setComponenteDialog(false);
    }

    const confirmDelete = (componente: React.SetStateAction<Componente>) => {
        setComponente(componente);
        setDeleteDialog(true);
    }

    const componenteDialogFooter = (
        <React.Fragment>
            <Button label="Fechar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} /> 
        </React.Fragment>
    );

    const deleteDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deletar} />
        </React.Fragment>
    );
    

     
    /* Métodos da Tabela */


    const exportCSV = () => {
        dt.current?.exportCSV({selectionOnly:false});
    }


    const confirmDeleteSelected = () => {
        setDeleteEmpresasDialog(true);
    }

    const editComponente = (componente: Componente) => {

        /*Altera caption do botão para ALTERAR*/
        setMostraBotao(true);

        /* Campos do formulário*/

        formik.setFieldValue("comCodigo", componente.comCodigo)
        formik.setFieldValue("comNome", componente.comNome)
        formik.setFieldValue("comStatus", componente.comStatus)  
        
        
    }

    const consultaComponente = (componente: Componente) => {

        setComponente({...componente})
        setComponenteDialog(true);
        setMostraBotao(false);  
      
    }

    

    

    const header = (
        <div className="flex flex-column md:flex-row md:align-items-right justify-content-between">
           <div className="mt-1 md:mt-0 flex justify-content-end">
                <Button icon="pi pi-trash" className="p-button-danger mr-2 p-button-rounded" onClick={confirmDeleteSelected} disabled={!selectedComponentes || !setSelectedComponentes.length} tooltip="Delete" tooltipOptions={{position: 'bottom'}} />
                <Button icon="pi pi-upload" className="p-button-help p-button-rounded" onClick={exportCSV} tooltip="Export" tooltipOptions={{position: 'bottom'}} />
                <span className="p-input-icon-left w-full md:w-auto">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e: FormEvent<HTMLInputElement>) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." className="w-full lg:w-auto" />
                </span>
            </div>
        </div>
    );

    const actionBodyTemplate = (rowData: Componente) => {
        return (
            <React.Fragment> 
                    <Button icon="pi pi-search" className="p-button-rounded p-button-info"  tooltip='Consultar' tooltipOptions={{position: 'bottom'}} type="button"  onClick={() => consultaComponente(rowData)}/>      
                    <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" tooltip='Editar' tooltipOptions={{position: 'bottom'}} type="button" onClick={() => editComponente(rowData)}/>
                    <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" tooltip='Deletar' tooltipOptions={{position: 'bottom'}} type="button" onClick={() => confirmDelete(rowData)} />
            </React.Fragment>
        );
    }

    




    /*Métodos para carregar dados combos*/

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
        formik.setFieldValue("maquinaequipamentoMAECODIGO", e.value)

        
    }



   


    

    return (

        

                <div className="surface-card border-round shadow-2 p-4">
                        <span className="text-900 text-2xl font-medium mb-4 block">Cadatro de Componentes:</span>
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
                                                    placeholder="Selecione o Setor" />

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

                                            <div className="col-2">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="comCodigo">Codigo</label>
                                                        <InputText style={{ width: "100%" }}  disabled placeholder="Código do Componente" id="comCodigo" name="comCodigo" value={formik.values.comCodigo} />

                                                    </span>

                                    
                                            </div>

                                            <div className="col-4">

                                                <span className="ml-2">
                                                    <label style={{ color: "white" }} htmlFor="comNome">Nome*</label>
                                                    <InputText style={{ width: "100%" }}  placeholder="Digite nome do Componente" id="comNome" name="comNome" value={formik.values.comNome}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                </span>

                                                <small className="p-error p-d-block">
                                                    {formik.touched && formik.errors.comNome}
                                                </small>
                                            </div>

                                            

                                            <div className="col-2">
                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="comStatus">Ativa: *</label><br></br>
                                                        <Checkbox inputId="comStatus" name="comStatus" checked={formik.values.comStatus} onChange={formik.handleChange} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.comStatus}
                                                    </small>  

                                            </div>
                                             
                                        </div>
                                            <div>

                                                {!mostraBotao &&
                                                    <Button type="button" label="Salvar" icon="pi pi-check" onClick={salvar}/>
                                                } {mostraBotao &&
                                                    <Button  type="button" label="Alterar" icon="pi pi-check" onClick={alterar}/>
                                                } 
                                            </div>  



                                
                        
                        <div>

                            <DataTable ref={dt} value={componentes} selection={selectedComponentes} onSelectionChange={(e) => setSelectedComponentes(e.value)}
                                dataKey="comCodigo" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} maquinas"
                                globalFilter={globalFilter}  header={header} responsiveLayout="stack">
                                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                                <Column field="comCodigo" header="Código" sortable style={{ minWidth: '12rem' }}></Column>
                                <Column field="comNome" header="Nome" sortable style={{ minWidth: '16rem' }}></Column>         
                                <Column field="comStatus" header="Ativa" sortable style={{ minWidth: '10rem' }}></Column>
                                <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                                
                            </DataTable>

                        </div>

                        <Dialog visible={componenteDialog} breakpoints={{'960px': '75vw', '640px': '100vw'}} style={{width: '40vw'}} header="Cadastro de Componente" modal className="p-fluid" footer={componenteDialog} onHide={hideDialog}>
             
                                <div className="p-formgrid grid">
                                    <div className="field col">
                                        <label htmlFor="comCodigo">Código: </label>
                                        <InputText id="comCodigo"  name="comCodigo" value={componente?.comCodigo} disabled/>
                                    </div>

                                
                    
                                </div>
                                
                                <div className="p-formgrid grid">
                                <div className="field col">
                                    <label htmlFor="comNome">Nome</label>
                                    <InputText id="comNome"  name="comNome" value={componente?.comNome} disabled/>
                                </div>

                                <div className="p-checkbox-box">
                                    <label htmlFor="comStatus">Ativo:  </label>
                                    <Checkbox  inputId="comStatus" name="comStatus" value={componente?.comStatus } icon/>   
                                </div>

                                </div>

                                
                
                        </Dialog>

                        <Dialog visible={deleteDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteDialogFooter} onHide={hideDeleteDialog}>
                            <div className="flex align-items-center justify-content-center">
                                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                                {componente && <span>Tem certeza que quer deletar? <b>{componente.comNome}</b>?</span>}
                            </div>
                        </Dialog>

                    


                </form>
                
            </div>
        
    );
}