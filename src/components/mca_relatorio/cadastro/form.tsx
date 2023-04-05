
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
    useSetorService 
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
import { McaMedicao } from 'app/model/mca_medicao'
import { McaRelatorio } from 'app/model/mca_relatorio'



interface McaRelatorioFormProps {
    onSubmit: (mcaRelatorio: McaRelatorio) => void;
   
}

const formScheme: McaRelatorio = {
    
    mcrCodigo:'',
    mcrNumero:'',
    mcrFalha:'',
    mcrParecerTecnico:'',
    mcrAcaoProposta:'',
    mcrResistenciaFasesR1:'',
    mcrResistenciaFasesR2:'',
    mcrResistenciaFasesR3:'',
    mcrResistenciaFasesR:'',
    mcrResistenciaFasesStatus:'',
    mcrImpedanciaZ1:'',
    mcrImpedanciaZ1Status:'',
    mcrImpedanciaZ2:'',
    mcrImpedanciaZ2Status:'',
    mcrImpedanciaZ3:'',
    mcrImpedanciaZ3Status:'',
    mcrAnguloFi1:'',
    mcrAnguloFi2:'',
    mcrAnguloFi3:'',
    mcrAnguloFi:'',
    mcrAnguloFiStatus:'',
    mcrAnguloIf1:'',
    mcrAnguloIf2:'',
    mcrAnguloIf3:'',
    mcrAnguloIf:'',
    mcrAnguloIfStatus:'',
    mcrResistencia:'',
    mcrResistenciaStatus:'',
    mcrDateInsert:'',
    mcrUserInsert:'',
    mcrImpedanciaL1:'',
    mcrImpedanciaL1Status:'',
    mcrImpedanciaL2:'',
    mcrImpedanciaL2Status:'',
    mcrImpedanciaL3:'',
    mcrImpedanciaL3Status:'',
    mcrNumeroOs:'',
    mcrFotoCompImpedancia:'',
    mcrFotoTendenciaAngulo:'',
    mcrFotoTendenciaIsolamento:'',
    mcaMedicao: null

    
}

export const McaRelatorioForm: React.FC<McaRelatorioFormProps> = ({
    onSubmit,
   
}) => {

    
    const maquinaService = useMaquinaService();
    const empresaService = useEmpresaService();
    const maquinaEquipamentoService = useMaquinaEquipamentoService();
    const componenteService = useComponenteService();
    const medicaoService = useMedicaoService();
    const mcaMedicaoService = useMcaMedicaoService();
    const mcaRelatorioService = useMcaRelatorioService();


    
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

    const [ maquinaEquipamento, setMaquinaEquipamento ] = useState<MaquinaEquipamento>(null);
    const [ componente, setComponente ] = useState<Componente>(null);
    const [ setor, setSetor ] = useState<Setor>(null);
    const [ medicao, setMedicao ] = useState<Medicao>(null);
    const [ mcaMedicao, setMcaMedicao ] = useState<McaMedicao>(null);



    const [globalFilter, setGlobalFilter] = useState<string>();
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable>(null);

    const [selectedMcaRelatorio, setSelectedMcaRelatorio] = useState<McaRelatorio[]>([]);
    const [ maquinas, setMaquinas ] = useState<Maquina[]>([]);

    const [deleteEmpresasDialog, setDeleteEmpresasDialog] = useState(false);

    const [ date1, setAlteraData1 ] = useState<Date | Date[] | undefined>(undefined);


    /*Copiar estas variávies*/
     const [ entidades, setEntidades ] = useState<McaRelatorio[]>([]);
     const [ entidade, setEntidade ] = useState<McaRelatorio>(null);
     const [mostraBotao, setMostraBotao] = useState(false);
     const [deleteDialog, setDeleteDialog] = useState(false);
     const [entidadeDialog, setEntidadeDialog] = useState(false);
     const [submitted, setSubmitted] = useState(false);
     const entidadeService = useMcaRelatorioService();
     const setorService = useSetorService();

    

    const formik = useFormik<McaRelatorio>({
        onSubmit,
        initialValues: formScheme,
        validationSchema: validationScheme
    })


/* Limpar formulário*/ 
const limparFormulario = () => {

    
    formik.setFieldValue("mcrCodigo", '')
    formik.setFieldValue("mcrNumero", '')
    formik.setFieldValue("mcrFalha", '')
    formik.setFieldValue("mcrParecerTecnico", '')
    formik.setFieldValue("mcrAcaoProposta", '')
    formik.setFieldValue("mcrResistenciaFasesR1", '')
    formik.setFieldValue("mcrResistenciaFasesR2", '')
    formik.setFieldValue("mcrResistenciaFasesR3", '')
    formik.setFieldValue("mcrResistenciaFasesR", '')
    formik.setFieldValue("mcrResistenciaFasesStatus", '')
    formik.setFieldValue("mcrImpedanciaZ1", '')
    formik.setFieldValue("mcrImpedanciaZ1Status", '')
    formik.setFieldValue("mcrImpedanciaZ2", '')
    formik.setFieldValue("mcrImpedanciaZ2Status", '')
    formik.setFieldValue("mcrImpedanciaZ3", '')
    formik.setFieldValue("mcrImpedanciaZ3Status", '')
    formik.setFieldValue("mcrAnguloFi1", '')
    formik.setFieldValue("mcrAnguloFi2", '')
    formik.setFieldValue("mcrAnguloFi3", '')
    formik.setFieldValue("mcrAnguloFi", '')
    formik.setFieldValue("mcrAnguloFiStatus", '')
    formik.setFieldValue("mcrAnguloIf1", '')
    formik.setFieldValue("mcrAnguloIf2", '')
    formik.setFieldValue("mcrAnguloIf3", '')
    formik.setFieldValue("mcrAnguloIf", '')
    formik.setFieldValue("mcrAnguloIfStatus", '')
    formik.setFieldValue("mcrResistencia", '')
    formik.setFieldValue("mcrResistenciaStatus", '')
    formik.setFieldValue("mcrDateInsert", '')
    formik.setFieldValue("mcrUserInsert", '')
    formik.setFieldValue("mcrImpedanciaL1", '')
    formik.setFieldValue("mcrImpedanciaL1Status", '')
    formik.setFieldValue("mcrImpedanciaL2", '')
    formik.setFieldValue("mcrImpedanciaL2Status", '')
    formik.setFieldValue("mcrImpedanciaL3", '')
    formik.setFieldValue("mcrImpedanciaL3Status", '')
    formik.setFieldValue("mcrNumeroOs", '')
    formik.setFieldValue("mcrFotoCompImpedancia", '')
    formik.setFieldValue("mcrFotoTendenciaAngulo", '')
    formik.setFieldValue("mcrFotoTendenciaIsolamento", '')

    
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
    entidadeService.deletar(entidade.mcrCodigo).then(response => {
        setDeleteDialog(false);  
        toast.current.show({ severity: 'success', summary: 'Deletado com sucesso!!', life: 3000 });
        getEntidades();
        
    })
}

const editEntidade = (entidade: McaRelatorio) => {

    /*Altera caption do botão para ALTERAR*/
    setMostraBotao(true);

    /* Campos do formulário*/

   

    formik.setFieldValue("mcrCodigo", entidade.mcrCodigo )
    formik.setFieldValue("mcrNumero", entidade.mcrNumero )
    formik.setFieldValue("mcrFalha", entidade.mcrFalha )
    formik.setFieldValue("mcrParecerTecnico", entidade.mcrParecerTecnico )
    formik.setFieldValue("mcrAcaoProposta", entidade.mcrAcaoProposta )
    formik.setFieldValue("mcrResistenciaFasesR1", entidade.mcrResistenciaFasesR1 )
    formik.setFieldValue("mcrResistenciaFasesR2", entidade.mcrResistenciaFasesR2 )
    formik.setFieldValue("mcrResistenciaFasesR3", entidade.mcrResistenciaFasesR3 )
    formik.setFieldValue("mcrResistenciaFasesR", entidade.mcrResistenciaFasesR )
    formik.setFieldValue("mcrResistenciaFasesStatus", entidade.mcrResistenciaFasesStatus )
    formik.setFieldValue("mcrImpedanciaZ1", entidade.mcrImpedanciaZ1 )
    formik.setFieldValue("mcrImpedanciaZ1Status", entidade.mcrImpedanciaZ1Status )
    formik.setFieldValue("mcrImpedanciaZ2", entidade.mcrImpedanciaZ2 )
    formik.setFieldValue("mcrImpedanciaZ2Status", entidade.mcrImpedanciaZ2Status )
    formik.setFieldValue("mcrImpedanciaZ3", entidade.mcrImpedanciaZ3 )
    formik.setFieldValue("mcrImpedanciaZ3Status", entidade.mcrImpedanciaZ3Status )
    formik.setFieldValue("mcrAnguloFi1", entidade.mcrAnguloFi1 )
    formik.setFieldValue("mcrAnguloFi2", entidade.mcrAnguloFi2 )
    formik.setFieldValue("mcrAnguloFi3", entidade.mcrAnguloFi3 )
    formik.setFieldValue("mcrAnguloFi", entidade.mcrAnguloFi )
    formik.setFieldValue("mcrAnguloFiStatus", entidade.mcrAnguloFiStatus )
    formik.setFieldValue("mcrAnguloIf1", entidade.mcrAnguloIf1 )
    formik.setFieldValue("mcrAnguloIf2", entidade.mcrAnguloFi2 )
    formik.setFieldValue("mcrAnguloIf3", entidade.mcrAnguloFi3 )
    formik.setFieldValue("mcrAnguloIf", entidade.mcrAnguloIf )
    formik.setFieldValue("mcrAnguloIfStatus", entidade.mcrAnguloIfStatus )
    formik.setFieldValue("mcrResistencia", entidade.mcrResistencia )
    formik.setFieldValue("mcrResistenciaStatus", entidade.mcrResistenciaStatus )
    formik.setFieldValue("mcrDateInsert", entidade.mcrDateInsert )
    formik.setFieldValue("mcrUserInsert", entidade.mcrUserInsert )
    formik.setFieldValue("mcrImpedanciaL1", entidade.mcrImpedanciaL1 )
    formik.setFieldValue("mcrImpedanciaL1Status", entidade.mcrImpedanciaL1Status )
    formik.setFieldValue("mcrImpedanciaL2", entidade.mcrImpedanciaL2 )
    formik.setFieldValue("mcrImpedanciaL2Status", entidade.mcrImpedanciaL2Status )
    formik.setFieldValue("mcrImpedanciaL3", entidade.mcrImpedanciaL3 )
    formik.setFieldValue("mcrImpedanciaL3Status", entidade.mcrImpedanciaL3Status )
    formik.setFieldValue("mcrNumeroOs", entidade.mcrNumeroOs )
    formik.setFieldValue("mcrFotoCompImpedancia", entidade.mcrFotoCompImpedancia )
    formik.setFieldValue("mcrFotoTendenciaAngulo", entidade.mcrFotoTendenciaAngulo )
    formik.setFieldValue("mcrFotoTendenciaIsolamento", entidade.mcrFotoTendenciaIsolamento )
    
    
    
}

const consultaEntidade = (entidade: McaRelatorio) => {

    setEntidade({...entidade})
    setEntidadeDialog(true);
    setMostraBotao(false);  
  
}

const confirmDelete = (entidade: React.SetStateAction<McaRelatorio>) => {
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
                <Button icon="pi pi-trash" className="p-button-danger mr-2 p-button-rounded" onClick={confirmDeleteSelected} disabled={!selectedMcaRelatorio || !selectedMcaRelatorio.length} tooltip="Delete" tooltipOptions={{position: 'bottom'}} />
                <Button icon="pi pi-upload" className="p-button-help p-button-rounded" onClick={exportCSV} tooltip="Export" tooltipOptions={{position: 'bottom'}} />
                <span className="p-input-icon-left w-full md:w-auto">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e: FormEvent<HTMLInputElement>) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." className="w-full lg:w-auto" />
                </span>
            </div>
        </div>
    );

    const actionBodyTemplate = (rowData: McaRelatorio) => {
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
        mcaMedicaoService.carregarByMedicao(e.value).then(mcaMedicao => setListaMcaMedicao(mcaMedicao))
    }

    const handleMcaMedicaoChange = (e: { value: any}) => {
        setMcaMedicao(e.value)
        formik.setFieldValue("mcaMedicao", e.value)
    }


   


    

    return (

        

                <div className="surface-card border-round shadow-2 p-4">
                        <span className="text-900 text-2xl font-medium mb-4 block">Cadatro de MCA Relatório:</span>
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
                                                <label style={{ color: "white" }} htmlFor="medicao">Medicao:*</label>
                                                <Dropdown 
                                                    style={{ width: "100%" }}
                                                    value={medicao} 
                                                    options={listaMedicao} 
                                                    onChange={handleMedicaoChange} 
                                                    optionLabel="medCodigo" 
                                                    placeholder="Selecione a Medicao" />

                                            </div> 
                                            <div className="col-6">
                                                <label style={{ color: "white" }} htmlFor="mcaMedicao">MCA Medicao: *</label>
                                                <Dropdown 
                                                    style={{ width: "100%" }}
                                                    value={mcaMedicao} 
                                                    options={listaMcaMedicao} 
                                                    onChange={handleMcaMedicaoChange} 
                                                    optionLabel="memCodigo" 
                                                    placeholder="Selecione a MCA Medicao" />

                                            </div> 

                                            <div className="col-2">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrCodigo">Codigo</label>
                                                        <InputText style={{ width: "100%" }}  disabled placeholder="Código McaRelatorio" id="mcrCodigo" name="mcrCodigo" value={formik.values.mcrCodigo} />

                                                    </span>

                                    
                                            </div>

                                            <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrAcaoProposta">Ação Proposta*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a Açao Proposta" id="mcrAcaoProposta" name="mcrAcaoProposta" value={formik.values.mcrAcaoProposta}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.mcrAcaoProposta}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrAnguloFi1">Amgulo Fi1*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite o Angulo Fi1" id="mcrAnguloFi1" name="mcrAnguloFi1" value={formik.values.mcrAnguloFi1}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.mcrAnguloFi1}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrAnguloFi2">Amgulo Fi2*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite o Angulo Fi2" id="mcrAnguloFi2" name="mcrAnguloFi2" value={formik.values.mcrAnguloFi2}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.mcrAnguloFi2}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrAnguloFi3">Amgulo Fi3*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite o Angulo Fi3" id="mcrAnguloFi3" name="mcrAnguloFi3" value={formik.values.mcrAnguloFi3}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.mcrAnguloFi3}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrAnguloFi">Amgulo Fi*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite o Angulo Fi" id="mcrAnguloFi" name="mcrAnguloFi" value={formik.values.mcrAnguloFi}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.mcrAnguloFi}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrAnguloFiStatus">Amgulo FiStatus*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite o Angulo FiStatus" id="mcrAnguloFiStatus" name="mcrAnguloFiStatus" value={formik.values.mcrAnguloFiStatus}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.mcrAnguloFiStatus}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrAnguloIf1">Amgulo If1*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite o Angulo If1" id="mcrAnguloIf1" name="mcrAnguloIf1" value={formik.values.mcrAnguloIf1}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.mcrAnguloIf1}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrAnguloIf2">Amgulo If2*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite o Angulo If2" id="mcrAnguloIf2" name="mcrAnguloIf2" value={formik.values.mcrAnguloIf2}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.mcrAnguloIf2}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrAnguloIf3">Amgulo If3*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite o Angulo If3" id="mcrAnguloIf3" name="mcrAnguloIf3" value={formik.values.mcrAnguloIf3}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.mcrAnguloIf3}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrAnguloIf">Amgulo If*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite o Angulo If" id="mcrAnguloIf" name="mcrAnguloIf" value={formik.values.mcrAnguloIf}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.mcrAnguloIf}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrAnguloIfStatus">Amgulo IfStatus*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite o Angulo IfStatus" id="mcrAnguloIfStatus" name="mcrAnguloIfStatus" value={formik.values.mcrAnguloIfStatus}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.mcrAnguloIfStatus}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrDateInsert">Data Insert*</label><br></br>
                                                        <Calendar  id="mcrDateInsert" name="mcrDateInsert" value={date1} onChange={formik.handleChange} dateFormat="dd/mm/yy" mask="99/99/9999" showIcon onBlur={formik.handleBlur}/>
                                
                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.mcrDateInsert}
                                                    </small>
                                            </div>

                                            <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrFalha">Falha*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a Falha" id="mcrFalha" name="mcrFalha" value={formik.values.mcrFalha}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.mcrFalha}
                                                    </small>

                                                    
                                           </div>

                                           
                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrImpedanciaL1">ImpedanciaL1*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a ImpedanciaL1" id="mcrImpedanciaL1" name="mcrImpedanciaL1" value={formik.values.mcrImpedanciaL1}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.mcrImpedanciaL1}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrImpedanciaL1Status">ImpedanciaL1 Status*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a ImpedanciaL1 Status" id="mcrImpedanciaL1Status" name="mcrImpedanciaL1Status" value={formik.values.mcrImpedanciaL1Status}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.mcrImpedanciaL1Status}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrImpedanciaL2">ImpedanciaL2*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a ImpedanciaL2" id="mcrImpedanciaL2" name="mcrImpedanciaL2" value={formik.values.mcrImpedanciaL2}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.mcrImpedanciaL2}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrImpedanciaL2Status">ImpedanciaL2 Status*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a ImpedanciaL2 Status" id="mcrImpedanciaL2Status" name="mcrImpedanciaL2Status" value={formik.values.mcrImpedanciaL2Status}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.mcrImpedanciaL2Status}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrImpedanciaL3">ImpedanciaL3*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a ImpedanciaL3" id="mcrImpedanciaL3" name="mcrImpedanciaL3" value={formik.values.mcrImpedanciaL3}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.mcrImpedanciaL3}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrImpedanciaL3Status">ImpedanciaL3 Status*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a ImpedanciaL3 Status" id="mcrImpedanciaL3Status" name="mcrImpedanciaL3Status" value={formik.values.mcrImpedanciaL3Status}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.mcrImpedanciaL3Status}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrImpedanciaZ1">ImpedanciaZ1*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a ImpedanciaZ1" id="mcrImpedanciaZ1" name="mcrImpedanciaZ1" value={formik.values.mcrImpedanciaZ1}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.mcrImpedanciaZ1}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrImpedanciaZ1Status">ImpedanciaZ1 Status*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a ImpedanciaZ1 Status" id="mcrImpedanciaZ1Status" name="mcrImpedanciaZ1Status" value={formik.values.mcrImpedanciaZ1Status}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.mcrImpedanciaZ1Status}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrImpedanciaZ2">ImpedanciaZ2*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a ImpedanciaZ2" id="mcrImpedanciaZ2" name="mcrImpedanciaZ2" value={formik.values.mcrImpedanciaZ2}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.mcrImpedanciaZ2}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrImpedanciaZ2Status">ImpedanciaZ2 Status*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a ImpedanciaZ2 Status" id="mcrImpedanciaZ2Status" name="mcrImpedanciaZ2Status" value={formik.values.mcrImpedanciaZ2Status}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.mcrImpedanciaZ2Status}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrImpedanciaZ3">ImpedanciaZ3*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a ImpedanciaZ3" id="mcrImpedanciaZ3" name="mcrImpedanciaZ3" value={formik.values.mcrImpedanciaZ3}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.mcrImpedanciaZ3}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrImpedanciaZ3Status">ImpedanciaZ3 Status*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a ImpedanciaZ3 Status" id="mcrImpedanciaZ3Status" name="mcrImpedanciaZ3Status" value={formik.values.mcrImpedanciaZ3Status}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.mcrImpedanciaZ3Status}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrNumero">Número*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite o Número" id="mcrNumero" name="mcrNumero" value={formik.values.mcrNumero}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.mcrNumero}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrNumeroOs">Número OS*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite o Número OS" id="mcrNumeroOs" name="mcrNumeroOs" value={formik.values.mcrNumeroOs}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.mcrNumeroOs}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrParecerTecnico">Parecer Técnico*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite o Parecer Técnico" id="mcrParecerTecnico" name="mcrParecerTecnico" value={formik.values.mcrParecerTecnico}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.mcrParecerTecnico}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrResistencia">Resistência*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a Resistência" id="mcrResistencia" name="mcrResistencia" value={formik.values.mcrResistencia}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.mcrResistencia}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrResistenciaStatus">Resistência Status*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a Resistência Status" id="mcrResistenciaStatus" name="mcrResistenciaStatus" value={formik.values.mcrResistenciaStatus}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.mcrResistenciaStatus}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrResistenciaFasesR">Resistência FasesR*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a Resistência FasesR" id="mcrResistenciaFasesR" name="mcrResistenciaFasesR" value={formik.values.mcrResistenciaFasesR}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.mcrResistenciaFasesR}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrResistenciaFasesR1">Resistência FasesR1*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a Resistência FasesR1" id="mcrResistenciaFasesR1" name="mcrResistenciaFasesR1" value={formik.values.mcrResistenciaFasesR1}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.mcrResistenciaFasesR1}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrResistenciaFasesR2">Resistência FasesR2*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a Resistência FasesR2" id="mcrResistenciaFasesR2" name="mcrResistenciaFasesR2" value={formik.values.mcrResistenciaFasesR2}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.mcrResistenciaFasesR2}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrResistenciaFasesR3">Resistência FasesR3*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a Resistência FasesR3" id="mcrResistenciaFasesR3" name="mcrResistenciaFasesR3" value={formik.values.mcrResistenciaFasesR3}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.mcrResistenciaFasesR3}
                                                    </small>

                                                    
                                           </div>

                                           

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrResistenciaFasesStatus">Resistência Fases Status*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a Resistência Fases Status" id="mcrResistenciaFasesStatus" name="mcrResistenciaFasesStatus" value={formik.values.mcrResistenciaFasesStatus}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.mcrResistenciaFasesStatus}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrUserInsert">Usuário*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite o Usuário" id="mcrUserInsert" name="mcrUserInsert" value={formik.values.mcrUserInsert}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.mcrUserInsert}
                                                    </small>

                                                    
                                           </div>

                                           

                                            

                                            
                                    </div>

                                    {!mostraBotao &&
                                        <Button type="button" label="Salvar" icon="pi pi-check" onClick={salvar}/>
                                    } {mostraBotao &&
                                        <Button  type="button" label="Alterar" icon="pi pi-check" onClick={alterar}/>
                                    } 
                                

                                
                        <div>

                            <DataTable ref={dt} value={entidades} selection={selectedMcaRelatorio} onSelectionChange={(e) => setSelectedMcaRelatorio(e.value)}
                                dataKey="mcrCodigo" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Histórico Componentes"
                                globalFilter={globalFilter}  header={header} responsiveLayout="stack">
                                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                                <Column field="mcrCodigo" header="Código" sortable style={{ minWidth: '12rem' }}></Column>
                                <Column field="mcrUserInsert" header="Usuário" sortable style={{ minWidth: '12rem' }}></Column>
                                <Column field="mcaMedicao.memCodigo" header="MCA Medicao" sortable style={{ minWidth: '10rem' }}></Column>
                                <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                                
                            </DataTable>

                        </div>

                        <Dialog visible={entidadeDialog} breakpoints={{'960px': '75vw', '640px': '100vw'}} style={{width: '40vw'}} header="Cadastro de Medição" modal className="p-fluid" footer={entidadeDialog} onHide={hideDialog}>
             
                                <div className="col-2">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrCodigo">Codigo</label>
                                                        <InputText style={{ width: "100%" }}  disabled placeholder="Código McaRelatorio" id="mcrCodigo" name="mcrCodigo" value={entidade?.mcrCodigo} />

                                                    </span>

                                    
                                            </div>

                                            <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrAcaoProposta">Ação Proposta*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a Açao Proposta" id="mcrAcaoProposta" name="mcrAcaoProposta" disabled value={entidade?.mcrAcaoProposta}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                   
                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrAnguloFi1">Amgulo Fi1*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite o Angulo Fi1" id="mcrAnguloFi1" name="mcrAnguloFi1" disabled value={entidade?.mcrAnguloFi1}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrAnguloFi2">Amgulo Fi2*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite o Angulo Fi2" id="mcrAnguloFi2" name="mcrAnguloFi2" disabled value={entidade?.mcrAnguloFi2}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                   
                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrAnguloFi3">Amgulo Fi3*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite o Angulo Fi3" id="mcrAnguloFi3" name="mcrAnguloFi3" disabled value={entidade?.mcrAnguloFi3}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                   

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrAnguloFi">Amgulo Fi*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite o Angulo Fi" id="mcrAnguloFi" name="mcrAnguloFi" disabled value={entidade?.mcrAnguloFi}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                   

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrAnguloFiStatus">Amgulo FiStatus*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite o Angulo FiStatus" id="mcrAnguloFiStatus" name="mcrAnguloFiStatus" disabled value={entidade?.mcrAnguloFiStatus}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrAnguloIf1">Amgulo If1*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite o Angulo If1" id="mcrAnguloIf1" name="mcrAnguloIf1" disabled value={entidade?.mcrAnguloIf1}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                  
                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrAnguloIf2">Amgulo If2*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite o Angulo If2" id="mcrAnguloIf2" name="mcrAnguloIf2" disabled value={entidade?.mcrAnguloIf2}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrAnguloIf3">Amgulo If3*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite o Angulo If3" id="mcrAnguloIf3" name="mcrAnguloIf3" disabled value={entidade?.mcrAnguloIf3}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    
                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrAnguloIf">Amgulo If*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite o Angulo If" id="mcrAnguloIf" name="mcrAnguloIf" disabled value={entidade?.mcrAnguloIf}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    
                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrAnguloIfStatus">Amgulo IfStatus*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite o Angulo IfStatus" id="mcrAnguloIfStatus" name="mcrAnguloIfStatus" disabled value={entidade?.mcrAnguloIfStatus}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                  
                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrDateInsert">Data Insert*</label><br></br>
                                                        <Calendar  id="mcrDateInsert" name="mcrDateInsert" value={date1} onChange={formik.handleChange} dateFormat="dd/mm/yy" mask="99/99/9999" showIcon onBlur={formik.handleBlur}/>
                                
                                                    </span>

                                                    
                                            </div>

                                            <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrFalha">Falha*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a Falha" id="mcrFalha" name="mcrFalha" disabled value={entidade?.mcrFalha}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrFotoCompImpedancia">Foto CompImpedancia*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a Foto CompImpedancia" id="mcrFotoCompImpedancia" name="mcrFotoCompImpedancia" disabled value={entidade?.mcrFotoCompImpedancia}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                   
                                                   

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrFotoTendenciaAngulo">Foto TendenciaAngulo*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a Foto TendenciaAngulo" id="mcrFotoTendenciaAngulo" name="mcrFotoTendenciaAngulo" disabled value={entidade?.mcrFotoTendenciaAngulo}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                   

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrFotoTendenciaIsolamento">Foto TendenciaIsolamento*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a Foto TendenciaIsolamento" id="mcrFotoTendenciaIsolamento" name="mcrFotoTendenciaIsolamento" disabled value={entidade?.mcrFotoTendenciaIsolamento}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    
                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrImpedanciaL1">ImpedanciaL1*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a ImpedanciaL1" id="mcrImpedanciaL1" name="mcrImpedanciaL1" disabled value={entidade?.mcrImpedanciaL1}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrImpedanciaL1Status">ImpedanciaL1 Status*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a ImpedanciaL1 Status" id="mcrImpedanciaL1Status" name="mcrImpedanciaL1Status" disabled value={entidade?.mcrImpedanciaL1Status}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrImpedanciaL2">ImpedanciaL2*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a ImpedanciaL2" id="mcrImpedanciaL2" name="mcrImpedanciaL2" disabled value={entidade?.mcrImpedanciaL2}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    
                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrImpedanciaL2Status">ImpedanciaL2 Status*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a ImpedanciaL2 Status" id="mcrImpedanciaL2Status" name="mcrImpedanciaL2Status" disabled value={entidade?.mcrImpedanciaL2Status}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                   

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrImpedanciaL3">ImpedanciaL3*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a ImpedanciaL3" id="mcrImpedanciaL3" name="mcrImpedanciaL3" disabled value={entidade?.mcrImpedanciaL3}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrImpedanciaL3Status">ImpedanciaL3 Status*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a ImpedanciaL3 Status" id="mcrImpedanciaL3Status" name="mcrImpedanciaL3Status" disabled value={entidade?.mcrImpedanciaL3Status}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrImpedanciaZ1">ImpedanciaZ1*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a ImpedanciaZ1" id="mcrImpedanciaZ1" name="mcrImpedanciaZ1" disabled value={entidade?.mcrImpedanciaZ1}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrImpedanciaZ1Status">ImpedanciaZ1 Status*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a ImpedanciaZ1 Status" id="mcrImpedanciaZ1Status" name="mcrImpedanciaZ1Status" disabled value={entidade?.mcrImpedanciaZ1Status}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                  

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrImpedanciaZ2">ImpedanciaZ2*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a ImpedanciaZ2" id="mcrImpedanciaZ2" name="mcrImpedanciaZ2" disabled value={entidade?.mcrImpedanciaZ2}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                   
                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrImpedanciaZ2Status">ImpedanciaZ2 Status*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a ImpedanciaZ2 Status" id="mcrImpedanciaZ2Status" name="mcrImpedanciaZ2Status" disabled value={entidade?.mcrImpedanciaZ2Status}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrImpedanciaZ3">ImpedanciaZ3*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a ImpedanciaZ3" id="mcrImpedanciaZ3" name="mcrImpedanciaZ3" disabled value={entidade?.mcrImpedanciaZ3}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                   

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrImpedanciaZ3Status">ImpedanciaZ3 Status*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a ImpedanciaZ3 Status" id="mcrImpedanciaZ3Status" name="mcrImpedanciaZ3Status" disabled value={entidade?.mcrImpedanciaZ3Status}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrNumero">Número*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite o Número" id="mcrNumero" name="mcrNumero" disabled value={entidade?.mcrNumero}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrNumeroOs">Número OS*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite o Número OS" id="mcrNumeroOs" name="mcrNumeroOs" disabled value={entidade?.mcrNumeroOs}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                   

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrParecerTecnico">Parecer Técnico*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite o Parecer Técnico" id="mcrParecerTecnico" name="mcrParecerTecnico" disabled value={entidade?.mcrParecerTecnico}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                   
                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrResistencia">Resistência*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a Resistência" id="mcrResistencia" name="mcrResistencia" disabled value={entidade?.mcrResistencia}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                   

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrResistenciaStatus">Resistência Status*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a Resistência Status" id="mcrResistenciaStatus" name="mcrResistenciaStatus" disabled value={entidade?.mcrResistenciaStatus}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.mcrResistenciaStatus}
                                                    </small>

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrResistenciaFasesR">Resistência FasesR*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a Resistência FasesR" id="mcrResistenciaFasesR" name="mcrResistenciaFasesR" disabled value={entidade?.mcrResistenciaFasesR}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                  

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrResistenciaFasesR1">Resistência FasesR1*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a Resistência FasesR1" id="mcrResistenciaFasesR1" name="mcrResistenciaFasesR1" disabled value={entidade?.mcrResistenciaFasesR1}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                 

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrResistenciaFasesR2">Resistência FasesR2*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a Resistência FasesR2" id="mcrResistenciaFasesR2" name="mcrResistenciaFasesR2" disabled value={entidade?.mcrResistenciaFasesR2}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                   

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrResistenciaFasesR3">Resistência FasesR3*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a Resistência FasesR3" id="mcrResistenciaFasesR3" name="mcrResistenciaFasesR3" disabled value={entidade?.mcrResistenciaFasesR3}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    
                                           </div>

                                           

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrResistenciaFasesStatus">Resistência Fases Status*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite a Resistência Fases Status" id="mcrResistenciaFasesStatus" name="mcrResistenciaFasesStatus" disabled value={entidade?.mcrResistenciaFasesStatus}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                  

                                                    
                                           </div>

                                           <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="mcrUserInsert">Usuário*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite o Usuário" id="mcrUserInsert" name="mcrUserInsert" disabled value={entidade?.mcrUserInsert}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                   

                                                    
                                           </div>

                                                
                        </Dialog>

                        <Dialog visible={deleteDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteDialogFooter} onHide={hideDeleteDialog}>
                            <div className="flex align-items-center justify-content-center">
                                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                                {entidade && <span>Tem certeza que quer deletar? <b>{entidade.mcrCodigo}</b>?</span>}
                            </div>
                        </Dialog>

                


                </form>
                
            </div>
       
    );
}