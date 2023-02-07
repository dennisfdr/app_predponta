
import { useFormik } from 'formik'
import { 
    AutoComplete, 
    AutoCompleteChangeParams, 
    AutoCompleteCompleteMethodParams 
} from 'primereact/autocomplete'
import { FormEvent, useEffect, useRef, useState } from 'react'


import { useEmpresaService, useMaquinaService } from 'app/services'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Dialog } from 'primereact/dialog'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Dropdown } from 'primereact/dropdown'
import { validationScheme } from './validationScheme'
import { Maquina } from 'app/model/maquinas'
import { Empresa, Setor } from 'app/model/empresas'
import React from 'react'
import useSWR from 'swr'
import { AxiosResponse } from 'axios'
import { httpClient } from 'app/http'
import { getEnvironmentData } from 'worker_threads'
import { Checkbox } from 'primereact/checkbox'
import { Toast } from 'primereact/toast'
import { TabPanel, TabView } from 'primereact/tabview'



interface MaquinaFormProps {
    onSubmit: (maquina: Maquina) => void;
   
}

const formScheme: Maquina = {
    maqCodigo:'',
    maqNome: '',
    maqAndar: '',
    maqStatus: null,
    setor: null
}

export const MaquinaForm: React.FC<MaquinaFormProps> = ({
    onSubmit,
   
}) => {

    
    const maquinaService = useMaquinaService();
    const empresaService = useEmpresaService();
    
    const [ listaEmpresas, setListaEmpresas ] = useState<Empresa[]>([])
    const [ mensagem, setMensagem] = useState<string>('')
    const [ maquina, setMaquina ] = useState<Maquina>(null);
    const [ empresa, setEmpresa] = useState<Empresa>(null);
    const [ listaSetor, setListaSetor] = useState<Setor[]>([])

    const [globalFilter, setGlobalFilter] = useState<string>();
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable>(null);

    const [selectedMaquinas, setSelectedMaquinas] = useState<Maquina[]>([]);
    const [ maquinas, setMaquinas ] = useState<Maquina[]>([]);

    const [deleteEmpresasDialog, setDeleteEmpresasDialog] = useState(false);

     /* Ativação das TabView */
    const [activeIndex1, setActiveIndex1] = useState(0);

    const [mostraBotao, setMostraBotao] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [maquinaDialog, setMaquinaDialog] = useState(false);
    

    const formik = useFormik<Maquina>({
        onSubmit,
        initialValues: formScheme,
        validationSchema: validationScheme
    })

    /* Limpar formulário*/ 
    const limparFormulario = () => {

        formik.setFieldValue("maqCodigo", '')
        formik.setFieldValue("maqNome", '')
        formik.setFieldValue("maqAndar", '')
        formik.setFieldValue("maqStatus", '')
        
        

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

    const getMaquinas = () => {
        maquinaService.listar().then(response => setMaquinas(response))
      }; 
    
      useEffect(() => { 
       
        getMaquinas();
        
      }, []);

      const salvar = () => { 
            maquinaService.salvar(formik.values).then(response => {
                setMaquina(response); 
                setMaquinas((state) => [...state, { ...response }]);  
                toast.current.show({ severity: 'success', summary: 'Cadastro com sucesso', life: 3000 });
                /*Limpando formulário*/
                limparFormulario(); 
                getMaquinas();
                setActiveIndex1(1);
            

            })       
        }

    const alterar = async () =>  {
        maquinaService.atualizar(formik.values).then(response => {
            toast.current.show({ severity: 'success', summary: 'Alerado  com sucesso', life: 3000 });
            /*Limpando formulário*/
            limparFormulario();
            /*Alterando Caption Botão*/
            setMostraBotao(false);

            getMaquinas();
        })
    }

    const deletar = async () =>  {
            maquinaService.deletar(maquina.maqCodigo).then(response => {
            setDeleteDialog(false);  
            toast.current.show({ severity: 'success', summary: 'Deletado com sucesso!!', life: 3000 });
            getMaquinas();
            
        })
    }

    const hideDeleteDialog = () => {
        setDeleteDialog(false);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setMaquinaDialog(false);
    }

    const confirmDelete = (empresa: React.SetStateAction<Maquina>) => {
        setMaquina(maquina);
        setDeleteDialog(true);
    }

    const maquinaDialogFooter = (
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

    const editMaquina = (maquina: Maquina) => {

        /*Altera caption do botão para ALTERAR*/
        setMostraBotao(true);

        /* Campos do formulário*/
        
        formik.setFieldValue("maqCodigo", maquina.maqCodigo)
        formik.setFieldValue("maqNome", maquina.maqNome)
        formik.setFieldValue("maqAndar", maquina.maqAndar)
        formik.setFieldValue("maqStatus", maquina.maqStatus)
        
        
    }

    const consultaMaquina = (maquina: Maquina) => {

        setMaquina({...maquina})
        setMaquinaDialog(true);
        setMostraBotao(false);  
      
    }

    

    

    const header = (
        <div className="flex flex-column md:flex-row md:align-items-right justify-content-between">
           <div className="mt-1 md:mt-0 flex justify-content-end">
                <Button icon="pi pi-trash" className="p-button-danger mr-2 p-button-rounded" onClick={confirmDeleteSelected} disabled={!selectedMaquinas || !selectedMaquinas.length} tooltip="Delete" tooltipOptions={{position: 'bottom'}} />
                <Button icon="pi pi-upload" className="p-button-help p-button-rounded" onClick={exportCSV} tooltip="Export" tooltipOptions={{position: 'bottom'}} />
                <span className="p-input-icon-left w-full md:w-auto">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e: FormEvent<HTMLInputElement>) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." className="w-full lg:w-auto" />
                </span>
            </div>
        </div>
    );

    const actionBodyTemplate = (rowData: Maquina) => {
        return (
            <React.Fragment> 
                    <Button icon="pi pi-search" className="p-button-rounded p-button-info"  tooltip='Consultar' tooltipOptions={{position: 'bottom'}} type="button"  onClick={() => consultaMaquina(rowData)}/>      
                    <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" tooltip='Editar' tooltipOptions={{position: 'bottom'}} type="button" onClick={() => editMaquina(rowData)}  disabled/>
                    <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" tooltip='Deletar' tooltipOptions={{position: 'bottom'}} type="button" onClick={() => confirmDelete(rowData)} />
            </React.Fragment>
        );
    }

    






    const handleEmpresaChange = (e: { value: Empresa}) => {
        
        setEmpresa(e.value)
        setListaSetor(e.value.setor)   
    }

    const handleSetorChange = (e: { value: any}) => {
        formik.setFieldValue("setor", e.value)
    }


   


    

    return (

       

                <div className="surface-card border-round shadow-2 p-4">
                        <span className="text-900 text-2xl font-medium mb-4 block">Cadatro de Máquinas:</span>
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
                                                    value={formik.values.setor} 
                                                    options={listaSetor} 
                                                    onChange={handleSetorChange} 
                                                    optionLabel="setNome" 
                                                    placeholder="Selecione o Setor" />

                                            </div> 

                                            <div className="col-2">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="maqCodigo">Codigo</label>
                                                        <InputText style={{ width: "100%" }}  disabled placeholder="Código da maquina" id="maqCodigo" name="maqCodigo" value={formik.values.maqCodigo} />

                                                    </span>

                                    
                                            </div>

                                            <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="maqNome">Nome*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite nome da maquina" id="maqNome" name="maqNome" value={formik.values.maqNome}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.maqNome}
                                                    </small>
                                            </div>

                                            <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="maqAndar">Andar*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite o Andar da Máquina" id="maqAndar" name="maqAndar" value={formik.values.maqAndar}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.maqAndar}
                                                    </small>
                                            </div>

                                            <div className="col-2">
                                                        <span className="ml-2">
                                                            <label style={{ color: "white" }} htmlFor="maqStatus">Ativa: *</label><br></br>
                                                            <Checkbox inputId="maqStatus" name="maqStatus" checked={formik.values.maqStatus} onChange={formik.handleChange} />

                                                        </span>

                                            </div>
                                    </div>

                                    {!mostraBotao &&
                                        <Button type="button" label="Salvar" icon="pi pi-check" onClick={salvar}/>
                                    } {mostraBotao &&
                                        <Button  type="button" label="Alterar" icon="pi pi-check" onClick={alterar}/>
                                    } 

                                     
                        
                                
                        
                        <div>

                            <DataTable ref={dt} value={maquinas} selection={selectedMaquinas} onSelectionChange={(e) => setSelectedMaquinas(e.value)}
                                dataKey="maqCodigo" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} maquinas"
                                globalFilter={globalFilter}  header={header} responsiveLayout="stack">
                                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                                <Column field="maqCodigo" header="Código" sortable style={{ minWidth: '12rem' }}></Column>
                                <Column field="maqNome" header="Nome" sortable style={{ minWidth: '16rem' }}></Column>         
                                <Column field="maqAndar" header="Andar" sortable style={{ minWidth: '10rem' }}></Column>
                                <Column field="maqStatus" header="Ativa" sortable style={{ minWidth: '10rem' }}></Column>
                                <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                                
                            </DataTable>

                        </div>

                        <Dialog visible={maquinaDialog} breakpoints={{'960px': '75vw', '640px': '100vw'}} style={{width: '40vw'}} header="Cadastro de Máquina" modal className="p-fluid" footer={maquinaDialogFooter} onHide={hideDialog}>
             
                                <div className="p-formgrid grid">
                                    <div className="field col">
                                        <label htmlFor="maqCodigo">Código: </label>
                                        <InputText id="maqCodigo"  name="maqCodigo" value={maquina?.maqCodigo} disabled/>
                                    </div>

                                
                    
                                </div>
                                
                                <div className="p-formgrid grid">
                                <div className="field col">
                                    <label htmlFor="maqNome">Nome</label>
                                    <InputText id="maqNome"  name="maqNome" value={maquina?.maqNome} disabled/>
                                </div>

                                <div className="p-checkbox-box">
                                    <label htmlFor="maqStatus">Ativo:  </label>
                                    <Checkbox  inputId="maqStatus" name="maqStatus" value={maquina?.maqStatus } icon/>   
                                </div>

                                </div>

                                <div className="p-formgrid grid">

                                <div className="field col">
                                    <label htmlFor="maqAndar">Andar</label>
                                    <InputText id="maqAndar"  name="maqAndar" value={maquina?.maqAndar} disabled/>
                                </div>

                                </div>
                
                        </Dialog>

                        <Dialog visible={deleteDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteDialogFooter} onHide={hideDeleteDialog}>
                            <div className="flex align-items-center justify-content-center">
                                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                                {maquina && <span>Tem certeza que quer deletar? <b>{maquina.maqNome}</b>?</span>}
                            </div>
                        </Dialog>

                


                </form>
                
            </div>
       
    );
}