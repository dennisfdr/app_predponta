
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
    useInspecaoAcusticaLocalService } from 'app/services'

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



interface RelatorioIntervencaoFormProps {
    onSubmit: (relatorioIntervencao: RelatorioIntervencao) => void;
   
}

const formScheme: RelatorioIntervencao = {
    
    riCodigo:'',
    riFalha:'',
    riEspecificacaoFalha:'',
    riPosicao:'',
    riAcaoProposta:'',
    riEspectro:'',
    riCurvaTendencia:'',
    riVideo:'',
    riStatus:'',  
    riDataAbertura:'',
    riDataColeta:'',
    riFotoComponente:'',
    riHaviaFalha:'',
    riHaviaFalhaObs:'',
    riDiagnosticoFalha:'',
    riDiagnosticoFalhaObs:'',
    riTrabalhoAlem:'',
    riTrabalhoAlemObs:'',
    riDataIntervencao:'',
    riTempoExecucao:'',
    riResponsavel:'',
    riNumOs:'',
    riStatusAvaliacao:'',
    riAvaliado:'',
    riBaixada:'',
    riBaixadaObs:'',
    riPrazoExecucao:'',
    riCriticidade:'',
    riEquipamentos:'',
    riCategoria:'',
    riNumeroOs:'',
    riCustoPreditiva:'',
    riCustoCorretiva:'',
    riQuebraEquipamento:'',
    inspecaoAcusticaLocal: null
    
}

export const RelatorioIntervencaoForm: React.FC<RelatorioIntervencaoFormProps> = ({
    onSubmit,
   
}) => {

    
    const maquinaService = useMaquinaService();
    const empresaService = useEmpresaService();
    const maquinaEquipamentoService = useMaquinaEquipamentoService();
    const componenteService = useComponenteService();
    const medicaoService = useMedicaoService();
    const inspecaoAcusticaLocalService = useInspecaoAcusticaLocalService();
    
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
    const [ listaInspecaoAcusticaLocal, setListaInpecaoAcusticaLocal ] = useState<InspecaoAcusticaLocal[]>([]);
    const [ maquinaEquipamento, setMaquinaEquipamento ] = useState<MaquinaEquipamento>(null);
    const [ componente, setComponente ] = useState<Componente>(null);
    const [ setor, setSetor ] = useState<Setor>(null);
    const [ medicao, setMedicao ] = useState<Medicao>(null);
    const [ inspecaoAcusticaLocal, setInspecaoAcusticaLocal ] = useState<InspecaoAcusticaLocal>(null);



    const [globalFilter, setGlobalFilter] = useState<string>();
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable>(null);

    const [selectedRelatorioIntervencao, setSelectedRelatorioIntervencao] = useState<RelatorioIntervencao[]>([]);
    const [ maquinas, setMaquinas ] = useState<Maquina[]>([]);

    const [deleteEmpresasDialog, setDeleteEmpresasDialog] = useState(false);

    const [ date1, setAlteraData1 ] = useState<Date | Date[] | undefined>(undefined);
    

    

    const formik = useFormik<RelatorioIntervencao>({
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

    const { data: result, error } = useSWR<AxiosResponse<RelatorioIntervencao[]>>
    ('/relatoriointervencaos', url => httpClient.get(url) )

    useEffect( () => {
        setListaRelatorioIntervencao(result?.data || [])
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
                <Button icon="pi pi-trash" className="p-button-danger mr-2 p-button-rounded" onClick={confirmDeleteSelected} disabled={!selectedRelatorioIntervencao || !selectedRelatorioIntervencao.length} tooltip="Delete" tooltipOptions={{position: 'bottom'}} />
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
        formik.setFieldValue("inspecaoAcusticaLocal", e.value)
    }
 

   


    

    return (

        

                <div className="surface-card border-round shadow-2 p-4">
                        <span className="text-900 text-2xl font-medium mb-4 block">Relatório de Intervenção:</span>
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
                                            
                                                                  
                                            <div className="col-2">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="riCodigo">Codigo</label>
                                                        <InputText style={{ width: "100%" }}  disabled placeholder="Código RelatorioIntervencao" id="riCodigo" name="riCodigo" value={formik.values.riCodigo} />

                                                    </span>

                                    
                                            </div>

                                            <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="riFalha">Falha*</label>
                                                        <InputText  id="riFalha" name="riFalha" placeholder="Digite a Falha "  value={formik.values.riFalha}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.riFalha}
                                                    </small>
                                            </div>


                                            <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="riEspecificacaoFalha">Espec. Falha*</label>
                                                        <InputText  id="riEspecificacaoFalha" name="riEspecificacaoFalha" placeholder="Digite a Espec. Falha "  value={formik.values.riEspecificacaoFalha}  onChange={formik.handleChange} onBlur={formik.handleBlur} />


                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.riEspecificacaoFalha}
                                                    </small>
                                            </div>

                                            <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="riPosicao">Posicao*</label>
                                                        <InputText  id="riPosicao" name="riPosicao" placeholder="Digite a Posicao Falha "  value={formik.values.riPosicao}  onChange={formik.handleChange} onBlur={formik.handleBlur} />


                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.riPosicao}
                                                    </small>
                                            </div>

                                            <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="riAcaoProposta">Acao Proposta*</label>
                                                        <InputText  id="riAcaoProposta" name="riAcaoProposta" placeholder="Digite a Acao Proposta "  value={formik.values.riAcaoProposta}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.riAcaoProposta}
                                                    </small>
                                            </div>

                                            <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="riEspectro">Espectro*</label>
                                                        <InputText  id="riEspectro" name="riEspectro" placeholder="Digite Espectro "  value={formik.values.riEspectro}  onChange={formik.handleChange} onBlur={formik.handleBlur} />


                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.riEspectro}
                                                    </small>
                                            </div>

                                            <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="riCurvaTendencia">Curva Tendencia*</label>
                                                        <InputText  id="riCurvaTendencia" name="riCurvaTendencia" placeholder="Digite Curva Tendencia "  value={formik.values.riCurvaTendencia}  onChange={formik.handleChange} onBlur={formik.handleBlur} />


                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.riCurvaTendencia}
                                                    </small>
                                            </div>

                                            <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="riVideo">Vídeo*</label>
                                                        <InputText  id="riVideo" name="riVideo" placeholder="Digite Vídeo"  value={formik.values.riVideo}  onChange={formik.handleChange} onBlur={formik.handleBlur} />


                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.riVideo}
                                                    </small>
                                            </div>

                                            <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="riStatus">Status*</label>
                                                        <InputText  id="riStatus" name="riStatus" placeholder="Digite o Status"  value={formik.values.riStatus}  onChange={formik.handleChange} onBlur={formik.handleBlur} />


                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.riStatus}
                                                    </small>
                                            </div>

                                            <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="riDataAbertura">Data Abertura*</label><br></br>
                                                        <Calendar  id="riDataAbertura" name="riDataAbertura" value={date1} onChange={formik.handleChange} dateFormat="dd/mm/yy" mask="99/99/9999" showIcon onBlur={formik.handleBlur}/>
                                

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.riDataAbertura}
                                                    </small>
                                            </div>

                                            <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="riDataColeta">Data Coleta*</label><br></br>
                                                        <Calendar  id="riDataColeta" name="riDataColeta" value={date1} onChange={formik.handleChange} dateFormat="dd/mm/yy" mask="99/99/9999" showIcon onBlur={formik.handleBlur}/>
                                

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.riDataColeta}
                                                    </small>
                                            </div>

                                            <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="riFotoComponente">Foto*</label>
                                                        <InputText  id="riFotoComponente" name="riFotoComponente" placeholder="Digite a Foto"  value={formik.values.riFotoComponente}  onChange={formik.handleChange} onBlur={formik.handleBlur} />


                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.riFotoComponente}
                                                    </small>
                                            </div>

                                            <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="riHaviaFalha">Havia Falha*</label>
                                                        <InputText  id="riHaviaFalha" name="riHaviaFalha" placeholder="Digite Havia Falha"  value={formik.values.riHaviaFalha}  onChange={formik.handleChange} onBlur={formik.handleBlur} />


                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.riHaviaFalha}
                                                    </small>
                                            </div>

                                            <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="riHaviaFalhaObs">Havia Falha OBS*</label>
                                                        <InputText  id="riHaviaFalhaObs" name="riHaviaFalhaObs" placeholder="Digite Havia Falha OBS"  value={formik.values.riHaviaFalhaObs}  onChange={formik.handleChange} onBlur={formik.handleBlur} />


                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.riHaviaFalhaObs}
                                                    </small>
                                            </div>

                                            <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="riDiagnosticoFalha">Diag. Falha*</label>
                                                        <InputText  id="riDiagnosticoFalha" name="riDiagnosticoFalha" placeholder="Digite Diagnóstico Falha"  value={formik.values.riDiagnosticoFalha}  onChange={formik.handleChange} onBlur={formik.handleBlur} />


                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.riDiagnosticoFalha}
                                                    </small>
                                            </div>

                                            <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="riDiagnosticoFalhaObs">Diag. Falha OBS*</label>
                                                        <InputText  id="riDiagnosticoFalhaObs" name="riDiagnosticoFalhaObs" placeholder="Digite Diagnóstico Falha OBS"  value={formik.values.riDiagnosticoFalhaObs}  onChange={formik.handleChange} onBlur={formik.handleBlur} />


                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.riDiagnosticoFalhaObs}
                                                    </small>
                                            </div>

                                            <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="riTrabalhoAlem">Trabalho Alem*</label>
                                                        <InputText  id="riTrabalhoAlem" name="riTrabalhoAlem" placeholder="Digite Trabalho Alem"  value={formik.values.riTrabalhoAlem}  onChange={formik.handleChange} onBlur={formik.handleBlur} />


                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.riTrabalhoAlem}
                                                    </small>
                                            </div>

                                            <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="riTrabalhoAlemObs">TrabalhoAlemObs*</label>
                                                        <InputText  id="riTrabalhoAlemObs" name="riTrabalhoAlemObs" placeholder="Digite Trabalho Alem OBS"  value={formik.values.riTrabalhoAlemObs}  onChange={formik.handleChange} onBlur={formik.handleBlur} />


                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.riTrabalhoAlemObs}
                                                    </small>
                                            </div>


                                            <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="riDataIntervencao">Data Intervencao*</label><br></br>
                                                        <Calendar  id="riDataIntervencao" name="riDataIntervencao" value={date1} onChange={formik.handleChange} dateFormat="dd/mm/yy" mask="99/99/9999" showIcon onBlur={formik.handleBlur}/>
                                

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.riDataIntervencao}
                                                    </small>
                                            </div>

                                            <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="riTempoExecucao">Tempo Execução*</label>
                                                        <InputText  id="riTempoExecucao" name="riTempoExecucao" placeholder="Digite Tempo Execução"  value={formik.values.riTempoExecucao}  onChange={formik.handleChange} onBlur={formik.handleBlur} />


                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.riTempoExecucao}
                                                    </small>
                                            </div>

                                            <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="riResponsavel">Responsável*</label>
                                                        <InputText  id="riResponsavel" name="riResponsavel" placeholder="Digite Responsável"  value={formik.values.riResponsavel}  onChange={formik.handleChange} onBlur={formik.handleBlur} />


                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.riResponsavel}
                                                    </small>
                                            </div>

                                            <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="riNumOs">NumOS</label>
                                                        <InputText  id="riNumOs" name="riNumOs" placeholder="Digite NumOS"  value={formik.values.riNumOs}  onChange={formik.handleChange} onBlur={formik.handleBlur} />


                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.riNumOs}
                                                    </small>
                                            </div>

                                            <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="riStatusAvaliacao">Status Avaliação*</label>
                                                        <InputText  id="riStatusAvaliacao" name="riStatusAvaliacao" placeholder="Digite Status Avaliação"  value={formik.values.riStatusAvaliacao}  onChange={formik.handleChange} onBlur={formik.handleBlur} />


                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.riStatusAvaliacao}
                                                    </small>
                                            </div>

                                            <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="riAvaliado">Avaliado*</label>
                                                        <InputText  id="riAvaliado" name="riAvaliado" placeholder="Digite Avaliado"  value={formik.values.riAvaliado}  onChange={formik.handleChange} onBlur={formik.handleBlur} />


                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.riAvaliado}
                                                    </small>
                                            </div>

                                            <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="riBaixada">Baixada*</label>
                                                        <InputText  id="riBaixada" name="riBaixada" placeholder="Digite Baixada"  value={formik.values.riBaixada}  onChange={formik.handleChange} onBlur={formik.handleBlur} />


                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.riBaixada}
                                                    </small>
                                            </div>

                                            <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="riBaixadaObs">BaixadaOBS*</label>
                                                        <InputText  id="riBaixadaObs" name="riBaixadaObs" placeholder="Digite BaixadaOBS"  value={formik.values.riBaixadaObs}  onChange={formik.handleChange} onBlur={formik.handleBlur} />


                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.riBaixadaObs}
                                                    </small>
                                            </div>

                                            <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="riPrazoExecucao">Prazo Execução*</label>
                                                        <InputText  id="riPrazoExecucao" name="riPrazoExecucao" placeholder="Digite Prazo Execução"  value={formik.values.riPrazoExecucao}  onChange={formik.handleChange} onBlur={formik.handleBlur} />


                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.riPrazoExecucao}
                                                    </small>
                                            </div>

                                            <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="riCriticidade">Criticidade*</label>
                                                        <InputText  id="riCriticidade" name="riCriticidade" placeholder="Digite Criticidade"  value={formik.values.riCriticidade}  onChange={formik.handleChange} onBlur={formik.handleBlur} />


                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.riCriticidade}
                                                    </small>
                                            </div>

                                            <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="riEquipamentos">Equipamentos*</label>
                                                        <InputText  id="riEquipamentos" name="riEquipamentos" placeholder="Digite Equipamentos"  value={formik.values.riEquipamentos}  onChange={formik.handleChange} onBlur={formik.handleBlur} />


                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.riEquipamentos}
                                                    </small>
                                            </div>

                                            <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="riCategoria">Categoria*</label>
                                                        <InputText  id="riCategoria" name="riCategoria" placeholder="Digite Categoria"  value={formik.values.riCategoria}  onChange={formik.handleChange} onBlur={formik.handleBlur} />


                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.riCategoria}
                                                    </small>
                                            </div>

                                            <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="riNumeroOs">NumeroOS*</label>
                                                        <InputText  id="riNumeroOs" name="riNumeroOs" placeholder="Digite NumeroOS"  value={formik.values.riNumeroOs}  onChange={formik.handleChange} onBlur={formik.handleBlur} />


                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.riNumeroOs}
                                                    </small>
                                            </div>

                                            <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="riCustoPreditiva">Custo Preditiva*</label>
                                                        <InputText  id="riCustoPreditiva" name="riCustoPreditiva" placeholder="Digite Custo Preditiva"  value={formik.values.riCustoPreditiva}  onChange={formik.handleChange} onBlur={formik.handleBlur} />


                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.riCustoPreditiva}
                                                    </small>
                                            </div>

                                            <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="riCustoCorretiva">Custo Corretiva*</label>
                                                        <InputText  id="riCustoCorretiva" name="riCustoCorretiva" placeholder="Digite Custo Corretiva"  value={formik.values.riCustoCorretiva}  onChange={formik.handleChange} onBlur={formik.handleBlur} />


                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.riCustoCorretiva}
                                                    </small>
                                            </div>    

                                              <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="riQuebraEquipamento">Quebra Equipamento*</label>
                                                        <InputText  id="riQuebraEquipamento" name="riQuebraEquipamento" placeholder="Digite Quebra Equipamento"  value={formik.values.riQuebraEquipamento}  onChange={formik.handleChange} onBlur={formik.handleBlur} />


                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.riQuebraEquipamento}
                                                    </small>
                                            </div>                 
                                           
                                    </div>

                                    <Button  type="submit" label="Salvar" icon="pi pi-check" />
                                

                                
                        <div>

                            <DataTable ref={dt} value={listaRelatorioIntervencao} selection={selectedRelatorioIntervencao} onSelectionChange={(e) => setSelectedRelatorioIntervencao(e.value)}
                                dataKey="riCodigo" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Histórico Componentes"
                                globalFilter={globalFilter}  header={header} responsiveLayout="stack">
                                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                                <Column field="riCodigo" header="Código" sortable style={{ minWidth: '12rem' }}></Column>
                                <Column field="riFalha" header="Falha" sortable style={{ minWidth: '16rem' }}></Column>         
                                <Column field="inspecaoAcusticaLocal" header="Inspecao Acustica Local" sortable style={{ minWidth: '10rem' }}></Column>
                                <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                                
                            </DataTable>

                        </div>

                


                </form>
                
            </div>
       
    );
}