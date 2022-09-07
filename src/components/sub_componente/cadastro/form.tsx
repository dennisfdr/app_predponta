
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
    useComponentePecaService } from 'app/services'

import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Dialog } from 'primereact/dialog'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Dropdown } from 'primereact/dropdown'
import { validationScheme } from './validationScheme'
import { Maquina } from 'app/model/maquinas'
import { Empresa, Setor } from 'app/model/empresas'
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
import { Sub_Componente } from 'app/model/sub_componente'
import { Componente_Peca } from 'app/model/componente_peca'



interface Sub_ComponenteFormProps {
    onSubmit: (subComponente: Sub_Componente) => void;
   
}

const formScheme: Sub_Componente = {
    scoCodigo:'',
    scoNome: '',
    scoStatus: '',
    componentePeca: null
    
}

export const Sub_ComponenteForm: React.FC<Sub_ComponenteFormProps> = ({
    onSubmit,
   
}) => {

    
    const maquinaService = useMaquinaService();
    const empresaService = useEmpresaService();
    const maquinaEquipamentoService = useMaquinaEquipamentoService();
    const componenteService = useComponenteService();
    const componentePecaService = useComponentePecaService();
    
    const [ listaEmpresas, setListaEmpresas ] = useState<Empresa[]>([])
    const [ mensagem, setMensagem] = useState<string>('')
    const [ maquina, setMaquina ] = useState<Maquina>(null);
    const [ empresa, setEmpresa] = useState<Empresa>(null);
    const [ listaSetor, setListaSetor] = useState<Setor[]>([])
    const [ listaMaquina, setListaMaquina ] = useState<Maquina[]>([]);
    const [ listaMaquinaEquipamento, setListaMaquinaEquipamento ] = useState<MaquinaEquipamento[]>([]);
    const [ listaComponente, setListaComponente ] = useState<Componente[]>([]);
    const [ listaComponentePeca, setListaComponentePeca ] = useState<Componente_Peca[]>([]);
    const [ componentePeca, setComponentePeca ] = useState<Componente_Peca>(null);
    const [ listaSubComponente, setListaSubComponente ] = useState<Sub_Componente[]>([]);

    const [ maquinaEquipamento, setMaquinaEquipamento ] = useState<MaquinaEquipamento>(null);
    const [ componente, setComponente ] = useState<Componente>(null);
    const [ setor, setSetor ] = useState<Setor>(null);



    const [globalFilter, setGlobalFilter] = useState<string>();
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable>(null);

    const [selectedSubComponente, setSelectedSubComponente] = useState<Sub_Componente[]>([]);
    const [ maquinas, setMaquinas ] = useState<Maquina[]>([]);

    const [deleteEmpresasDialog, setDeleteEmpresasDialog] = useState(false);

    

    

    const formik = useFormik<Sub_Componente>({
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

      

    /*Carregando Historico Componentes*/  

    const { data: result, error } = useSWR<AxiosResponse<Sub_Componente[]>>
    ('/subcomponentes', url => httpClient.get(url) )

    useEffect( () => {
        setListaSubComponente(result?.data || [])
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
                <Button icon="pi pi-trash" className="p-button-danger mr-2 p-button-rounded" onClick={confirmDeleteSelected} disabled={!selectedSubComponente || !setSelectedSubComponente.length} tooltip="Delete" tooltipOptions={{position: 'bottom'}} />
                <Button icon="pi pi-upload" className="p-button-help p-button-rounded" onClick={exportCSV} tooltip="Export" tooltipOptions={{position: 'bottom'}} />
                <span className="p-input-icon-left w-full md:w-auto">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e: FormEvent<HTMLInputElement>) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." className="w-full lg:w-auto" />
                </span>
            </div>
        </div>
    );

    const actionBodyTemplate = (rowData: Empresa) => {
        return (
            <React.Fragment> 
                    
                    <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2"   />
                    <Button icon="pi pi-trash" className="p-button-rounded p-button-danger"  />
            </React.Fragment>
        );
    }

    






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
         componentePecaService.carregarByComponente(e.value).then(componentePeca => setListaComponentePeca(componentePeca))
    }

    const handleComponentePecaChange = (e: { value: any}) => {
        setComponentePeca(e.value)
        formik.setFieldValue("componentePeca", e.value)
   }


   


    

    return (

        

                <div className="surface-card border-round shadow-2 p-4">
                        <span className="text-900 text-2xl font-medium mb-4 block">Cadatro de Sub Componente:</span>
                        <form onSubmit={formik.handleSubmit}>

                            
                                        <div className="grid">
                                            <div className="col-6">
                                                <label style={{ color: "white" }} htmlFor="empresa">Empresa: *</label>
                                                <Dropdown 
                                                    style={{ width: "100%" }}
                                                    value={empresa} 
                                                    options={listaEmpresas}
                                                    onChange={handleEmpresaChange} 
                                                    optionLabel="empCodigo" 
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
                                                <label style={{ color: "white" }} htmlFor="componente_peca">ComponentePeca: *</label>
                                                <Dropdown 
                                                    style={{ width: "100%" }}
                                                    value={componentePeca} 
                                                    options={listaComponentePeca} 
                                                    onChange={handleComponentePecaChange} 
                                                    optionLabel="copDescricao" 
                                                    placeholder="Selecione o ComponentePeca" />

                                            </div> 
                                            
                                            
                                            
                                            
                                            
                                            <div className="col-2">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="scoCodigo">Codigo</label>
                                                        <InputText style={{ width: "100%" }}  disabled placeholder="Código SubComponente" id="scoCodigo" name="scoCodigo" value={formik.values.scoCodigo} />

                                                    </span>

                                    
                                            </div>

                                            <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="scoNome">Descrição*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite o Nome" id="scoNome" name="scoNome" value={formik.values.scoNome}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.scoNome}
                                                    </small>
                                            </div>

                                            <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="scoStatus">Status*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite o Status" id="scoStatus" name="scoStatus" value={formik.values.scoStatus}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.scoStatus}
                                                    </small>
                                            </div>

                                           
                                    </div>

                                    <Button  type="submit" label="Salvar" icon="pi pi-check" />
                                

                                
                        <div>

                            <DataTable ref={dt} value={listaSubComponente} selection={selectedSubComponente} onSelectionChange={(e) => setSelectedSubComponente(e.value)}
                                dataKey="hcoCodigo" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Histórico Componentes"
                                globalFilter={globalFilter}  header={header} responsiveLayout="stack">
                                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                                <Column field="scoCodigo" header="Código" sortable style={{ minWidth: '12rem' }}></Column>
                                <Column field="scoNome" header="Nome" sortable style={{ minWidth: '16rem' }}></Column>         
                                <Column field="scoStatus" header="Status" sortable style={{ minWidth: '10rem' }}></Column>
                                <Column field="componentePeca" header="ComponentePeca" sortable style={{ minWidth: '10rem' }}></Column>
                                <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                                
                            </DataTable>

                        </div>

                


                </form>
                
            </div>
       
    );
}