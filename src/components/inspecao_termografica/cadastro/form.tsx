
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



interface InspecaoTermograficaFormFormProps {
    onSubmit: (inspecaoTermografica: InspecaoTermografica) => void;
   
}

const formScheme: InspecaoTermografica = {
    
    iteCodigo:'',
    itePosicao:'',
    iteFase:'',
    iteFalha:'',
    iteAcaoProposta:'',
    iteFotoCamera:'',
    iteFotoTermografica:'',
    itePosHaviaFalha:'',
    itePosHaviaFalhaObs:'',
    itePosDiagnosticoFalha:'',
    itePosDiagnosticoFalhaObs:'',
    itePosTrabalhoAlem:'',
    itePosTrabalhoAlemObs:'',
    itePosDataIntervencao:'',
    itePosTempoExecucao:'',
    itePosResponsavel:'',
    itePosNumeroOs:'',
    itePosAvaliacaoIt:'',
    iteDataAvaliacao:'',
    iteStatus:'',
    iteDataCriacao:'',
    iteTipo:'',
    iteFotoPainel:'',
    iteFotoPainelDesc:'',
    iteDataBaixa:'',
    itePrazoExecucao:'',
    iteEquipamentos:'',
    iteTecnicoResponsavel:'',
    iteNumeroOs:'',
    iteCustoPreditiva:'',
    iteCustoCorretiva:'',
    iteQuebraEquipamento:'',
    itePainelNumPortas:'',
    medicao: null

    
}

export const InspecaoTermograficaForm: React.FC<InspecaoTermograficaFormFormProps> = ({
    onSubmit,
   
}) => {

    
    const maquinaService = useMaquinaService();
    const empresaService = useEmpresaService();
    const maquinaEquipamentoService = useMaquinaEquipamentoService();
    const componenteService = useComponenteService();
    const medicaoService = useMedicaoService();
    


    
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

    const [ maquinaEquipamento, setMaquinaEquipamento ] = useState<MaquinaEquipamento>(null);
    const [ componente, setComponente ] = useState<Componente>(null);
    const [ setor, setSetor ] = useState<Setor>(null);
    const [ medicao, setMedicao ] = useState<Medicao>(null);



    const [globalFilter, setGlobalFilter] = useState<string>();
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable>(null);

    const [selectedInspecaoTermografica, setSelectedInspecaoTermografica] = useState<InspecaoTermografica[]>([]);
    const [ maquinas, setMaquinas ] = useState<Maquina[]>([]);

    const [deleteEmpresasDialog, setDeleteEmpresasDialog] = useState(false);

    const [ date1, setAlteraData1 ] = useState<Date | Date[] | undefined>(undefined);
    

    

    const formik = useFormik<InspecaoTermografica>({
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

    const { data: result, error } = useSWR<AxiosResponse<InspecaoTermografica[]>>
    ('/inspecaotermografica', url => httpClient.get(url) )

    useEffect( () => {
        setListaInspecaoTermografica(result?.data || [])
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
                <Button icon="pi pi-trash" className="p-button-danger mr-2 p-button-rounded" onClick={confirmDeleteSelected} disabled={!selectedInspecaoTermografica || !selectedInspecaoTermografica.length} tooltip="Delete" tooltipOptions={{position: 'bottom'}} />
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
                        <span className="text-900 text-2xl font-medium mb-4 block">Cadatro de Inspeção Termográfica:</span>
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
                                                        <label style={{ color: "white" }} htmlFor="iteCodigo">Codigo</label>
                                                        <InputText style={{ width: "100%" }}  disabled placeholder="Código InspecaoTermografica" id="iteCodigo" name="iteCodigo" value={formik.values.iteCodigo} />

                                                    </span>

                                    
                                            </div>

                                            <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="iteAcaoProposta">Acao Proposta*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a Acao Proposta" id="iteAcaoProposta" name="iteAcaoProposta" value={formik.values.iteAcaoProposta}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.iteAcaoProposta}
                                                    </small>
                                            </div>

                                            <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="iteCustoCorretiva">Custo Corretiva*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite o Custo Corretiva" id="iteCustoCorretiva" name="iteCustoCorretiva" value={formik.values.iteCustoCorretiva}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.iteCustoCorretiva}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="iteCustoPreditiva">Custo Preditiva*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite o Custo Preditiva" id="iteCustoPreditiva" name="iteCustoPreditiva" value={formik.values.iteCustoPreditiva}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.iteCustoPreditiva}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="iteDataAvaliacao">Data Avaliacao*</label><br></br>
                                                        <Calendar  id="iteDataAvaliacao" name="iteDataAvaliacao" value={date1} onChange={formik.handleChange} dateFormat="dd/mm/yy" mask="99/99/9999" showIcon onBlur={formik.handleBlur}/>
                                
                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.iteDataAvaliacao}
                                                    </small>
                                            </div>

                                            <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="iteDataBaixa">Data Baixa*</label><br></br>
                                                        <Calendar  id="iteDataBaixa" name="iteDataBaixa" value={date1} onChange={formik.handleChange} dateFormat="dd/mm/yy" mask="99/99/9999" showIcon onBlur={formik.handleBlur}/>
                                
                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.iteDataBaixa}
                                                    </small>
                                            </div>

                                            <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="iteDataCriacao">Data Criacao*</label><br></br>
                                                        <Calendar  id="iteDataCriacao" name="iteDataCriacao" value={date1} onChange={formik.handleChange} dateFormat="dd/mm/yy" mask="99/99/9999" showIcon onBlur={formik.handleBlur}/>
                                
                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.iteDataCriacao}
                                                    </small>
                                            </div>

                                            <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="iteEquipamentos">Equipamentos*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite os Equipamentos" id="iteEquipamentos" name="iteEquipamentos" value={formik.values.iteEquipamentos}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.iteEquipamentos}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="iteFalha">Falha*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a Falha" id="iteFalha" name="iteFalha" value={formik.values.iteFalha}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.iteFalha}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="iteFase">Fase*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a Fase" id="iteFase" name="iteFase" value={formik.values.iteFase}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.iteFase}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="iteFotoCamera">Foto Camera*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a Foto Camera" id="iteFotoCamera" name="iteFotoCamera" value={formik.values.iteFotoCamera}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.iteFotoCamera}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="iteFotoPainel">Foto Painel*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a Foto Painel" id="iteFotoPainel" name="iteFotoPainel" value={formik.values.iteFotoPainel}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.iteFotoPainel}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="iteFotoPainelDesc">Foto Painel Desc*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a Foto Painel Desc" id="iteFotoPainelDesc" name="iteFotoPainelDesc" value={formik.values.iteFotoPainelDesc}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.iteFotoPainelDesc}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="iteFotoTermografica">Foto Termografica*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a Foto Termografica" id="iteFotoTermografica" name="iteFotoTermografica" value={formik.values.iteFotoTermografica}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.iteFotoTermografica}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="iteNumeroOs">Numero OS*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite o Numero OS" id="iteNumeroOs" name="iteNumeroOs" value={formik.values.iteNumeroOs}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.iteNumeroOs}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="itePainelNumPortas">Painel NumPortas*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite Painel NumPortas" id="itePainelNumPortas" name="itePainelNumPortas" value={formik.values.itePainelNumPortas}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.itePainelNumPortas}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="itePosAvaliacaoIt">Pos AvaliacaoIt*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite Pos AvaliacaoIt" id="itePosAvaliacaoIt" name="itePosAvaliacaoIt" value={formik.values.itePosAvaliacaoIt}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.itePosAvaliacaoIt}
                                                    </small>

                                                    
                                           </div>

                                           
                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="itePosDiagnosticoFalha">Pos Diag. Falha*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite Pos Diag. Falha" id="itePosDiagnosticoFalha" name="itePosDiagnosticoFalha" value={formik.values.itePosDiagnosticoFalha}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.itePosDiagnosticoFalha}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="itePosDataIntervencao">Pos Data Interv.*</label><br></br>
                                                        <Calendar  id="itePosDataIntervencao" name="itePosDataIntervencao" value={date1} onChange={formik.handleChange} dateFormat="dd/mm/yy" mask="99/99/9999" showIcon onBlur={formik.handleBlur}/>
                                
                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.itePosDataIntervencao}
                                                    </small>
                                            </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="itePosDiagnosticoFalhaObs">Pos Diag. Falha OBS*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite Pos Diag. Falha OBS" id="itePosDiagnosticoFalhaObs" name="itePosDiagnosticoFalhaObs" value={formik.values.itePosDiagnosticoFalhaObs}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.itePosDiagnosticoFalhaObs}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="itePosHaviaFalha">Pos Havia Falha*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite Pos Diag. Falha OBS" id="itePosHaviaFalha" name="itePosHaviaFalha" value={formik.values.itePosHaviaFalha}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.itePosHaviaFalha}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="itePosHaviaFalhaObs">Pos Havia Falha OBS*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite Pos Diag. Falha OBS" id="itePosHaviaFalhaObs" name="itePosHaviaFalhaObs" value={formik.values.itePosHaviaFalhaObs}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.itePosHaviaFalhaObs}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="itePosNumeroOs">Pos Num. OS*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite Pos Num. OS" id="itePosNumeroOs" name="itePosNumeroOs" value={formik.values.itePosNumeroOs}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.itePosNumeroOs}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="itePosResponsavel">Pos Responsável*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite Pos Responsável" id="itePosResponsavel" name="itePosResponsavel" value={formik.values.itePosResponsavel}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.itePosResponsavel}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="itePosTempoExecucao">Pos Tempo Exec.*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite Pos Tempo Exec." id="itePosTempoExecucao" name="itePosTempoExecucao" value={formik.values.itePosTempoExecucao}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.itePosTempoExecucao}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="itePosTrabalhoAlem">Pos Trab. Além.*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite Pos Trab. Além." id="itePosTrabalhoAlem" name="itePosTrabalhoAlem" value={formik.values.itePosTrabalhoAlem}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.itePosTrabalhoAlem}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="itePosTrabalhoAlemObs">Pos Trab. Além OBS*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite Pos Trab. Além OBS" id="itePosTrabalhoAlemObs" name="itePosTrabalhoAlemObs" value={formik.values.itePosTrabalhoAlemObs}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.itePosTrabalhoAlemObs}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="itePosicao">Posicao*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite Posicao" id="itePosicao" name="itePosicao" value={formik.values.itePosicao}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.itePosicao}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="itePrazoExecucao">Prazo Execução*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite Prazo Execução" id="itePrazoExecucao" name="itePrazoExecucao" value={formik.values.itePrazoExecucao}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.itePrazoExecucao}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="iteQuebraEquipamento">Quebra Equipamento*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite Prazo Execução" id="iteQuebraEquipamento" name="iteQuebraEquipamento" value={formik.values.iteQuebraEquipamento}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.iteQuebraEquipamento}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="iteStatus">Status*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite Status" id="iteStatus" name="iteStatus" value={formik.values.iteStatus}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.iteStatus}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="iteTecnicoResponsavel">Téc. Responsável*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite Tec. Responsável" id="iteTecnicoResponsavel" name="iteTecnicoResponsavel" value={formik.values.iteTecnicoResponsavel}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.iteTecnicoResponsavel}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="iteTipo">Tipo*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite Tipo" id="iteTipo" name="iteTipo" value={formik.values.iteTipo}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.iteTipo}
                                                    </small>

                                                    
                                           </div>

                                            
                                    </div>

                                    <Button  type="submit" label="Salvar" icon="pi pi-check" />
                                

                                
                        <div>

                            <DataTable ref={dt} value={listaInspecaoTermografica} selection={selectedInspecaoTermografica} onSelectionChange={(e) => setSelectedInspecaoTermografica(e.value)}
                                dataKey="iteCodigo" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Histórico Componentes"
                                globalFilter={globalFilter}  header={header} responsiveLayout="stack">
                                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                                <Column field="iteCodigo" header="Código" sortable style={{ minWidth: '12rem' }}></Column>
                                <Column field="iteAcaoProposta" header="Ação Proposta" sortable style={{ minWidth: '12rem' }}></Column>
                                <Column field="iteStatus" header="Status" sortable style={{ minWidth: '12rem' }}></Column>
                                <Column field="medicao.medCodigo" header="Medicao" sortable style={{ minWidth: '10rem' }}></Column>
                                <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                                
                            </DataTable>

                        </div>

                


                </form>
                
            </div>
       
    );
}