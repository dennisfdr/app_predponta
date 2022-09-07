
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
import { AnaliseOleo } from 'app/model/analise_oleo'



interface AnaliseOleoFormFormProps {
    onSubmit: (analiseOleo: AnaliseOleo) => void;
   
}

const formScheme: AnaliseOleo = {
    
    anoCodigo:'',
    anoNumero:'',
    anoTecnico:'',
    anoContaminacao:'',
    anoDesgaste:'',
    anoViscosidade:'',
    anoObservacao:'',
    anoNumeroDocumentoAnalise:'',
    anoNumeroOs:'',
    anoPosHaviaFalha:'',
    anoPosHaviaFalhaObs:'',
    anoPosDiagnosticoFalha:'',
    anoPosDiagnosticoFalhaObs:'',
    anoPosTrabalhoAlem:'',
    anoPosTrabalhoAlemObs:'',
    anoPosDataIntervencao:'',
    anoPosTempoExecucao:'',
    anoPosResponsavel:'',
    anoPosAvaliado:'',
    anoPosStatusAvaliacao:'',
    anoPosBaixada:'',
    anoPosBaixadaObservacao:'',
    anoDateInsert:'',
    anoUserInsert:'',
    anoPosNumeroOs:'',
    anoNomeArquivo:'',
    anoArquivo:'',
    medicao: null

    
}

export const AnaliseOleoForm: React.FC<AnaliseOleoFormFormProps> = ({
    onSubmit,
   
}) => {

    
    const maquinaService = useMaquinaService();
    const empresaService = useEmpresaService();
    const maquinaEquipamentoService = useMaquinaEquipamentoService();
    const componenteService = useComponenteService();
    const medicaoService = useMedicaoService();
    const analiseOleoService = useAnaliseOleoService();
    


    
    const [ listaEmpresas, setListaEmpresas ] = useState<Empresa[]>([])
    const [ mensagem, setMensagem] = useState<string>('')
    const [ maquina, setMaquina ] = useState<Maquina>(null);
    const [ empresa, setEmpresa] = useState<Empresa>(null);
    const [ listaSetor, setListaSetor] = useState<Setor[]>([])
    const [ listaMaquina, setListaMaquina ] = useState<Maquina[]>([]);
    const [ listaMaquinaEquipamento, setListaMaquinaEquipamento ] = useState<MaquinaEquipamento[]>([]);
    const [ listaComponente, setListaComponente ] = useState<Componente[]>([]);
    const [ listaMedicao, setListaMedicao ] = useState<Medicao[]>([]);
    const [ listaAnaliseOleo, setListaAnaliseOleo ] = useState<AnaliseOleo[]>([]);

    const [ maquinaEquipamento, setMaquinaEquipamento ] = useState<MaquinaEquipamento>(null);
    const [ componente, setComponente ] = useState<Componente>(null);
    const [ setor, setSetor ] = useState<Setor>(null);
    const [ medicao, setMedicao ] = useState<Medicao>(null);



    const [globalFilter, setGlobalFilter] = useState<string>();
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable>(null);

    const [selectedAnaliseOleo, setSelectedAnaliseOleo] = useState<AnaliseOleo[]>([]);
    const [ maquinas, setMaquinas ] = useState<Maquina[]>([]);

    const [deleteEmpresasDialog, setDeleteEmpresasDialog] = useState(false);

    const [ date1, setAlteraData1 ] = useState<Date | Date[] | undefined>(undefined);
    

    

    const formik = useFormik<AnaliseOleo>({
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

      

    /*Carregando Analise de Oleo*/  

    const { data: result, error } = useSWR<AxiosResponse<AnaliseOleo[]>>
    ('/analiseoleo', url => httpClient.get(url) )

    useEffect( () => {
        setListaAnaliseOleo(result?.data || [])
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
                <Button icon="pi pi-trash" className="p-button-danger mr-2 p-button-rounded" onClick={confirmDeleteSelected} disabled={!selectedAnaliseOleo || !selectedAnaliseOleo.length} tooltip="Delete" tooltipOptions={{position: 'bottom'}} />
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
        formik.setFieldValue("medicao", e.value)
    }


   


    

    return (

        

                <div className="surface-card border-round shadow-2 p-4">
                        <span className="text-900 text-2xl font-medium mb-4 block">Cadatro de Análise de Óleo:</span>
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
                                            
                                            
                                            
                                            
                                            
                                            
                                            <div className="col-2">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="anoCodigo">Codigo</label>
                                                        <InputText style={{ width: "100%" }}  disabled placeholder="Código AnaliseOleo" id="anoCodigo" name="anoCodigo" value={formik.values.anoCodigo} />

                                                    </span>

                                    
                                            </div>

                                            <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="anoArquivo">Arquivo*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite o Arquivo" id="anoArquivo" name="anoArquivo" value={formik.values.anoArquivo}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.anoArquivo}
                                                    </small>
                                            </div>

                                            <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="anoContaminacao">Contaminação*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a Contaminação" id="anoContaminacao" name="anoContaminacao" value={formik.values.anoContaminacao}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.anoContaminacao}
                                                    </small>

                                                    
                                           </div>

                                           

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="anoDateInsert">Data Insert*</label><br></br>
                                                        <Calendar  id="anoDateInsert" name="anoDateInsert" value={date1} onChange={formik.handleChange} dateFormat="dd/mm/yy" mask="99/99/9999" showIcon onBlur={formik.handleBlur}/>
                                
                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.anoDateInsert}
                                                    </small>
                                            </div>

                                            

                                            <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="anoDesgaste">Desgaste*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite o Desgaste" id="anoDesgaste" name="anoDesgaste" value={formik.values.anoDesgaste}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.anoDesgaste}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="anoNomeArquivo">Nome Arquivo*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite o Nome Arquivo" id="anoNomeArquivo" name="anoNomeArquivo" value={formik.values.anoNomeArquivo}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.anoNomeArquivo}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="anoNumero">Número*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite o Número" id="anoNumero" name="anoNumero" value={formik.values.anoNumero}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.anoNumero}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="anoNumeroDocumentoAnalise">Num. Doc. Análise*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite o Num. Doc. Análise" id="anoNumeroDocumentoAnalise" name="anoNumeroDocumentoAnalise" value={formik.values.anoNumeroDocumentoAnalise}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.anoNumeroDocumentoAnalise}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="anoNumeroOs">Num. OS*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite o Num. OS" id="anoNumeroOs" name="anoNumeroOs" value={formik.values.anoNumeroOs}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.anoNumeroOs}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="anoObservacao">Observação*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a Observação" id="anoObservacao" name="anoObservacao" value={formik.values.anoObservacao}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.anoObservacao}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="anoPosAvaliado">Pos Avaliado*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite o Pos Avaliado" id="anoPosAvaliado" name="anoPosAvaliado" value={formik.values.anoPosAvaliado}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.anoPosAvaliado}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="anoPosBaixada">Pos Baixada*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite o Pos Baixada" id="anoPosBaixada" name="anoPosBaixada" value={formik.values.anoPosBaixada}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.anoPosBaixada}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="anoPosBaixadaObservacao">Pos Baixada OBS*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite Pos Baixada OBS" id="anoPosBaixadaObservacao" name="anoPosBaixadaObservacao" value={formik.values.anoPosBaixadaObservacao}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.anoPosBaixadaObservacao}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="anoPosDataIntervencao">Data Intervenção*</label><br></br>
                                                        <Calendar  id="anoPosDataIntervencao" name="anoPosDataIntervencao" value={date1} onChange={formik.handleChange} dateFormat="dd/mm/yy" mask="99/99/9999" showIcon onBlur={formik.handleBlur}/>
                                
                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.anoPosDataIntervencao}
                                                    </small>
                                            </div>

                                           

                                           
                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="anoPosDiagnosticoFalha">Pos Diag. Falha*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite Pos Diag. Falha" id="anoPosDiagnosticoFalha" name="anoPosDiagnosticoFalha" value={formik.values.anoPosDiagnosticoFalha}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.anoPosDiagnosticoFalha}
                                                    </small>

                                                    
                                           </div>

                                          
                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="anoPosDiagnosticoFalhaObs">Pos Diag. Falha OBS*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite Pos Diag. Falha OBS" id="anoPosDiagnosticoFalhaObs" name="anoPosDiagnosticoFalhaObs" value={formik.values.anoPosDiagnosticoFalhaObs}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.anoPosDiagnosticoFalhaObs}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="anoPosHaviaFalha">Pos Havia Falha*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite Pos Diag. Falha OBS" id="anoPosHaviaFalha" name="anoPosHaviaFalha" value={formik.values.anoPosHaviaFalha}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.anoPosHaviaFalha}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="anoPosHaviaFalhaObs">Pos Havia Falha OBS*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite Pos Havia Falha OBS" id="anoPosHaviaFalhaObs" name="anoPosHaviaFalhaObs" value={formik.values.anoPosHaviaFalhaObs}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.anoPosHaviaFalhaObs}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="anoPosNumeroOs">Pos Num. OS*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite Pos Num. OS" id="anoPosNumeroOs" name="anoPosNumeroOs" value={formik.values.anoPosNumeroOs}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.anoPosNumeroOs}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="anoPosResponsavel">Pos Responsável*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite Pos Responsável" id="anoPosResponsavel" name="anoPosResponsavel" value={formik.values.anoPosResponsavel}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.anoPosResponsavel}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="anoPosStatusAvaliacao">Pos Status Avaliação*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite Pos Status Avaliação" id="anoPosStatusAvaliacao" name="anoPosStatusAvaliacao" value={formik.values.anoPosStatusAvaliacao}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.anoPosStatusAvaliacao}
                                                    </small>

                                                    
                                           </div>


                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="anoPosTempoExecucao">Pos Tempo Exec.*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite Pos Tempo Exec." id="anoPosTempoExecucao" name="anoPosTempoExecucao" value={formik.values.anoPosTempoExecucao}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.anoPosTempoExecucao}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="anoPosTrabalhoAlem">Pos Trab. Além.*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite Pos Trab. Além." id="anoPosTrabalhoAlem" name="anoPosTrabalhoAlem" value={formik.values.anoPosTrabalhoAlem}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.anoPosTrabalhoAlem}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="anoPosTrabalhoAlemObs">Pos Trab. Além OBS*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite Pos Trab. Além OBS" id="anoPosTrabalhoAlemObs" name="anoPosTrabalhoAlemObs" value={formik.values.anoPosTrabalhoAlemObs}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.anoPosTrabalhoAlemObs}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="anoTecnico">Técnico*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite o Técnico" id="anoTecnico" name="anoTecnico" value={formik.values.anoTecnico}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.anoTecnico}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="anoUserInsert">User Insert*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite User Insert" id="anoUserInsert" name="anoUserInsert" value={formik.values.anoUserInsert}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.anoUserInsert}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="anoViscosidade">Viscosidade*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a Viscosidade" id="anoViscosidade" name="anoViscosidade" value={formik.values.anoViscosidade}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.anoViscosidade}
                                                    </small>

                                                    
                                           </div>


                                            

                                           

                                            
                                    </div>

                                    <Button  type="submit" label="Salvar" icon="pi pi-check" />
                                

                                
                        <div>

                            <DataTable ref={dt} value={listaAnaliseOleo} selection={selectedAnaliseOleo} onSelectionChange={(e) => setSelectedAnaliseOleo(e.value)}
                                dataKey="anoCodigo" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Histórico Componentes"
                                globalFilter={globalFilter}  header={header} responsiveLayout="stack">
                                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                                <Column field="anoCodigo" header="Código" sortable style={{ minWidth: '12rem' }}></Column>
                                <Column field="anoContaminacao" header="Contaminação" sortable style={{ minWidth: '12rem' }}></Column>
                                <Column field="anoStatus" header="Status" sortable style={{ minWidth: '12rem' }}></Column>
                                <Column field="medicao.medCodigo" header="Medicao" sortable style={{ minWidth: '10rem' }}></Column>
                                <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                                
                            </DataTable>

                        </div>

                


                </form>
                
            </div>
       
    );
}