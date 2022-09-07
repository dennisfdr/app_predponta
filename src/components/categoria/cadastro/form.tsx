
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
    useMcaStatusService,
    useCategoriaService, 
     } from 'app/services'

import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Dialog } from 'primereact/dialog'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Dropdown } from 'primereact/dropdown'
import { validationScheme } from './validationScheme'
import { Maquina } from 'app/model/maquinas'
import { Empresa, Setor } from 'app/model/empresas'
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
import { McaStatus } from 'app/model/mca_status'
import { Categoria} from 'app/model/categoria'




interface CategoriaFormProps {
    onSubmit: (categoria: Categoria) => void;
   
}

const formScheme: Categoria = {
   
    catCodigo:'',
    catDescricao:'',
   
    
        
}

export const CategoriaForm: React.FC<CategoriaFormProps> = ({
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
    const mcaStatusService = useMcaStatusService();
    const categoriaService = useCategoriaService();


    
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
    const [ listaCategoria, setListaCategoria ] = useState<Categoria[]>([]);

    const [ maquinaEquipamento, setMaquinaEquipamento ] = useState<MaquinaEquipamento>(null);
    const [ componente, setComponente ] = useState<Componente>(null);
    const [ setor, setSetor ] = useState<Setor>(null);
    const [ medicao, setMedicao ] = useState<Medicao>(null);
    const [ mcaMedicao, setMcaMedicao ] = useState<McaMedicao>(null);
    const [ categoria, setCategoria ] = useState<Categoria>(null);



    const [globalFilter, setGlobalFilter] = useState<string>();
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable>(null);
    const [categoriaDialog, setCategoriaDialog] = useState(false);
    const [mostraBotao, setMostraBotao] = useState(false);
    const [submitted, setSubmitted] = useState(false);


    const [selectedCategoria, setSelectedCategoria] = useState<Categoria[]>([]);
    const [ maquinas, setMaquinas ] = useState<Maquina[]>([]);

    const [deleteEmpresasDialog, setDeleteEmpresasDialog] = useState(false);

    const [ date1, setAlteraData1 ] = useState<Date | Date[] | undefined>(undefined);
    

    

    const formik = useFormik<Categoria>({
        onSubmit,
        initialValues: formScheme,
        validationSchema: validationScheme
    })


/*Carregando Empresas/Setor*/
      useEffect(() => { 
        getData();
        
      }, []); 
    
      const getData = () => {
        fetch("http://localhost:8080/empresas") 
          .then((response) => response.json()) 
          .then((responseJson) => { 
            setListaEmpresas(responseJson); 
            setListaSetor(null);
          }) 
          .catch((error) => { 
            console.error(error); 
          }); 
      };

      

    /*Carregando Mca Relatorio*/  

    const { data: result, error } = useSWR<AxiosResponse<Categoria[]>>
    ('/categoria', url => httpClient.get(url) )

    useEffect( () => {
        setListaCategoria(result?.data || [])
    }, [result])

    


    

     
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
                <Button icon="pi pi-trash" className="p-button-danger mr-2 p-button-rounded" onClick={confirmDeleteSelected} disabled={!selectedCategoria || !selectedCategoria.length} tooltip="Delete" tooltipOptions={{position: 'bottom'}} />
                <Button icon="pi pi-upload" className="p-button-help p-button-rounded" onClick={exportCSV} tooltip="Export" tooltipOptions={{position: 'bottom'}} />
                <span className="p-input-icon-left w-full md:w-auto">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e: FormEvent<HTMLInputElement>) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." className="w-full lg:w-auto" />
                </span>
            </div>
        </div>
    );

    const actionBodyTemplate = (rowData: Categoria) => {
        return (
            <React.Fragment> 
                    <Button icon="pi pi-search" tooltip='Consultar' tooltipOptions={{position: 'bottom'}} className="p-button-rounded p-button-info" type="button"  onClick={() => consultaCategoria(rowData)}/>      
                    <Button icon="pi pi-pencil" tooltip='Editar' tooltipOptions={{position: 'bottom'}} className="p-button-rounded p-button-success mr-2" type="button" onClick={() => editCategoria(rowData)}  />
                    <Button icon="pi pi-trash" tooltip='Deletar' tooltipOptions={{position: 'bottom'}} className="p-button-rounded p-button-danger"  type="button" onClick={() => deleteCategoria(rowData)} />
            </React.Fragment>
        );
    }

    const hideDialog = () => {
        setSubmitted(false);
        setCategoriaDialog(false);
    }


    const editCategoria = (categoria: Categoria) => {

        /*Altera caption do botão para ALTERAR*/
        setMostraBotao(true);

        /* Campos do formulário*/
        formik.setFieldValue("catCodigo", categoria.catCodigo)
        formik.setFieldValue("catDescricao", categoria.catDescricao)
        
    }
    
    const consultaCategoria = (categoria: Categoria) => {

        setCategoria({...categoria})
        setCategoriaDialog(true);
        setMostraBotao(false);  
      
    }

    const deleteCategoria = (categoria: Categoria) => {

        categoriaService.deletar(categoria.catCodigo)
    }





    const categoriaDialogFooter = (
        <React.Fragment>
                <Button label="Fechar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
        </React.Fragment>
    );

    




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
                        <span className="text-900 text-2xl font-medium mb-4 block">Cadatro de Categorias:</span>
                        <form onSubmit={formik.handleSubmit}>

                            
                                  <div className="grid">
                                            
                                            <div className="col-2">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="catCodigo">Codigo</label>
                                                        <InputText style={{ width: "100%" }}  disabled placeholder="Código Categoria" id="catCodigo" name="catCodigo" value={formik.values.catCodigo} />

                                                    </span>

                                    
                                            </div>

                                            <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="catDescricao">Descrição*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a Descrição" id="catDescricao" name="catDescricao" value={formik.values.catDescricao}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.catDescricao}
                                                    </small>

                                                    
                                           </div>

                                           
                                            
                                    </div>


                                    {!mostraBotao &&
                                        <Button type="submit" label="Salvar" icon="pi pi-check"  />
                                    } {mostraBotao &&
                                        <Button  type="submit" label="Alterar" icon="pi pi-check" />
                                    }  

                                    
                                

                                
                        <div>

                            <DataTable ref={dt} value={listaCategoria} selection={selectedCategoria} onSelectionChange={(e) => setSelectedCategoria(e.value)}
                                dataKey="catCodigo" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Histórico Componentes"
                                globalFilter={globalFilter}  header={header} responsiveLayout="stack">
                                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                                <Column field="catCodigo" header="Código" sortable style={{ minWidth: '12rem' }}></Column>
                                <Column field="catDescricao" header="Descrição" sortable style={{ minWidth: '12rem' }}></Column>
                                <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                                
                            </DataTable>

                        </div>

                


                </form>

                <Dialog visible={categoriaDialog} breakpoints={{'960px': '75vw', '640px': '100vw'}} style={{width: '40vw'}} header="Cadastro de Categorias" modal className="p-fluid" footer={categoriaDialogFooter} onHide={hideDialog}>

                                        <div className="grid">
                                            
                                            <div className="col-2">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="catCodigo">Codigo</label>
                                                        <InputText style={{ width: "100%" }}  disabled placeholder="Código Categoria" id="catCodigo" name="catCodigo" value={categoria?.catCodigo} />

                                                    </span>

                                    
                                            </div>

                                            <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="catDescricao">Descrição*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a Descrição" id="catDescricao" name="catDescricao"  value={categoria?.catDescricao}/>

                                                    </span>

                                                    

                                                    
                                           </div>

                                           
                                            
                                    </div>
            
                
                </Dialog>
                
            </div>
       
    );
}