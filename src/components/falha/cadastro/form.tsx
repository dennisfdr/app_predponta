
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
    useRelatorioIntervencaoService,
    useMedicaoService,
    useInspecaoAcusticaLocalService,
    useFalhaService } from 'app/services'

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
import { Medicao } from 'app/model/medicao'
import { RelatorioIntervencao } from 'app/model/relatorio_intervencao'
import { Falha } from 'app/model/falha'
import React from 'react'
import useSWR from 'swr'
import { AxiosResponse } from 'axios'
import { httpClient } from 'app/http'
import { getEnvironmentData } from 'worker_threads'
import { Checkbox } from 'primereact/checkbox'
import { Toast } from 'primereact/toast'
import { TabPanel, TabView } from 'primereact/tabview'
import { Calendar } from 'primereact/calendar'
import { InspecaoAcusticaLocal } from 'app/model/inspecao_acustica_local'



interface FalhaFormProps {
    onSubmit: (falha: Falha) => void;
   
}

const formScheme: Falha = {
    
    falCodigo:'',
    falDescricao:'',
    relatorioIntervencao: null
    
}

export const FalhaForm: React.FC<FalhaFormProps> = ({
    onSubmit,
   
}) => {

    
    const maquinaService = useMaquinaService();
    const empresaService = useEmpresaService();
    const maquinaEquipamentoService = useMaquinaEquipamentoService();
    const componenteService = useComponenteService();
    const medicaoService = useMedicaoService();
    const inspecaoAcusticaLocalService = useInspecaoAcusticaLocalService();
    const relatorioIntervencaoService = useRelatorioIntervencaoService();
    
    const [ listaEmpresas, setListaEmpresas ] = useState<Empresa[]>([])
    const [ mensagem, setMensagem] = useState<string>('')
    const [ maquina, setMaquina ] = useState<Maquina>(null);
    const [ empresa, setEmpresa] = useState<Empresa>(null);
    const [ listaSetor, setListaSetor] = useState<Setor[]>([])
    const [ listaMaquina, setListaMaquina ] = useState<Maquina[]>([]);
    const [ listaMaquinaEquipamento, setListaMaquinaEquipamento ] = useState<MaquinaEquipamento[]>([]);
    const [ listaComponente, setListaComponente ] = useState<Componente[]>([]);
    const [ listaMedicao, setListaMedicao ] = useState<Medicao[]>([]);
    const [ listaRelatorioIntervencao, setListaRelatorioIntervencao ] = useState<RelatorioIntervencao[]>([]);
    const [ listaFalha, setListaFalha ] = useState<Falha[]>([]);
    const [ listaInspecaoAcusticaLocal, setListaInpecaoAcusticaLocal ] = useState<InspecaoAcusticaLocal[]>([]);
    const [ maquinaEquipamento, setMaquinaEquipamento ] = useState<MaquinaEquipamento>(null);
    const [ componente, setComponente ] = useState<Componente>(null);
    const [ setor, setSetor ] = useState<Setor>(null);
    const [ medicao, setMedicao ] = useState<Medicao>(null);
    const [ inspecaoAcusticaLocal, setInspecaoAcusticaLocal ] = useState<InspecaoAcusticaLocal>(null);
    const [ relatorioIntervencao, setRelatorioIntervencao ] = useState<RelatorioIntervencao>(null);
    const [ falha, setFalha ] = useState<Falha>(null);



    const [globalFilter, setGlobalFilter] = useState<string>();
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable>(null);

    const [selectedFalha, setSelectedFalha] = useState<Falha[]>([]);
    const [ maquinas, setMaquinas ] = useState<Maquina[]>([]);

    const [deleteEmpresasDialog, setDeleteEmpresasDialog] = useState(false);

    const [ date1, setAlteraData1 ] = useState<Date | Date[] | undefined>(undefined);
    

    

    const formik = useFormik<Falha>({
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

      

    /*Carregando Falhas*/  

    const { data: result, error } = useSWR<AxiosResponse<Falha[]>>
    ('/falhas', url => httpClient.get(url) )

    useEffect( () => {
        setListaFalha(result?.data || [])
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
                <Button icon="pi pi-trash" className="p-button-danger mr-2 p-button-rounded" onClick={confirmDeleteSelected} disabled={!selectedFalha || !selectedFalha.length} tooltip="Delete" tooltipOptions={{position: 'bottom'}} />
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
        medicaoService.carregarByComponente(e.value).then(medicao => setListaMedicao(medicao))
        
   }

   const handleMedicaoChange = (e: { value: any}) => {
       setMedicao(e.value)
       inspecaoAcusticaLocalService.carregarByMedicao(e.value).then(inspecaoAcusticaLocal => setListaInpecaoAcusticaLocal(inspecaoAcusticaLocal))
    }

    const handleInspecaoAcusticaLocalChange = (e: { value: any}) => {
        setInspecaoAcusticaLocal(e.value)
        relatorioIntervencaoService.carregarByInspecaoAcusticaLocal(e.value).then(relatorioIntervencao => setListaRelatorioIntervencao(relatorioIntervencao))
    }
             

    const handleRelatorioIntervencaoChange = (e: { value: any}) => {
        setRelatorioIntervencao(e.value)
        formik.setFieldValue("relatorioIntervencao", e.value)
    }
 

   


    

    return (

        

                <div className="surface-card border-round shadow-2 p-4">
                        <span className="text-900 text-2xl font-medium mb-4 block">Relatório de Falhas:</span>
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
                                                <label style={{ color: "white" }} htmlFor="inspecaoAcusticaLocal">InspecaoAcusticaLocal: *</label>
                                                <Dropdown 
                                                    style={{ width: "100%" }}
                                                    value={inspecaoAcusticaLocal} 
                                                    options={listaInspecaoAcusticaLocal} 
                                                    onChange={handleInspecaoAcusticaLocalChange} 
                                                    optionLabel="ialCodigo" 
                                                    placeholder="Selecione a Inspecao Acustica Local" />

                                            </div> 

                                            <div className="col-6">
                                                <label style={{ color: "white" }} htmlFor="relatorioIntervencao">Relatorio Intervencao: *</label>
                                                <Dropdown 
                                                    style={{ width: "100%" }}
                                                    value={relatorioIntervencao} 
                                                    options={listaRelatorioIntervencao} 
                                                    onChange={handleRelatorioIntervencaoChange} 
                                                    optionLabel="riCodigo" 
                                                    placeholder="Selecione Relatorio de Intervencao" />

                                            </div> 
                                            
                                                                  
                                            <div className="col-2">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="falCodigo">Codigo</label>
                                                        <InputText style={{ width: "100%" }}  disabled placeholder="Código Falha" id="falCodigo" name="falCodigo" value={formik.values.falCodigo} />

                                                    </span>

                                    
                                            </div>

                                            <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="falDescricao">Descricao*</label>
                                                        <InputText  id="falDescricao" name="falDescricao" placeholder="Digite a Descricao "  value={formik.values.falDescricao}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.falDescricao}
                                                    </small>
                                            </div>

                                        </div>


                                            

                                    <Button  type="submit" label="Salvar" icon="pi pi-check" />
                                

                                
                        <div>

                            <DataTable ref={dt} value={listaFalha} selection={selectedFalha} onSelectionChange={(e) => setSelectedFalha(e.value)}
                                dataKey="falCodigo" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Histórico Componentes"
                                globalFilter={globalFilter}  header={header} responsiveLayout="stack">
                                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                                <Column field="falCodigo" header="Código" sortable style={{ minWidth: '12rem' }}></Column>
                                <Column field="falDescricao" header="Descricao" sortable style={{ minWidth: '16rem' }}></Column>         
                                <Column field="relatorioIntervencao" header="Relatorio Intervencao" sortable style={{ minWidth: '10rem' }}></Column>
                                <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                                
                            </DataTable>

                        </div>

                


                </form>
                
            </div>
       
    );
}