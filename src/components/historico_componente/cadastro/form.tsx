
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
    useHistoricoComponenteService 
    
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



interface HistoricoComponenteFormProps {
    onSubmit: (historicoComponente: HistoricoComponente) => void;
   
}

const formScheme: HistoricoComponente = {
    hcoCodigo:'',
    hcoObservacao: '',
    hcoOrdemServico: '',
    componente: null
    
}

export const HistoricoComponenteForm: React.FC<HistoricoComponenteFormProps> = ({
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
    const [ listaSetor, setListaSetor] = useState<Setor[]>([])
    const [ listaMaquina, setListaMaquina ] = useState<Maquina[]>([]);
    const [ listaMaquinaEquipamento, setListaMaquinaEquipamento ] = useState<MaquinaEquipamento[]>([]);
    const [ listaComponente, setListaComponente ] = useState<Componente[]>([]);
    

    const [ maquinaEquipamento, setMaquinaEquipamento ] = useState<MaquinaEquipamento>(null);
    const [ componente, setComponente ] = useState<Componente>(null);
    const [ setor, setSetor ] = useState<Setor>(null);



    const [globalFilter, setGlobalFilter] = useState<string>();
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable>(null);

    const [selectedHistoricoComponentes, setSelectedHistoricoComponentes] = useState<HistoricoComponente[]>([]);
    const [ maquinas, setMaquinas ] = useState<Maquina[]>([]);

    const [deleteEmpresasDialog, setDeleteEmpresasDialog] = useState(false);


    /*Copiar estas variávies*/
    const [ entidades, setEntidades ] = useState<HistoricoComponente[]>([]);
    const [ entidade, setEntidade ] = useState<HistoricoComponente>(null);
    const [mostraBotao, setMostraBotao] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [entidadeDialog, setEntidadeDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const entidadeService = useHistoricoComponenteService();
    

    

    const formik = useFormik<HistoricoComponente>({
        onSubmit,
        initialValues: formScheme,
        validationSchema: validationScheme
    })


/* Limpar formulário*/ 
const limparFormulario = () => {

    formik.setFieldValue("hcoCodigo", '')
    formik.setFieldValue("hcoObservacao", '')
    formik.setFieldValue("hcoOrdemServico", '') 
    
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
            console.log(response);
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
    entidadeService.deletar(entidade.hcoCodigo).then(response => {
        setDeleteDialog(false);  
        toast.current.show({ severity: 'success', summary: 'Deletado com sucesso!!', life: 3000 });
        getEntidades();
        
    })
}

const editEntidade = (entidade: HistoricoComponente) => {

    /*Altera caption do botão para ALTERAR*/
    setMostraBotao(true);

    /* Campos do formulário*/

    formik.setFieldValue("hcoCodigo", entidade.hcoCodigo)
    formik.setFieldValue("hcoObservacao", entidade.hcoObservacao)
    formik.setFieldValue("hcoOrdemServico", entidade.hcoOrdemServico) 
    
    
}

const consultaEntidade = (entidade: HistoricoComponente) => {

    setEntidade({...entidade})
    setEntidadeDialog(true);
    setMostraBotao(false);  
  
}

const confirmDelete = (entidade: React.SetStateAction<HistoricoComponente>) => {
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
                <Button icon="pi pi-trash" className="p-button-danger mr-2 p-button-rounded" onClick={confirmDeleteSelected} disabled={!selectedHistoricoComponentes || !selectedHistoricoComponentes.length} tooltip="Delete" tooltipOptions={{position: 'bottom'}} />
                <Button icon="pi pi-upload" className="p-button-help p-button-rounded" onClick={exportCSV} tooltip="Export" tooltipOptions={{position: 'bottom'}} />
                <span className="p-input-icon-left w-full md:w-auto">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e: FormEvent<HTMLInputElement>) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." className="w-full lg:w-auto" />
                </span>
            </div>
        </div>
    );

    const actionBodyTemplate = (rowData: HistoricoComponente) => {
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



    



    /*Métodos Carregar combos*/    


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
         formik.setFieldValue("componente", e.value)
    }


   


    

    return (

        

                <div className="surface-card border-round shadow-2 p-4">
                        <span className="text-900 text-2xl font-medium mb-4 block">Cadatro de Histórico de Componentes:</span>
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
                                            
                                            
                                            
                                            
                                            
                                            
                                            <div className="col-2">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="hcoCodigo">Codigo</label>
                                                        <InputText style={{ width: "100%" }}  disabled placeholder="Código do Hist. Componente" id="hcoCodigo" name="hcoCodigo" value={formik.values.hcoCodigo} />

                                                    </span>

                                    
                                            </div>

                                            <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="hcoObservacao">Observacao*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a Observação" id="hcoObservacao" name="hcoObservacao" value={formik.values.hcoObservacao}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.hcoObservacao}
                                                    </small>
                                            </div>

                                            <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="hcoOrdemServico">Ordem Serviço*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a Ordem Serviço" id="hcoOrdemServico" name="hcoOrdemServico" value={formik.values.hcoOrdemServico}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.hcoOrdemServico}
                                                    </small>
                                            </div>

                                           
                                    </div>

                                    {!mostraBotao &&
                                        <Button type="button" label="Salvar" icon="pi pi-check" onClick={salvar}/>
                                    } {mostraBotao &&
                                        <Button  type="button" label="Alterar" icon="pi pi-check" onClick={alterar}/>
                                    } 
                                

                                
                        <div>

                            <DataTable ref={dt} value={entidades} selection={selectedHistoricoComponentes} onSelectionChange={(e) => setSelectedHistoricoComponentes(e.value)}
                                dataKey="hcoCodigo" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Histórico Componentes"
                                globalFilter={globalFilter}  header={header} responsiveLayout="stack">
                                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                                <Column field="hcoCodigo" header="Código" sortable style={{ minWidth: '12rem' }}></Column>
                                <Column field="hcoObservacao" header="Observacao" sortable style={{ minWidth: '16rem' }}></Column>         
                                <Column field="hcoOrdemServico" header="Ordem Servico" sortable style={{ minWidth: '10rem' }}></Column>
                                <Column field="componente" header="Componente" sortable style={{ minWidth: '10rem' }}></Column>
                                <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                                
                            </DataTable>

                        </div>

                        <Dialog visible={entidadeDialog} breakpoints={{'960px': '75vw', '640px': '100vw'}} style={{width: '40vw'}} header="Cadastro de Historico-Componente" modal className="p-fluid" footer={entidadeDialog} onHide={hideDialog}>
             
                                <div className="p-formgrid grid">
                                    <div className="field col">
                                        <label htmlFor="hcoCodigo">Código: </label>
                                        <InputText id="hcoCodigo"  name="hcoCodigo" value={entidade?.hcoCodigo} disabled/>
                                    </div>

                                
                    
                                </div>
                                
                                <div className="p-formgrid grid">
                                <div className="field col">
                                    <label htmlFor="hcoObservacao">Nome</label>
                                    <InputText id="hcoObservacao"  name="hcoObservacao" value={entidade?.hcoObservacao} disabled/>
                                </div>

                                <div className="p-checkbox-box">
                                    <label htmlFor="hcoOrdemServico">Ativo:  </label>
                                    <Checkbox  inputId="hcoOrdemServico" name="hcoOrdemServico" value={entidade?.hcoOrdemServico } icon/>   
                                </div>

                                </div>

                                
                
                        </Dialog>

                        <Dialog visible={deleteDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteDialogFooter} onHide={hideDeleteDialog}>
                            <div className="flex align-items-center justify-content-center">
                                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                                {entidade && <span>Tem certeza que quer deletar? <b>{entidade.hcoCodigo}</b>?</span>}
                            </div>
                        </Dialog>

                


                </form>
                
            </div>
       
    );
}