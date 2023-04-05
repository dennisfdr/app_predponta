
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
    useSetorService, 
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

    /*Copiar estas variávies*/
    const [ entidades, setEntidades ] = useState<AnaliseOleo[]>([]);
    const [ entidade, setEntidade ] = useState<AnaliseOleo>(null);
    const [mostraBotao, setMostraBotao] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [entidadeDialog, setEntidadeDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const entidadeService = useAnaliseOleoService();
    const setorService = useSetorService();
    

    

    const formik = useFormik<AnaliseOleo>({
        onSubmit,
        initialValues: formScheme,
        validationSchema: validationScheme
    })


/* Limpar formulário*/ 
const limparFormulario = () => {

    

    formik.setFieldValue("anoCodigo", '')
    formik.setFieldValue("anoNumero", '')
    formik.setFieldValue("anoTecnico", '')
    formik.setFieldValue("anoContaminacao", '')
    formik.setFieldValue("anoDesgaste", '')
    formik.setFieldValue("anoViscosidade", '')
    formik.setFieldValue("anoObservacao", '')
    formik.setFieldValue("anoNumeroDocumentoAnalise", '')
    formik.setFieldValue("anoNumeroOs", '')
    formik.setFieldValue("anoPosHaviaFalha", '')
    formik.setFieldValue("anoPosHaviaFalhaObs", '')
    formik.setFieldValue("anoPosDiagnosticoFalha", '')
    formik.setFieldValue("anoPosDiagnosticoFalhaObs", '')
    formik.setFieldValue("anoPosTrabalhoAlem", '')
    formik.setFieldValue("anoPosTrabalhoAlemObs", '')
    formik.setFieldValue("anoPosDataIntervencao", '')
    formik.setFieldValue("anoPosTempoExecucao", '')
    formik.setFieldValue("anoPosResponsavel", '')
    formik.setFieldValue("anoPosAvaliado", '')
    formik.setFieldValue("anoPosStatusAvaliacao", '')
    formik.setFieldValue("anoPosBaixada", '')
    formik.setFieldValue("anoPosBaixadaObservacao", '')
    formik.setFieldValue("anoDateInsert", '')
    formik.setFieldValue("anoUserInsert", '')
    formik.setFieldValue("anoPosNumeroOs", '')
    formik.setFieldValue("anoNomeArquivo", '')
    formik.setFieldValue("anoArquivo", '')
    
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
    entidadeService.deletar(entidade.anoCodigo).then(response => {
        setDeleteDialog(false);  
        toast.current.show({ severity: 'success', summary: 'Deletado com sucesso!!', life: 3000 });
        getEntidades();
        
    })
}

const editEntidade = (entidade: AnaliseOleo) => {

    /*Altera caption do botão para ALTERAR*/
    setMostraBotao(true);

    /* Campos do formulário*/

    

    formik.setFieldValue("anoCodigo", entidade.anoCodigo)
    formik.setFieldValue("anoNumero", entidade.anoNumero )
    formik.setFieldValue("anoTecnico" , entidade.anoTecnico )
    formik.setFieldValue("anoContaminacao" , entidade.anoContaminacao )
    formik.setFieldValue("anoDesgaste" , entidade.anoDesgaste )
    formik.setFieldValue("anoViscosidade" , entidade.anoViscosidade )
    formik.setFieldValue("anoObservacao" , entidade.anoObservacao )
    formik.setFieldValue("anoNumeroDocumentoAnalise" , entidade.anoNumeroDocumentoAnalise )
    formik.setFieldValue("anoNumeroOs" , entidade.anoNumeroOs )
    formik.setFieldValue("anoPosHaviaFalha" , entidade.anoPosHaviaFalha )
    formik.setFieldValue("anoPosHaviaFalhaObs" , entidade.anoPosHaviaFalhaObs )
    formik.setFieldValue("anoPosDiagnosticoFalha" , entidade.anoPosDiagnosticoFalha )
    formik.setFieldValue("anoPosDiagnosticoFalhaObs" , entidade.anoPosDiagnosticoFalhaObs )
    formik.setFieldValue("anoPosTrabalhoAlem" , entidade.anoPosTrabalhoAlem )
    formik.setFieldValue("anoPosTrabalhoAlemObs" , entidade.anoPosTrabalhoAlemObs )
    formik.setFieldValue("anoPosDataIntervencao" , entidade.anoPosDataIntervencao )
    formik.setFieldValue("anoPosTempoExecucao" , entidade.anoPosTempoExecucao )
    formik.setFieldValue("anoPosResponsavel" , entidade.anoPosResponsavel )
    formik.setFieldValue("anoPosAvaliado" , entidade.anoPosAvaliado )
    formik.setFieldValue("anoPosStatusAvaliacao" , entidade.anoPosStatusAvaliacao )
    formik.setFieldValue("anoPosBaixada" , entidade.anoPosBaixada )
    formik.setFieldValue("anoPosBaixadaObservacao" , entidade.anoPosBaixadaObservacao )
    formik.setFieldValue("anoDateInsert" , entidade.anoDateInsert )
    formik.setFieldValue("anoUserInsert" , entidade.anoUserInsert )
    formik.setFieldValue("anoPosNumeroOs" , entidade.anoNumeroOs )
    formik.setFieldValue("anoNomeArquivo" , entidade.anoNomeArquivo )
    formik.setFieldValue("anoArquivo" , entidade.anoArquivo )

    
    
    
}

const consultaEntidade = (entidade: AnaliseOleo) => {

    setEntidade({...entidade})
    setEntidadeDialog(true);
    setMostraBotao(false);  
  
}

const confirmDelete = (entidade: React.SetStateAction<AnaliseOleo>) => {
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
                <Button icon="pi pi-trash" className="p-button-danger mr-2 p-button-rounded" onClick={confirmDeleteSelected} disabled={!selectedAnaliseOleo || !selectedAnaliseOleo.length} tooltip="Delete" tooltipOptions={{position: 'bottom'}} />
                <Button icon="pi pi-upload" className="p-button-help p-button-rounded" onClick={exportCSV} tooltip="Export" tooltipOptions={{position: 'bottom'}} />
                <span className="p-input-icon-left w-full md:w-auto">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e: FormEvent<HTMLInputElement>) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." className="w-full lg:w-auto" />
                </span>
            </div>
        </div>
    );

    const actionBodyTemplate = (rowData: AnaliseOleo) => {
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
        setorService.carregarByEmpresa(e.value).then(setors => setListaSetor(setors))             
           
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
                                            
                                            
                                            
                                            
                                            
                                            
                                            <div className="col-2">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="anoCodigo">Codigo</label>
                                                        <InputText style={{ width: "100%" }}  disabled placeholder="Código AnaliseOleo" id="anoCodigo" name="anoCodigo" value={formik.values.anoCodigo} />

                                                    </span>

                                    
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
                                                        <label style={{ color: "white" }} htmlFor="anoViscosidade">Viscosidade*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a Viscosidade" id="anoViscosidade" name="anoViscosidade" value={formik.values.anoViscosidade}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.anoViscosidade}
                                                    </small>

                                                    
                                           </div>


                                            

                                           

                                            
                                    </div>

                                    {!mostraBotao &&
                                        <Button type="button" label="Salvar" icon="pi pi-check" onClick={salvar}/>
                                    } {mostraBotao &&
                                        <Button  type="button" label="Alterar" icon="pi pi-check" onClick={alterar}/>
                                    } 
                                

                                
                        <div>

                            <DataTable ref={dt} value={entidades} selection={selectedAnaliseOleo} onSelectionChange={(e) => setSelectedAnaliseOleo(e.value)}
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
                        <Dialog visible={entidadeDialog} breakpoints={{'960px': '75vw', '640px': '100vw'}} style={{width: '40vw'}} header="Cadastro de Análise de öleo" modal className="p-fluid" footer={entidadeDialog} onHide={hideDialog}>
             
                        <div className="col-2">

                          


                            </div>

                            <div className="col-4">

                            <span className="ml-2">
                                <label style={{ color: "white" }} htmlFor="anoArquivo">Arquivo*</label>
                                <InputText style={{ width: "100%" }}  placeholder="Digite o Arquivo" id="anoArquivo" name="anoArquivo" disabled value={entidade?.anoArquivo}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                            </span>

                          
                            </div>

                            <div className="col-4">

                            <span className="ml-2">
                                <label style={{ color: "white" }} htmlFor="anoContaminacao">Contaminação*</label>
                                <InputText style={{ width: "100%" }}  placeholder="Digite a Contaminação" id="anoContaminacao" name="anoContaminacao" disabled value={entidade?.anoContaminacao}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                            </span>

                           


                            </div>



                            <div className="col-4">

                            <span className="ml-2">
                                <label style={{ color: "white" }} htmlFor="anoDateInsert">Data Insert*</label><br></br>
                                <Calendar  id="anoDateInsert" name="anoDateInsert" value={date1} onChange={formik.handleChange} dateFormat="dd/mm/yy" mask="99/99/9999" showIcon onBlur={formik.handleBlur}/>

                            </span>

                           
                            </div>



                            <div className="col-4">

                            <span className="ml-2">
                                <label style={{ color: "white" }} htmlFor="anoDesgaste">Desgaste*</label>
                                <InputText style={{ width: "100%" }}  placeholder="Digite o Desgaste" id="anoDesgaste" name="anoDesgaste" disabled value={entidade?.anoDesgaste}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                            </span>


                            </div>

                            <div className="col-4">

                            <span className="ml-2">
                                <label style={{ color: "white" }} htmlFor="anoNomeArquivo">Nome Arquivo*</label>
                                <InputText style={{ width: "100%" }}  placeholder="Digite o Nome Arquivo" id="anoNomeArquivo" name="anoNomeArquivo" disabled value={entidade?.anoNomeArquivo}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                            </span>

                          

                            </div>

                            <div className="col-4">

                            <span className="ml-2">
                                <label style={{ color: "white" }} htmlFor="anoNumero">Número*</label>
                                <InputText style={{ width: "100%" }}  placeholder="Digite o Número" id="anoNumero" name="anoNumero" disabled value={entidade?.anoNumero}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                            </span>



                            </div>

                            <div className="col-4">

                            <span className="ml-2">
                                <label style={{ color: "white" }} htmlFor="anoNumeroDocumentoAnalise">Num. Doc. Análise*</label>
                                <InputText style={{ width: "100%" }}  placeholder="Digite o Num. Doc. Análise" id="anoNumeroDocumentoAnalise" name="anoNumeroDocumentoAnalise" disabled value={entidade?.anoNumeroDocumentoAnalise}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                            </span>

                           

                            </div>

                            <div className="col-4">

                            <span className="ml-2">
                                <label style={{ color: "white" }} htmlFor="anoNumeroOs">Num. OS*</label>
                                <InputText style={{ width: "100%" }}  placeholder="Digite o Num. OS" id="anoNumeroOs" name="anoNumeroOs" disabled value={entidade?.anoNumeroOs}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                            </span>

                          


                            </div>

                            <div className="col-4">

                            <span className="ml-2">
                                <label style={{ color: "white" }} htmlFor="anoObservacao">Observação*</label>
                                <InputText style={{ width: "100%" }}  placeholder="Digite a Observação" id="anoObservacao" name="anoObservacao" disabled value={entidade?.anoObservacao}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                            </span>

                            


                            </div>

                            <div className="col-4">

                            <span className="ml-2">
                                <label style={{ color: "white" }} htmlFor="anoPosAvaliado">Pos Avaliado*</label>
                                <InputText style={{ width: "100%" }}  placeholder="Digite o Pos Avaliado" id="anoPosAvaliado" name="anoPosAvaliado" disabled value={entidade?.anoPosAvaliado}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                            </span>

                           


                            </div>

                            <div className="col-4">

                            <span className="ml-2">
                                <label style={{ color: "white" }} htmlFor="anoPosBaixada">Pos Baixada*</label>
                                <InputText style={{ width: "100%" }}  placeholder="Digite o Pos Baixada" id="anoPosBaixada" name="anoPosBaixada" disabled value={entidade?.anoPosBaixada}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                            </span>

                           

                            </div>

                            <div className="col-4">

                            <span className="ml-2">
                                <label style={{ color: "white" }} htmlFor="anoPosBaixadaObservacao">Pos Baixada OBS*</label>
                                <InputText style={{ width: "100%" }}  placeholder="Digite Pos Baixada OBS" id="anoPosBaixadaObservacao" name="anoPosBaixadaObservacao" disabled value={entidade?.anoPosBaixadaObservacao}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                            </span>

                            


                            </div>

                            <div className="col-4">

                            <span className="ml-2">
                                <label style={{ color: "white" }} htmlFor="anoPosDataIntervencao">Data Intervenção*</label><br></br>
                                <Calendar  id="anoPosDataIntervencao" name="anoPosDataIntervencao" value={date1} onChange={formik.handleChange} dateFormat="dd/mm/yy" mask="99/99/9999" showIcon onBlur={formik.handleBlur}/>

                            </span>

                           
                            </div>




                            <div className="col-4">

                            <span className="ml-2">
                                <label style={{ color: "white" }} htmlFor="anoPosDiagnosticoFalha">Pos Diag. Falha*</label>
                                <InputText style={{ width: "100%" }}  placeholder="Digite Pos Diag. Falha" id="anoPosDiagnosticoFalha" name="anoPosDiagnosticoFalha" disabled value={entidade?.anoPosDiagnosticoFalha}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                            </span>

                            


                            </div>


                            <div className="col-4">

                            <span className="ml-2">
                                <label style={{ color: "white" }} htmlFor="anoPosDiagnosticoFalhaObs">Pos Diag. Falha OBS*</label>
                                <InputText style={{ width: "100%" }}  placeholder="Digite Pos Diag. Falha OBS" id="anoPosDiagnosticoFalhaObs" name="anoPosDiagnosticoFalhaObs" disabled value={entidade?.anoPosDiagnosticoFalhaObs}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                            </span>

                           

                            </div>

                            <div className="col-4">

                           
                           

                            </div>

                            <div className="col-4">

                            <span className="ml-2">
                                <label style={{ color: "white" }} htmlFor="anoPosHaviaFalhaObs">Pos Havia Falha OBS*</label>
                                <InputText style={{ width: "100%" }}  placeholder="Digite Pos Havia Falha OBS" id="anoPosHaviaFalhaObs" name="anoPosHaviaFalhaObs" disabled value={entidade?.anoPosHaviaFalhaObs}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                            </span>

                            


                            </div>

                            <div className="col-4">

                            <span className="ml-2">
                                <label style={{ color: "white" }} htmlFor="anoPosNumeroOs">Pos Num. OS*</label>
                                <InputText style={{ width: "100%" }}  placeholder="Digite Pos Num. OS" id="anoPosNumeroOs" name="anoPosNumeroOs" disabled value={entidade?.anoPosNumeroOs}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                            </span>

                           


                            </div>

                            <div className="col-4">

                            <span className="ml-2">
                                <label style={{ color: "white" }} htmlFor="anoPosResponsavel">Pos Responsável*</label>
                                <InputText style={{ width: "100%" }}  placeholder="Digite Pos Responsável" id="anoPosResponsavel" name="anoPosResponsavel" disabled value={entidade?.anoPosResponsavel}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                            </span>

                           

                            </div>

                            <div className="col-4">

                            <span className="ml-2">
                                <label style={{ color: "white" }} htmlFor="anoPosStatusAvaliacao">Pos Status Avaliação*</label>
                                <InputText style={{ width: "100%" }}  placeholder="Digite Pos Status Avaliação" id="anoPosStatusAvaliacao" name="anoPosStatusAvaliacao" disabled value={entidade?.anoPosStatusAvaliacao}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                            </span>

                           


                            </div>


                            <div className="col-4">

                            <span className="ml-2">
                                <label style={{ color: "white" }} htmlFor="anoPosTempoExecucao">Pos Tempo Exec.*</label>
                                <InputText style={{ width: "100%" }}  placeholder="Digite Pos Tempo Exec." id="anoPosTempoExecucao" name="anoPosTempoExecucao" disabled value={entidade?.anoPosTempoExecucao}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                            </span>

                            

                            </div>

                            <div className="col-4">

                            

                            


                            </div>

                            <div className="col-4">

                            <span className="ml-2">
                                <label style={{ color: "white" }} htmlFor="anoPosTrabalhoAlemObs">Pos Trab. Além OBS*</label>
                                <InputText style={{ width: "100%" }}  placeholder="Digite Pos Trab. Além OBS" id="anoPosTrabalhoAlemObs" name="anoPosTrabalhoAlemObs" disabled value={entidade?.anoPosTrabalhoAlemObs}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                            </span>

                            


                            </div>

                            <div className="col-4">

                            <span className="ml-2">
                                <label style={{ color: "white" }} htmlFor="anoTecnico">Técnico*</label>
                                <InputText style={{ width: "100%" }}  placeholder="Digite o Técnico" id="anoTecnico" name="anoTecnico" disabled value={entidade?.anoTecnico}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                            </span>

                            

                            </div>

                            <div className="col-4">

                            <span className="ml-2">
                                <label style={{ color: "white" }} htmlFor="anoUserInsert">User Insert*</label>
                                <InputText style={{ width: "100%" }}  placeholder="Digite User Insert" id="anoUserInsert" name="anoUserInsert" disabled value={entidade?.anoUserInsert}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                            </span>

                            

                            </div>

                            <div className="col-4">

                            <span className="ml-2">
                                <label style={{ color: "white" }} htmlFor="anoViscosidade">Viscosidade*</label>
                                <InputText style={{ width: "100%" }}  placeholder="Digite a Viscosidade" id="anoViscosidade" name="anoViscosidade" disabled value={entidade?.anoViscosidade}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                            </span>

                            


                            </div>

                                                
                        </Dialog>

                        <Dialog visible={deleteDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteDialogFooter} onHide={hideDeleteDialog}>
                            <div className="flex align-items-center justify-content-center">
                                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                                {entidade && <span>Tem certeza que quer deletar? <b>{entidade.anoCodigo}</b>?</span>}
                            </div>
                        </Dialog>


                


                </form>
                
            </div>
       
    );
}