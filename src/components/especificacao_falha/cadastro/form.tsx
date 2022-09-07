
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
    useEspecificacaoFalhaService, 
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
import { InspecaoTermograficaPeca } from 'app/model/inspecao_termografica_peca'
import { CondicoesAmbiente } from 'app/model/condicoes_ambiente'
import { EspecificacaoFalha } from 'app/model/especificacao_falha'

interface EspecificacaoFalhaFormProps {
    onSubmit: (especificacaoFalha: EspecificacaoFalha) => void;
   
}

const formScheme: EspecificacaoFalha = {
    
    efaCodigo:'',
    efaTemperaturaFalha:'',
    efaTemperaturaAceitavel:'',
    efaExcessoTemperatura:'',
    efaPrazoLimite:'',
    efaPontoTermograma:'',
    condicoesAmbiente: null
    
}

export const EspecificacaoFalhaForm: React.FC<EspecificacaoFalhaFormProps> = ({
    onSubmit,
   
}) => {

    
    const maquinaService = useMaquinaService();
    const empresaService = useEmpresaService();
    const maquinaEquipamentoService = useMaquinaEquipamentoService();
    const componenteService = useComponenteService();
    const medicaoService = useMedicaoService();
    const inspecaoTermograficaService = useInspecaoTermograficaService();
    const inspecaoTermograficaPecaService = useInspecaoTermograficaPecaService();
    const condicoesAmbienteService = useCondicoesAmbienteService();
    const epecificacaoFalhaService = useEspecificacaoFalhaService();
    


    
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
    const [ listaEspecificacaoFalha, setListaEspecificacaoFalha ] = useState<EspecificacaoFalha[]>([]);

    
    
    const [ maquinaEquipamento, setMaquinaEquipamento ] = useState<MaquinaEquipamento>(null);
    const [ componente, setComponente ] = useState<Componente>(null);
    const [ setor, setSetor ] = useState<Setor>(null);
    const [ medicao, setMedicao ] = useState<Medicao>(null);
    const [ inspecaoTermografica, setInspecaoTermografica ] = useState<InspecaoTermografica>(null);
    const [ inspecaoTermograficaPeca, setInspecaoTermograficaPeca ] = useState<InspecaoTermograficaPeca>(null);
    const [ condicoesAmbiente, setCondicoesAmbiente ] = useState<CondicoesAmbiente>(null);
    const [ especificacaoFalha, setEspecificacaoFalha ] = useState<EspecificacaoFalha>(null);
    const [ camCodigo, setCamCodigo ] = useState('');
    



    const [globalFilter, setGlobalFilter] = useState<string>();
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable>(null);
    const [entityDialog, setEntityDialog] = useState(false);
    const [mostraBotao, setMostraBotao] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const [selectedEspecificacaoFalha, setSelectedEspecificacaoFalha] = useState<EspecificacaoFalha[]>([]);
    const [ maquinas, setMaquinas ] = useState<Maquina[]>([]);

    const [deleteEmpresasDialog, setDeleteEmpresasDialog] = useState(false);

    const [ date1, setAlteraData1 ] = useState<Date | Date[] | undefined>(undefined);
    

    

    const formik = useFormik<EspecificacaoFalha>({
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

      

    /*Carregando InspecaoAcusticaLocal*/  

    const { data: result, error } = useSWR<AxiosResponse<EspecificacaoFalha[]>>
    ('/especificacaofalha', url => httpClient.get(url) )

    useEffect( () => {
        setListaEspecificacaoFalha(result?.data || [])
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
                <Button icon="pi pi-trash" className="p-button-danger mr-2 p-button-rounded" onClick={confirmDeleteSelected} disabled={!selectedEspecificacaoFalha || !selectedEspecificacaoFalha.length} tooltip="Delete" tooltipOptions={{position: 'bottom'}} />
                <Button icon="pi pi-upload" className="p-button-help p-button-rounded" onClick={exportCSV} tooltip="Export" tooltipOptions={{position: 'bottom'}} />
                <span className="p-input-icon-left w-full md:w-auto">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e: FormEvent<HTMLInputElement>) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." className="w-full lg:w-auto" />
                </span>
            </div>
        </div>
    );

    const actionBodyTemplate = (rowData: EspecificacaoFalha) => {
        return (
            <React.Fragment> 
                    <Button icon="pi pi-search" tooltip='Consultar' tooltipOptions={{position: 'bottom'}} className="p-button-rounded p-button-info" type="button"  onClick={() => consultaEntity(rowData)}/>      
                    <Button icon="pi pi-pencil" tooltip='Editar' tooltipOptions={{position: 'bottom'}} className="p-button-rounded p-button-success mr-2" type="button" onClick={() => editEntity(rowData)}  />
                    <Button icon="pi pi-trash" tooltip='Deletar' tooltipOptions={{position: 'bottom'}} className="p-button-rounded p-button-danger"  type="button" onClick={() => deleteEntity(rowData)} />
            </React.Fragment>
        );
    }

    const hideDialog = () => {
        setSubmitted(false);
        setEntityDialog(false);
    }


    const editEntity = (especificacaoFalha: EspecificacaoFalha) => {

        /*Altera caption do botão para ALTERAR*/
        setMostraBotao(true);

        /* Campos do formulário*/
        
        formik.setFieldValue("efaCodigo", especificacaoFalha.efaCodigo)
        formik.setFieldValue("efaTemperaturaFalha", especificacaoFalha.efaTemperaturaFalha)
        formik.setFieldValue("efaTemperaturaAceitavel", especificacaoFalha.efaTemperaturaAceitavel)
        formik.setFieldValue("efaExcessoTemperatura", especificacaoFalha.efaExcessoTemperatura)
        formik.setFieldValue("efaPrazoLimite", especificacaoFalha.efaPrazoLimite)
        formik.setFieldValue("efaPontoTermograma", especificacaoFalha.efaPontoTermograma)
        setCondicoesAmbiente(especificacaoFalha.condicoesAmbiente)
        setCamCodigo(condicoesAmbiente?.camCodigo)
        console.log("Log1....", camCodigo)

        console.log("Log2....", especificacaoFalha.condicoesAmbiente)

        
            condicoesAmbienteService.carregar(camCodigo).then(condicoesAmbiente => setCondicoesAmbiente(condicoesAmbiente))
            setInspecaoTermograficaPeca(condicoesAmbiente?.inspecaoTermograficaPeca)
            inspecaoTermograficaPecaService.carregar(inspecaoTermograficaPeca?.itpCodigo).then(inspecaoTermograficaPeca => setInspecaoTermograficaPeca(inspecaoTermograficaPeca))
            setInspecaoTermografica(inspecaoTermograficaPeca?.inspecaoTermografica)

        

        
    }
    
    const consultaEntity = (especificacaoFalha: EspecificacaoFalha) => {
        
        setEspecificacaoFalha({...especificacaoFalha})
        setEntityDialog(true);
        setMostraBotao(false);  
      
    }

    const deleteEntity = (especificacaoFalha: EspecificacaoFalha) => {

        epecificacaoFalhaService.deletar(especificacaoFalha.efaCodigo)
    }

    const entityDialogFooter = (
        <React.Fragment>
                <Button label="Fechar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
        </React.Fragment>
    );

    

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
        inspecaoTermograficaService.carregarByMedicao(e.value).then(inspecaoTermografica => setListaInspecaoTermografica(inspecaoTermografica))
    }
        
    

    const handleInspecaoTermograficaChange = (e: { value: any}) => {
        setInspecaoTermografica(e.value)
        console.log(e.value)
        inspecaoTermograficaPecaService.carregarByInspecaoTermografica(e.value).then(inspecaoTermograficaPeca => setListaInspecaoTermograficaPeca(inspecaoTermograficaPeca))

    }
    

    const handleInspecaoTermograficaPecaChange = (e: { value: any}) => {
        setInspecaoTermograficaPeca(e.value)
        condicoesAmbienteService.carregarByInspecaoTermograficaPeca(e.value).then(condicoesAmbiente => setListaCondicoesAmbiente(condicoesAmbiente))
    }

    const handleCondicaoAmbienteChange = (e: { value: any}) => {
        setCondicoesAmbiente(e.value)
        formik.setFieldValue("condicoesAmbiente", e.value)
    }


   


    

    return (

        

                <div className="surface-card border-round shadow-2 p-4">
                        <span className="text-900 text-2xl font-medium mb-4 block">Cadatro de Especificação Falha:</span>
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
                                                    placeholder="Selecione a Empresa" 
                                                    />

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
                                                    value={inspecaoTermografica?.iteCodigo} 
                                                    options={listaInspecaoTermografica} 
                                                    onChange={handleInspecaoTermograficaChange} 
                                                    optionLabel="iteCodigo" 
                                                    placeholder="Selecione a Inspecao Termografica" 
                                                    editable={true}/>

                                            </div> 

                                            <div className="col-6">
                                                <label style={{ color: "white" }} htmlFor="inspecaoTermograficaPeca">Inspecao Termográfica Peca: *</label>
                                                <Dropdown 
                                                    style={{ width: "100%" }}
                                                    value={inspecaoTermograficaPeca?.itpCodigo} 
                                                    options={listaInspecaoTermograficaPeca} 
                                                    onChange={handleInspecaoTermograficaPecaChange} 
                                                    optionLabel="itpCodigo" 
                                                    placeholder="Selecione a Inspecao Termografica Peca" 
                                                    editable={true}/>

                                            </div> 

                                            <div className="col-6">
                                                <label style={{ color: "white" }} htmlFor="condicoesAmbiente">Condições Ambiente:*</label>
                                                <Dropdown 
                                                    style={{ width: "100%" }} 
                                                    value={condicoesAmbiente?.camCodigo} 
                                                    options={listaCondicoesAmbiente} 
                                                    onChange={handleCondicaoAmbienteChange} 
                                                    optionLabel="camCodigo" 
                                                    placeholder="Selecione as Condições de Ambiente"
                                                    editable={true}
                                                    
                                                    
                                                    />

                                            </div>



                                            
                                            
                                            
                                            
                                            
                                            
                                            
                                            <div className="col-2">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="efaCodigo">Codigo:</label>
                                                        <InputText style={{ width: "100%" }}  disabled placeholder="Código Especificação Falha" id="efaCodigo" name="efaCodigo" value={formik.values.efaCodigo} />

                                                    </span>

                                    
                                            </div>

                                            <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="efaExcessoTemperatura">Excesso Temperatura*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite o Excesso de Temperatura" id="efaExcessoTemperatura" name="efaExcessoTemperatura" value={formik.values.efaExcessoTemperatura}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.efaExcessoTemperatura}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="efaPontoTermograma">Ponto Termograma*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite o Ponto Termograma" id="efaPontoTermograma" name="efaPontoTermograma" value={formik.values.efaPontoTermograma}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.efaPontoTermograma}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="efaPrazoLimite">Prazo Limite*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite o Prazo Limite" id="efaPrazoLimite" name="efaPrazoLimite" value={formik.values.efaPrazoLimite}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.efaPrazoLimite}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="efaTemperaturaAceitavel">Temperatura Aceitável*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a Temperatura Aceitável" id="efaTemperaturaAceitavel" name="efaTemperaturaAceitavel" value={formik.values.efaTemperaturaAceitavel}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.efaTemperaturaAceitavel}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="efaTemperaturaFalha">Temperatura Falha*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a Temperatura Falha" id="efaTemperaturaFalha" name="efaTemperaturaFalha" value={formik.values.efaTemperaturaFalha}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.efaTemperaturaFalha}
                                                    </small>

                                                    
                                           </div>



                                            
                                            
                                    </div>

                                    {!mostraBotao &&
                                        <Button type="submit" label="Salvar" icon="pi pi-check"  />
                                    } {mostraBotao &&
                                        <Button  type="submit" label="Alterar" icon="pi pi-check" />
                                    } 

                                
                        <div>

                            <DataTable ref={dt} value={listaEspecificacaoFalha} selection={selectedEspecificacaoFalha} onSelectionChange={(e) => setSelectedEspecificacaoFalha(e.value)}
                                dataKey="efaCodigo" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Histórico Componentes"
                                globalFilter={globalFilter}  header={header} responsiveLayout="stack">
                                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                                <Column field="efaCodigo" header="Código" sortable style={{ minWidth: '10rem' }}></Column>
                                <Column field="efaTemperaturaFalha" header="Temperatura Falha" sortable style={{ minWidth: '10rem' }}></Column>
                                <Column field="efaTemperaturaAceitavel" header="Temperatura Aceitável" sortable style={{ minWidth: '10rem' }}></Column>
                                <Column field="efaExcessoTemperatura" header="Excesso Temperatura" sortable style={{ minWidth: '10rem' }}></Column>
                                <Column field="efaPrazoLimite" header="Prazo Limite" sortable style={{ minWidth: '10rem' }}></Column>
                                <Column field="efaPontoTermograma" header="Ponto Termograma" sortable style={{ minWidth: '10rem' }}></Column>
                                <Column field="condicoesAmbiente.camCodigo" header="Condições Ambiente" sortable style={{ minWidth: '10rem' }}></Column>
                                <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                                
                            </DataTable>

                        </div>

                


                </form>

                <Dialog visible={entityDialog} breakpoints={{'960px': '75vw', '640px': '100vw'}} style={{width: '40vw'}} header="Cadastro de Especificação de Falhas" modal className="p-fluid" footer={entityDialogFooter} onHide={hideDialog}>

                                        <div className="grid">
                                            
                                            <div className="col-2">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="efaCodigo">Codigo:</label>
                                                        <InputText style={{ width: "100%" }}  disabled placeholder="Código Especificação Falha" id="efaCodigo" name="efaCodigo" value={especificacaoFalha?.efaCodigo} />

                                                    </span>

                                    
                                            </div>

                                            <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="efaExcessoTemperatura">Excesso Temperatura*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite o Excesso de Temperatura" id="efaExcessoTemperatura" name="efaExcessoTemperatura" value={especificacaoFalha?.efaExcessoTemperatura} />

                                                    </span>

                                                   

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="efaPontoTermograma">Ponto Termograma*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite o Ponto Termograma" id="efaPontoTermograma" name="efaPontoTermograma" value={especificacaoFalha?.efaPontoTermograma}  />

                                                    </span>

                                                   

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="efaPrazoLimite">Prazo Limite*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite o Prazo Limite" id="efaPrazoLimite" name="efaPrazoLimite" value={especificacaoFalha?.efaPrazoLimite}  />

                                                    </span>

                                                   

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="efaTemperaturaAceitavel">Temperatura Aceitável*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a Temperatura Aceitável" id="efaTemperaturaAceitavel" name="efaTemperaturaAceitavel" value={especificacaoFalha?.efaTemperaturaAceitavel}  />

                                                    </span>

                                                    

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="efaTemperaturaFalha">Temperatura Falha*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a Temperatura Falha" id="efaTemperaturaFalha" name="efaTemperaturaFalha" value={especificacaoFalha?.efaTemperaturaFalha}   />

                                                    </span>

                                                    
                                                    
                                           </div>

                                           
                                            
                                    </div>
            
                
                </Dialog>
                
            </div>
       
    );
}