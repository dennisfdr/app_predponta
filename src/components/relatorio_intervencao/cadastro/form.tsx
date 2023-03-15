
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
import { Empresa } from 'app/model/empresas'
import { Setor } from 'app/model/setor'
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
    //inspecaoAcusticaLocal: null
    
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

    /*Copiar estas variávies*/
    const [ entidades, setEntidades ] = useState<RelatorioIntervencao[]>([]);
    const [ entidade, setEntidade ] = useState<RelatorioIntervencao>(null);
    const [mostraBotao, setMostraBotao] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [entidadeDialog, setEntidadeDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const entidadeService = useRelatorioIntervencaoService();
    

    

    const formik = useFormik<RelatorioIntervencao>({
        onSubmit,
        initialValues: formScheme,
       // validationSchema: validationScheme
    })


/* Limpar formulário*/ 
const limparFormulario = () => {

    formik.setFieldValue("riCodigo", '' )
    formik.setFieldValue("riFalha", '' )
    formik.setFieldValue("riEspecificacaoFalha", '' )
    formik.setFieldValue("riPosicao", '' )
    formik.setFieldValue("riAcaoProposta", '' )
    formik.setFieldValue("riEspectro", '' )
    formik.setFieldValue("riCurvaTendencia", '' )
    formik.setFieldValue("riVideo", '' )
    formik.setFieldValue("riStatus", '' )  
    formik.setFieldValue("riDataAbertura", '' )
    formik.setFieldValue("riDataColeta", '')
    formik.setFieldValue("riFotoComponente", '' )
    formik.setFieldValue("riHaviaFalha", '' )
    formik.setFieldValue("riHaviaFalhaObs", '' )
    formik.setFieldValue("riDiagnosticoFalha", '' )
    formik.setFieldValue("riDiagnosticoFalhaObs", '' )
    formik.setFieldValue("riTrabalhoAlem", '' )
    formik.setFieldValue("riTrabalhoAlemObs", '' )
    formik.setFieldValue("riDataIntervencao", '' )
    formik.setFieldValue("riTempoExecucao", '' )
    formik.setFieldValue("riResponsavel", '' )
    formik.setFieldValue("riNumOs", '' )
    formik.setFieldValue("riStatusAvaliacao", '' )
    formik.setFieldValue("riAvaliado", '' )
    formik.setFieldValue("riBaixada", '' )
    formik.setFieldValue("riBaixadaObs", '' )
    formik.setFieldValue("riPrazoExecucao", '' )
    formik.setFieldValue("riCriticidade", '' )
    formik.setFieldValue("riEquipamentos", '' )
    formik.setFieldValue("riCategoria", '' )
    formik.setFieldValue("riNumeroOs", '' )
    formik.setFieldValue("riCustoPreditiva", '' )
    formik.setFieldValue("riCustoCorretiva", '' )
    formik.setFieldValue("riQuebraEquipamento", '' )
    
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
    entidadeService.deletar(entidade.riCodigo).then(response => {
        setDeleteDialog(false);  
        toast.current.show({ severity: 'success', summary: 'Deletado com sucesso!!', life: 3000 });
        getEntidades();
        
    })
}

const editEntidade = (entidade: RelatorioIntervencao) => {

    /*Altera caption do botão para ALTERAR*/
    setMostraBotao(true);

    /* Campos do formulário*/


    formik.setFieldValue("riCodigo", entidade.riCodigo )
    formik.setFieldValue("riFalha", entidade.riFalha )
    formik.setFieldValue("riEspecificacaoFalha", entidade.riEspecificacaoFalha )
    formik.setFieldValue("riPosicao", entidade.riPosicao )
    formik.setFieldValue("riAcaoProposta", entidade.riAcaoProposta )
    formik.setFieldValue("riEspectro", entidade.riEspectro )
    formik.setFieldValue("riCurvaTendencia", entidade.riCurvaTendencia )
    formik.setFieldValue("riVideo", entidade.riVideo )
    formik.setFieldValue("riStatus", entidade.riStatus )  
    formik.setFieldValue("riDataAbertura", entidade.riDataAbertura )
    formik.setFieldValue("riDataColeta", entidade.riDataColeta )
    formik.setFieldValue("riFotoComponente", entidade.riFotoComponente )
    formik.setFieldValue("riHaviaFalha", entidade.riHaviaFalha )
    formik.setFieldValue("riHaviaFalhaObs", entidade.riHaviaFalhaObs )
    formik.setFieldValue("riDiagnosticoFalha", entidade.riDiagnosticoFalha )
    formik.setFieldValue("riDiagnosticoFalhaObs", entidade.riDiagnosticoFalhaObs )
    formik.setFieldValue("riTrabalhoAlem", entidade.riTrabalhoAlem )
    formik.setFieldValue("riTrabalhoAlemObs", entidade.riTrabalhoAlemObs )
    formik.setFieldValue("riDataIntervencao", entidade.riDataIntervencao )
    formik.setFieldValue("riTempoExecucao", entidade.riTempoExecucao )
    formik.setFieldValue("riResponsavel", entidade.riResponsavel )
    formik.setFieldValue("riNumOs", entidade.riNumOs )
    formik.setFieldValue("riStatusAvaliacao", entidade.riStatusAvaliacao )
    formik.setFieldValue("riAvaliado", entidade.riAvaliado )
    formik.setFieldValue("riBaixada", entidade.riBaixada )
    formik.setFieldValue("riBaixadaObs", entidade.riBaixadaObs )
    formik.setFieldValue("riPrazoExecucao", entidade.riPrazoExecucao )
    formik.setFieldValue("riCriticidade", entidade.riCriticidade )
    formik.setFieldValue("riEquipamentos", entidade.riEquipamentos )
    formik.setFieldValue("riCategoria", entidade.riCategoria )
    formik.setFieldValue("riNumeroOs", entidade.riNumeroOs )
    formik.setFieldValue("riCustoPreditiva", entidade.riCustoPreditiva )
    formik.setFieldValue("riCustoCorretiva", entidade.riCustoCorretiva )
    formik.setFieldValue("riQuebraEquipamento", entidade.riQuebraEquipamento )
    
    
    
}

const consultaEntidade = (entidade: RelatorioIntervencao) => {

    setEntidade({...entidade})
    setEntidadeDialog(true);
    setMostraBotao(false);  
  
}

const confirmDelete = (entidade: React.SetStateAction<RelatorioIntervencao>) => {
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
                <Button icon="pi pi-trash" className="p-button-danger mr-2 p-button-rounded" onClick={confirmDeleteSelected} disabled={!selectedRelatorioIntervencao || !selectedRelatorioIntervencao.length} tooltip="Delete" tooltipOptions={{position: 'bottom'}} />
                <Button icon="pi pi-upload" className="p-button-help p-button-rounded" onClick={exportCSV} tooltip="Export" tooltipOptions={{position: 'bottom'}} />
                <span className="p-input-icon-left w-full md:w-auto">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e: FormEvent<HTMLInputElement>) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." className="w-full lg:w-auto" />
                </span>
            </div>
        </div>
    );

    const actionBodyTemplate = (rowData: RelatorioIntervencao) => {
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

                                            {/*<div className="col-6">
                                                <label style={{ color: "white" }} htmlFor="inspecaoAcusticaLocal">InspecaoAcusticaLocal: *</label>
                                                <Dropdown 
                                                    style={{ width: "100%" }}
                                                    value={inspecaoAcusticaLocal} 
                                                    options={listaInspecaoAcusticaLocal} 
                                                    onChange={handleInspecaoAcusticaLocalChange} 
                                                    optionLabel="ialCodigo" 
                                                    placeholder="Selecione a Inspecao Acustica Local" />

                                            </div> */}
                                            
                                                                  
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

                                            {/*<div className="col-4">

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
                                        </div>  */}               
                                           
                                    </div>

                                    {!mostraBotao &&
                                        <Button type="button" label="Salvar" icon="pi pi-check" onClick={salvar}/>
                                    } {mostraBotao &&
                                        <Button  type="button" label="Alterar" icon="pi pi-check" onClick={alterar}/>
                                    } 
                                

                                
                        <div>

                            <DataTable ref={dt} value={entidades} selection={selectedRelatorioIntervencao} onSelectionChange={(e) => setSelectedRelatorioIntervencao(e.value)}
                                dataKey="riCodigo" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Histórico Componentes"
                                globalFilter={globalFilter}  header={header} responsiveLayout="stack">
                                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                                <Column field="riCodigo" header="Código" sortable style={{ minWidth: '12rem' }}></Column>
                                <Column field="riFalha" header="Falha" sortable style={{ minWidth: '16rem' }}></Column>         
                                <Column field="inspecaoAcusticaLocal.ialCodigo" header="Inspecao Acustica Local" sortable style={{ minWidth: '10rem' }}></Column>
                                <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                                
                            </DataTable>

                        </div>

                        <Dialog visible={entidadeDialog} breakpoints={{'960px': '75vw', '640px': '100vw'}} style={{width: '40vw'}} header="Cadastro de Medição" modal className="p-fluid" footer={entidadeDialog} onHide={hideDialog}>
             
                        <div className="col-2">

                            <span className="ml-2">
                                <label style={{ color: "white" }} htmlFor="riCodigo">Codigo</label>
                                <InputText style={{ width: "100%" }}  disabled placeholder="Código RelatorioIntervencao" id="riCodigo" name="riCodigo" value={formik.values.riCodigo} />

                            </span>


                            </div>

                            <div className="col-4">

                            <span className="ml-2">
                                <label style={{ color: "white" }} htmlFor="riFalha">Falha*</label>
                                <InputText  id="riFalha" name="riFalha" disabled placeholder="Digite a Falha "  value={entidade?.riFalha}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                            </span>

                            
                            </div>


                            <div className="col-4">

                            <span className="ml-2">
                                <label style={{ color: "white" }} htmlFor="riEspecificacaoFalha">Espec. Falha*</label>
                                <InputText  id="riEspecificacaoFalha" name="riEspecificacaoFalha" disabled placeholder="Digite a Espec. Falha "  value={entidade?.riEspecificacaoFalha}  onChange={formik.handleChange} onBlur={formik.handleBlur} />


                            </span>

                            
                            </div>

                            <div className="col-4">

                            <span className="ml-2">
                                <label style={{ color: "white" }} htmlFor="riPosicao">Posicao*</label>
                                <InputText  id="riPosicao" name="riPosicao" disabled placeholder="Digite a Posicao Falha "  value={entidade?.riPosicao}  onChange={formik.handleChange} onBlur={formik.handleBlur} />


                            </span>

                            
                            </div>

                            <div className="col-4">

                            <span className="ml-2">
                                <label style={{ color: "white" }} htmlFor="riAcaoProposta">Acao Proposta*</label>
                                <InputText  id="riAcaoProposta" name="riAcaoProposta" disabled placeholder="Digite a Acao Proposta "  value={entidade?.riAcaoProposta}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                            </span>

                            
                            </div>

                            <div className="col-4">

                            <span className="ml-2">
                                <label style={{ color: "white" }} htmlFor="riEspectro">Espectro*</label>
                                <InputText  id="riEspectro" name="riEspectro" disabled placeholder="Digite Espectro "  value={entidade?.riEspectro}  onChange={formik.handleChange} onBlur={formik.handleBlur} />


                            </span>

                            
                            </div>

                            <div className="col-4">

                            <span className="ml-2">
                                <label style={{ color: "white" }} htmlFor="riCurvaTendencia">Curva Tendencia*</label>
                                <InputText  id="riCurvaTendencia" name="riCurvaTendencia" disabled placeholder="Digite Curva Tendencia "  value={entidade?.riCurvaTendencia}  onChange={formik.handleChange} onBlur={formik.handleBlur} />


                            </span>

                            
                            </div>

                            <div className="col-4">

                            <span className="ml-2">
                                <label style={{ color: "white" }} htmlFor="riVideo">Vídeo*</label>
                                <InputText  id="riVideo" name="riVideo" disabled placeholder="Digite Vídeo"  value={entidade?.riVideo}  onChange={formik.handleChange} onBlur={formik.handleBlur} />


                            </span>

                            
                            </div>

                            <div className="col-4">

                            <span className="ml-2">
                                <label style={{ color: "white" }} htmlFor="riStatus">Status*</label>
                                <InputText  id="riStatus" name="riStatus" disabled placeholder="Digite o Status"  value={entidade?.riStatus}  onChange={formik.handleChange} onBlur={formik.handleBlur} />


                            </span>

                            
                            </div>

                            <div className="col-4">

                            <span className="ml-2">
                                <label style={{ color: "white" }} htmlFor="riDataAbertura">Data Abertura*</label><br></br>
                                <Calendar  id="riDataAbertura" name="riDataAbertura" value={date1} onChange={formik.handleChange} dateFormat="dd/mm/yy" mask="99/99/9999" showIcon onBlur={formik.handleBlur}/>


                            </span>

                            
                            </div>

                            <div className="col-4">

                            <span className="ml-2">
                                <label style={{ color: "white" }} htmlFor="riDataColeta">Data Coleta*</label><br></br>
                                <Calendar  id="riDataColeta" name="riDataColeta" value={date1} onChange={formik.handleChange} dateFormat="dd/mm/yy" mask="99/99/9999" showIcon onBlur={formik.handleBlur}/>


                            </span>

                            
                            </div>

                            <div className="col-4">

                            <span className="ml-2">
                                <label style={{ color: "white" }} htmlFor="riFotoComponente">Foto*</label>
                                <InputText  id="riFotoComponente" name="riFotoComponente" disabled placeholder="Digite a Foto"  value={entidade?.riFotoComponente}  onChange={formik.handleChange} onBlur={formik.handleBlur} />


                            </span>

                            
                            </div>

                            <div className="col-4">

                            <span className="ml-2">
                                <label style={{ color: "white" }} htmlFor="riHaviaFalha">Havia Falha*</label>
                                <InputText  id="riHaviaFalha" name="riHaviaFalha" disabled placeholder="Digite Havia Falha"  value={entidade?.riHaviaFalha}  onChange={formik.handleChange} onBlur={formik.handleBlur} />


                            </span>

                            
                            </div>

                            <div className="col-4">

                            <span className="ml-2">
                                <label style={{ color: "white" }} htmlFor="riHaviaFalhaObs">Havia Falha OBS*</label>
                                <InputText  id="riHaviaFalhaObs" name="riHaviaFalhaObs" disabled placeholder="Digite Havia Falha OBS"  value={entidade?.riHaviaFalhaObs}  onChange={formik.handleChange} onBlur={formik.handleBlur} />


                            </span>

                            
                            </div>

                            <div className="col-4">

                            <span className="ml-2">
                                <label style={{ color: "white" }} htmlFor="riDiagnosticoFalha">Diag. Falha*</label>
                                <InputText  id="riDiagnosticoFalha" name="riDiagnosticoFalha" disabled placeholder="Digite Diagnóstico Falha"  value={entidade?.riDiagnosticoFalha}  onChange={formik.handleChange} onBlur={formik.handleBlur} />


                            </span>

                            
                            </div>

                            <div className="col-4">

                            <span className="ml-2">
                                <label style={{ color: "white" }} htmlFor="riDiagnosticoFalhaObs">Diag. Falha OBS*</label>
                                <InputText  id="riDiagnosticoFalhaObs" name="riDiagnosticoFalhaObs" disabled placeholder="Digite Diagnóstico Falha OBS"  value={entidade?.riDiagnosticoFalhaObs}  onChange={formik.handleChange} onBlur={formik.handleBlur} />


                            </span>

                            
                            </div>

                            <div className="col-4">

                            <span className="ml-2">
                                <label style={{ color: "white" }} htmlFor="riTrabalhoAlem">Trabalho Alem*</label>
                                <InputText  id="riTrabalhoAlem" name="riTrabalhoAlem" disabled placeholder="Digite Trabalho Alem"  value={entidade?.riTrabalhoAlem}  onChange={formik.handleChange} onBlur={formik.handleBlur} />


                            </span>

                            
                            </div>

                            <div className="col-4">

                            <span className="ml-2">
                                <label style={{ color: "white" }} htmlFor="riTrabalhoAlemObs">TrabalhoAlemObs*</label>
                                <InputText  id="riTrabalhoAlemObs" name="riTrabalhoAlemObs" disabled placeholder="Digite Trabalho Alem OBS"  value={entidade?.riTrabalhoAlemObs}  onChange={formik.handleChange} onBlur={formik.handleBlur} />


                            </span>

                            
                            </div>


                            <div className="col-4">

                            <span className="ml-2">
                                <label style={{ color: "white" }} htmlFor="riDataIntervencao">Data Intervencao*</label><br></br>
                                <Calendar  id="riDataIntervencao" name="riDataIntervencao" value={date1} onChange={formik.handleChange} dateFormat="dd/mm/yy" mask="99/99/9999" showIcon onBlur={formik.handleBlur}/>


                            </span>

                            
                            </div>

                            <div className="col-4">

                            <span className="ml-2">
                                <label style={{ color: "white" }} htmlFor="riTempoExecucao">Tempo Execução*</label>
                                <InputText  id="riTempoExecucao" name="riTempoExecucao" disabled placeholder="Digite Tempo Execução"  value={entidade?.riTempoExecucao}  onChange={formik.handleChange} onBlur={formik.handleBlur} />


                            </span>

                           
                            </div>

                            <div className="col-4">

                            <span className="ml-2">
                                <label style={{ color: "white" }} htmlFor="riResponsavel">Responsável*</label>
                                <InputText  id="riResponsavel" name="riResponsavel" disabled placeholder="Digite Responsável"  value={entidade?.riResponsavel}  onChange={formik.handleChange} onBlur={formik.handleBlur} />


                            </span>

                            
                            </div>

                            <div className="col-4">

                            <span className="ml-2">
                                <label style={{ color: "white" }} htmlFor="riNumOs">NumOS</label>
                                <InputText  id="riNumOs" name="riNumOs" disabled placeholder="Digite NumOS"  value={entidade?.riNumOs}  onChange={formik.handleChange} onBlur={formik.handleBlur} />


                            </span>

                            
                            </div>

                            <div className="col-4">

                            <span className="ml-2">
                                <label style={{ color: "white" }} htmlFor="riStatusAvaliacao">Status Avaliação*</label>
                                <InputText  id="riStatusAvaliacao" name="riStatusAvaliacao" disabled placeholder="Digite Status Avaliação"  value={entidade?.riStatusAvaliacao}  onChange={formik.handleChange} onBlur={formik.handleBlur} />


                            </span>

                            
                            </div>

                            <div className="col-4">

                            <span className="ml-2">
                                <label style={{ color: "white" }} htmlFor="riAvaliado">Avaliado*</label>
                                <InputText  id="riAvaliado" name="riAvaliado" disabled placeholder="Digite Avaliado"  value={entidade?.riAvaliado}  onChange={formik.handleChange} onBlur={formik.handleBlur} />


                            </span>

                            
                            </div>

                            <div className="col-4">

                            <span className="ml-2">
                                <label style={{ color: "white" }} htmlFor="riBaixada">Baixada*</label>
                                <InputText  id="riBaixada" name="riBaixada" disabled placeholder="Digite Baixada"  value={entidade?.riBaixada}  onChange={formik.handleChange} onBlur={formik.handleBlur} />


                            </span>

                            
                            </div>

                            <div className="col-4">

                            <span className="ml-2">
                                <label style={{ color: "white" }} htmlFor="riBaixadaObs">BaixadaOBS*</label>
                                <InputText  id="riBaixadaObs" name="riBaixadaObs" disabled placeholder="Digite BaixadaOBS"  value={entidade?.riBaixadaObs}  onChange={formik.handleChange} onBlur={formik.handleBlur} />


                            </span>

                            
                            </div>

                            <div className="col-4">

                            <span className="ml-2">
                                <label style={{ color: "white" }} htmlFor="riPrazoExecucao">Prazo Execução*</label>
                                <InputText  id="riPrazoExecucao" name="riPrazoExecucao" disabled placeholder="Digite Prazo Execução"  value={entidade?.riPrazoExecucao}  onChange={formik.handleChange} onBlur={formik.handleBlur} />


                            </span>

                            
                            </div>

                            <div className="col-4">

                            <span className="ml-2">
                                <label style={{ color: "white" }} htmlFor="riCriticidade">Criticidade*</label>
                                <InputText  id="riCriticidade" name="riCriticidade" disabled placeholder="Digite Criticidade"  value={entidade?.riCriticidade}  onChange={formik.handleChange} onBlur={formik.handleBlur} />


                            </span>

                            
                            </div>

                            <div className="col-4">

                            <span className="ml-2">
                                <label style={{ color: "white" }} htmlFor="riEquipamentos">Equipamentos*</label>
                                <InputText  id="riEquipamentos" name="riEquipamentos" disabled placeholder="Digite Equipamentos"  value={entidade?.riEquipamentos}  onChange={formik.handleChange} onBlur={formik.handleBlur} />


                            </span>

                            
                            </div>

                            <div className="col-4">

                            <span className="ml-2">
                                <label style={{ color: "white" }} htmlFor="riCategoria">Categoria*</label>
                                <InputText  id="riCategoria" name="riCategoria" disabled placeholder="Digite Categoria"  value={entidade?.riCategoria}  onChange={formik.handleChange} onBlur={formik.handleBlur} />


                            </span>

                            
                            </div>

                            <div className="col-4">

                            <span className="ml-2">
                                <label style={{ color: "white" }} htmlFor="riNumeroOs">NumeroOS*</label>
                                <InputText  id="riNumeroOs" name="riNumeroOs" disabled placeholder="Digite NumeroOS"  value={entidade?.riNumeroOs}  onChange={formik.handleChange} onBlur={formik.handleBlur} />


                            </span>

                            
                            </div>

                            <div className="col-4">

                            <span className="ml-2">
                                <label style={{ color: "white" }} htmlFor="riCustoPreditiva">Custo Preditiva*</label>
                                <InputText  id="riCustoPreditiva" name="riCustoPreditiva" disabled placeholder="Digite Custo Preditiva"  value={entidade?.riCustoPreditiva}  onChange={formik.handleChange} onBlur={formik.handleBlur} />


                            </span>

                           
                            </div>

                            <div className="col-4">

                            <span className="ml-2">
                                <label style={{ color: "white" }} htmlFor="riCustoCorretiva">Custo Corretiva*</label>
                                <InputText  id="riCustoCorretiva" name="riCustoCorretiva" disabled placeholder="Digite Custo Corretiva"  value={entidade?.riCustoCorretiva}  onChange={formik.handleChange} onBlur={formik.handleBlur} />


                            </span>

                           
                            </div>    

                            <div className="col-4">

                            <span className="ml-2">
                                <label style={{ color: "white" }} htmlFor="riQuebraEquipamento">Quebra Equipamento*</label>
                                <InputText  id="riQuebraEquipamento" name="riQuebraEquipamento" disabled placeholder="Digite Quebra Equipamento"  value={entidade?.riQuebraEquipamento}  onChange={formik.handleChange} onBlur={formik.handleBlur} />


                            </span>

                            
                            </div>                 


                                                
                        </Dialog>

                        <Dialog visible={deleteDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteDialogFooter} onHide={hideDeleteDialog}>
                            <div className="flex align-items-center justify-content-center">
                                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                                {entidade && <span>Tem certeza que quer deletar? <b>{entidade.riCodigo}</b>?</span>}
                            </div>
                        </Dialog>

                


                </form>
                
            </div>
       
    );
}