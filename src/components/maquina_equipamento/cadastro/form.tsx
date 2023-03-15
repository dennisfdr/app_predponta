
import { useFormik } from 'formik'
import { 
    AutoComplete, 
    AutoCompleteChangeParams, 
    AutoCompleteCompleteMethodParams 
} from 'primereact/autocomplete'
import { FormEvent, useEffect, useRef, useState } from 'react'


import { useEmpresaService, useMaquinaService, useMaquinaEquipamentoService } from 'app/services'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Dialog } from 'primereact/dialog'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Dropdown } from 'primereact/dropdown'
import { validationScheme } from './validationScheme'
import { Maquina } from 'app/model/maquinas'
import { MaquinaEquipamento } from 'app/model/maquina_equipamentos'
import { Empresa  } from 'app/model/empresas'
import { Setor } from 'app/model/setor'
import React from 'react'
import useSWR from 'swr'
import { AxiosResponse } from 'axios'
import { httpClient } from 'app/http'
import { getEnvironmentData } from 'worker_threads'
import { Checkbox } from 'primereact/checkbox'
import { Toast } from 'primereact/toast'
import { TabPanel, TabView } from 'primereact/tabview'



interface MaquinaEquipamentoFormProps {
    onSubmit: (maquinaEquipamento: MaquinaEquipamento) => void;
   
}

const formScheme: MaquinaEquipamento = {
    maeCodigo:'',
    maeNome: '',
    maeTag: '',
    maeStatus: '',
    maquina: null
}

export const MaquinaEquipamentoForm: React.FC<MaquinaEquipamentoFormProps> = ({
    onSubmit,
   
}) => {

    
    const maquinaService = useMaquinaService();
    const empresaService = useEmpresaService();
    const maquinaEquipamentoService = useMaquinaEquipamentoService();
    
    const [ listaEmpresas, setListaEmpresas ] = useState<Empresa[]>([])
    const [ mensagem, setMensagem] = useState<string>('')
    const [ maquina, setMaquina ] = useState<Maquina>(null);
    const [ maquinaEquipamento, setMaquinaEquipamento ] = useState<MaquinaEquipamento>(null);
    const [ empresa, setEmpresa] = useState<Empresa>(null);
    const [ listaSetor, setListaSetor] = useState<Setor[]>([])

    const [globalFilter, setGlobalFilter] = useState<string>();
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable>(null);

    const [selectedMaquinaEquipamentos, setSelectedMaquinaEquipaemntos] = useState<MaquinaEquipamento[]>([]);
    const [ maquinas, setMaquinas ] = useState<Maquina[]>([]);
    const [ maquinaEquipamentos, setMaquinaEquipamentos ] = useState<MaquinaEquipamento[]>([]);

    const [deleteEmpresasDialog, setDeleteEmpresasDialog] = useState(false);

     /* Ativação das TabView */
    const [activeIndex1, setActiveIndex1] = useState(0);

    const [mostraBotao, setMostraBotao] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [maquinaEquipamentoDialog, setMaquinaEquipamentoDialog] = useState(false);
    const [ listaMaquina, setListaMaquina ] = useState<Maquina[]>([]);
    const [ setor, setSetor ] = useState<Setor>(null);
    

    const formik = useFormik<MaquinaEquipamento>({
        onSubmit,
        initialValues: formScheme,
        validationSchema: validationScheme
    })

    /* Limpar formulário*/ 
    const limparFormulario = () => {

        formik.setFieldValue("maeCodigo", '')
        formik.setFieldValue("maeNome", '')
        formik.setFieldValue("maeTag", '')
        formik.setFieldValue("maeStatus", '')

      
        

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

    const getMaquinaEquipamentos = () => {
        maquinaEquipamentoService.listar().then(response => setMaquinaEquipamentos(response))
      }; 
    
      useEffect(() => { 
       
        getMaquinaEquipamentos();
        
      }, []);

      const salvar = () => { 
        maquinaEquipamentoService.salvar(formik.values).then(response => {
                setMaquinaEquipamento(response); 
                setMaquinaEquipamentos((state) => [...state, { ...response }]);  
                toast.current.show({ severity: 'success', summary: 'Cadastro com sucesso', life: 3000 });
                /*Limpando formulário*/
                limparFormulario(); 
                getMaquinaEquipamentos();
                setActiveIndex1(1);
            

            })       
        }

    const alterar = async () =>  {
        maquinaEquipamentoService.atualizar(formik.values).then(response => {
            toast.current.show({ severity: 'success', summary: 'Alerado  com sucesso', life: 3000 });
            /*Limpando formulário*/
            limparFormulario();
            /*Alterando Caption Botão*/
            setMostraBotao(false);

            getMaquinaEquipamentos();
        })
    }

    const deletar = async () =>  {
        maquinaEquipamentoService.deletar(maquinaEquipamento.maeCodigo).then(response => {
            setDeleteDialog(false);  
            toast.current.show({ severity: 'success', summary: 'Deletado com sucesso!!', life: 3000 });
            getMaquinaEquipamentos();
            
        })
    }

    const hideDeleteDialog = () => {
        setDeleteDialog(false);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setMaquinaEquipamentoDialog(false);
    }

    const confirmDelete = (maquinaEquipamento: React.SetStateAction<MaquinaEquipamento>) => {
        setMaquinaEquipamento(maquinaEquipamento);
        setDeleteDialog(true);
    }

    const maquinaEquipamentoDialogFooter = (
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

    const editMaquinaEquipamento = (maquinaEquipamento: MaquinaEquipamento) => {

        /*Altera caption do botão para ALTERAR*/
        setMostraBotao(true);

        /* Campos do formulário*/
        
        formik.setFieldValue("maeCodigo", maquinaEquipamento.maeCodigo)
        formik.setFieldValue("maeNome", maquinaEquipamento.maeNome)
        formik.setFieldValue("maeTag", maquinaEquipamento.maeTag)
        formik.setFieldValue("maeStatus", maquinaEquipamento.maeStatus)
        
        
    }

    const consultaMaquinaEquipaemnto = (maquinaEquipamento: MaquinaEquipamento) => {

        setMaquinaEquipamento({...maquinaEquipamento})
        setMaquinaEquipamentoDialog(true);
        setMostraBotao(false);  
      
    }

    

    

    const header = (
        <div className="flex flex-column md:flex-row md:align-items-right justify-content-between">
           <div className="mt-1 md:mt-0 flex justify-content-end">
                <Button icon="pi pi-trash" className="p-button-danger mr-2 p-button-rounded" onClick={confirmDeleteSelected} disabled={!selectedMaquinaEquipamentos || !selectedMaquinaEquipamentos.length} tooltip="Delete" tooltipOptions={{position: 'bottom'}} />
                <Button icon="pi pi-upload" className="p-button-help p-button-rounded" onClick={exportCSV} tooltip="Export" tooltipOptions={{position: 'bottom'}} />
                <span className="p-input-icon-left w-full md:w-auto">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e: FormEvent<HTMLInputElement>) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." className="w-full lg:w-auto" />
                </span>
            </div>
        </div>
    );

    const actionBodyTemplate = (rowData: MaquinaEquipamento) => {
        return (
            <React.Fragment> 
                    <Button icon="pi pi-search" className="p-button-rounded p-button-info"  tooltip='Consultar' tooltipOptions={{position: 'bottom'}} type="button"  onClick={() => consultaMaquinaEquipaemnto(rowData)}/>      
                    <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" tooltip='Editar' tooltipOptions={{position: 'bottom'}} type="button" onClick={() => editMaquinaEquipamento(rowData)}/>
                    <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" tooltip='Deletar' tooltipOptions={{position: 'bottom'}} type="button" onClick={() => confirmDelete(rowData)} />
            </React.Fragment>
        );
    }

    




    /*Métodos para carregar dados combos*/

    const handleEmpresaChange = (e: { value: Empresa}) => {
        
        setEmpresa(e.value)
        
    }

    
    const handleSetorChange = (e: { value: any}) => {
        setSetor(e.value)
        maquinaService.carregarBySetor(e.value).then(maquinas => setListaMaquina(maquinas))   
    }

    const handleMaquinaChange = (e: { value: any}) => {
        setMaquina(e.value)
        formik.setFieldValue("maquina", e.value)
       
        
    }



   


    

    return (

        

                <div className="surface-card border-round shadow-2 p-4">
                        <span className="text-900 text-2xl font-medium mb-4 block">Cadatro de Máquina-Equipamentos:</span>
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

                                            <div className="col-2">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="maeCodigo">Codigo</label>
                                                        <InputText style={{ width: "100%" }}  disabled placeholder="Código da Maquina-Equipaemnto" id="maeCodigo" name="maeCodigo" value={formik.values.maeCodigo} />

                                                    </span>

                                    
                                            </div>

                                            
                                    

                                    <div className="col-4">

                                    <span className="ml-2">
                                        <label style={{ color: "white" }} htmlFor="maeNome">Nome*</label>
                                        <InputText style={{ width: "100%" }}  placeholder="Digite nome da Máquina-Equipamento" id="maeNome" name="maeNome" value={formik.values.maeNome}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                    </span>

                                    <small className="p-error p-d-block">
                                        {formik.touched && formik.errors.maeNome}
                                    </small>
                                    </div>

                                    <div className="col-4">

                                    <span className="ml-2">
                                        <label style={{ color: "white" }} htmlFor="maeTag">TAG*</label>
                                        <InputText style={{ width: "100%" }}  placeholder="Digite a Tag da Máquina-Equipamento" id="maeTag" name="maeTag" value={formik.values.maeTag}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                    </span>

                                    <small className="p-error p-d-block">
                                        {formik.touched && formik.errors.maeTag}
                                    </small>
                                    </div>

                                    <div className="col-2">
                                        <span className="ml-2">
                                            <label style={{ color: "white" }} htmlFor="maeStatus">Ativa: *</label><br></br>
                                            <Checkbox inputId="maeStatus" name="maeStatus" checked={formik.values.maeStatus} onChange={formik.handleChange} />

                                        </span>

                                        <small className="p-error p-d-block">
                                            {formik.touched && formik.errors.maeStatus}
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

                            <DataTable ref={dt} value={maquinaEquipamentos} selection={selectedMaquinaEquipamentos} onSelectionChange={(e) => setSelectedMaquinaEquipaemntos(e.value)}
                                dataKey="maeCodigo" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} maquinas"
                                globalFilter={globalFilter}  header={header} responsiveLayout="stack">
                                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                                <Column field="maeCodigo" header="Código" sortable style={{ minWidth: '12rem' }}></Column>
                                <Column field="maeNome" header="Nome" sortable style={{ minWidth: '16rem' }}></Column>         
                                <Column field="maeTag" header="Tag" sortable style={{ minWidth: '10rem' }}></Column>
                                <Column field="maqStatus" header="Ativa" sortable style={{ minWidth: '10rem' }}></Column>
                                <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                                
                            </DataTable>

                        </div>

                        <Dialog visible={maquinaEquipamentoDialog} breakpoints={{'960px': '75vw', '640px': '100vw'}} style={{width: '40vw'}} header="Cadastro de Máquina" modal className="p-fluid" footer={maquinaEquipamentoDialog} onHide={hideDialog}>
             
                                <div className="p-formgrid grid">
                                    <div className="field col">
                                        <label htmlFor="maeCodigo">Código: </label>
                                        <InputText id="maeCodigo"  name="maeCodigo" value={maquinaEquipamento?.maeCodigo} disabled/>
                                    </div>

                                
                    
                                </div>
                                
                                <div className="p-formgrid grid">
                                <div className="field col">
                                    <label htmlFor="maeNome">Nome</label>
                                    <InputText id="maeNome"  name="maeNome" value={maquinaEquipamento?.maeNome} disabled/>
                                </div>

                                <div className="p-checkbox-box">
                                    <label htmlFor="maeStatus">Ativo:  </label>
                                    <Checkbox  inputId="maeStatus" name="maeStatus" value={maquinaEquipamento?.maeStatus } icon/>   
                                </div>

                                </div>

                                <div className="p-formgrid grid">

                                <div className="field col">
                                    <label htmlFor="maeTag">Andar</label>
                                    <InputText id="maeTag"  name="maeTag" value={maquinaEquipamento?.maeTag} disabled/>
                                </div>

                                </div>
                
                        </Dialog>

                        <Dialog visible={deleteDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteDialogFooter} onHide={hideDeleteDialog}>
                            <div className="flex align-items-center justify-content-center">
                                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                                {maquinaEquipamento && <span>Tem certeza que quer deletar? <b>{maquinaEquipamento.maeNome}</b>?</span>}
                            </div>
                        </Dialog>

                


                </form>
                
            </div>
        
    );
}