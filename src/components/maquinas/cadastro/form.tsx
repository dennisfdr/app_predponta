
import { useFormik } from 'formik'
import { 
    AutoComplete, 
    AutoCompleteChangeParams, 
    AutoCompleteCompleteMethodParams 
} from 'primereact/autocomplete'
import { FormEvent, useEffect, useRef, useState } from 'react'


import { useEmpresaService, useMaquinaService } from 'app/services'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Dialog } from 'primereact/dialog'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Dropdown } from 'primereact/dropdown'
import { validationScheme } from './validationScheme'
import { Maquina } from 'app/model/maquinas'
import { Empresa, Setor } from 'app/model/empresas'
import React from 'react'
import useSWR from 'swr'
import { AxiosResponse } from 'axios'
import { httpClient } from 'app/http'
import { getEnvironmentData } from 'worker_threads'
import { Checkbox } from 'primereact/checkbox'
import { Toast } from 'primereact/toast'
import { TabPanel, TabView } from 'primereact/tabview'



interface MaquinaFormProps {
    onSubmit: (maquina: Maquina) => void;
   
}

const formScheme: Maquina = {
    maqCodigo:'',
    maqNome: '',
    maqAndar: '',
    maqStatus: null,
    setor: null
}

export const MaquinaForm: React.FC<MaquinaFormProps> = ({
    onSubmit,
   
}) => {

    
    const maquinaService = useMaquinaService();
    const empresaService = useEmpresaService();
    
    const [ listaEmpresas, setListaEmpresas ] = useState<Empresa[]>([])
    const [ mensagem, setMensagem] = useState<string>('')
    const [ maquina, setMaquina ] = useState<Maquina>(null);
    const [ empresa, setEmpresa] = useState<Empresa>(null);
    const [ listaSetor, setListaSetor] = useState<Setor[]>([])

    const [globalFilter, setGlobalFilter] = useState<string>();
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable>(null);

    const [selectedMaquinas, setSelectedMaquinas] = useState<Maquina[]>([]);
    const [ maquinas, setMaquinas ] = useState<Maquina[]>([]);

    const [deleteEmpresasDialog, setDeleteEmpresasDialog] = useState(false);

     /* Ativação das TabView */
   const [activeIndex1, setActiveIndex1] = useState(0);

    

    const formik = useFormik<Maquina>({
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

    /*Carregando Máquinas*/  

    const { data: result, error } = useSWR<AxiosResponse<Maquina[]>>
    ('/maquinas', url => httpClient.get(url) )


    useEffect( () => {
        setMaquinas(result?.data || [])
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
                <Button icon="pi pi-trash" className="p-button-danger mr-2 p-button-rounded" onClick={confirmDeleteSelected} disabled={!selectedMaquinas || !selectedMaquinas.length} tooltip="Delete" tooltipOptions={{position: 'bottom'}} />
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
        formik.setFieldValue("setor", e.value)
    }


   


    

    return (

        <div className="tabview-demo">
            <div className="card"></div>

                <div className="surface-card border-round shadow-2 p-4">
                        <span className="text-900 text-2xl font-medium mb-4 block">Cadatro de Máquinas:</span>
                        <form onSubmit={formik.handleSubmit}>

                            <TabView activeIndex={activeIndex1} onTabChange={(e) => setActiveIndex1(e.index)}>
                                <TabPanel header="Dados da Máquina">
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
                                                    value={formik.values.setor} 
                                                    options={listaSetor} 
                                                    onChange={handleSetorChange} 
                                                    optionLabel="setNome" 
                                                    placeholder="Selecione o Setor" />

                                            </div> 

                                            <div className="col-2">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="maqCodigo">Codigo</label>
                                                        <InputText style={{ width: "100%" }}  disabled placeholder="Código da maquina" id="maqCodigo" name="maqCodigo" value={formik.values.maqCodigo} />

                                                    </span>

                                    
                                            </div>

                                            <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="maqNome">Nome*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite nome da maquina" id="maqNome" name="maqNome" value={formik.values.maqNome}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.maqNome}
                                                    </small>
                                            </div>

                                            <div className="col-4">

                                                    <span className="ml-2">
                                                        <label style={{ color: "white" }} htmlFor="maqAndar">Andar*</label>
                                                        <InputText style={{ width: "100%" }}  placeholder="Digite o Andar da Máquina" id="maqAndar" name="maqAndar" value={formik.values.maqAndar}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                                    </span>

                                                    <small className="p-error p-d-block">
                                                        {formik.touched && formik.errors.maqAndar}
                                                    </small>
                                            </div>

                                            <div className="col-2">
                                                        <span className="ml-2">
                                                            <label style={{ color: "white" }} htmlFor="maqStatus">Ativa: *</label><br></br>
                                                            <Checkbox inputId="maqStatus" name="maqStatus" checked={formik.values.maqStatus} onChange={formik.handleChange} />

                                                        </span>

                                            </div>
                                    </div>

                                    <Button  type="submit" label="Salvar" icon="pi pi-check" />
                                </TabPanel>

                                <TabPanel header="Máquina-Equipamento">

                                    <div className="col-2">

                                        <span className="ml-2">
                                            <label style={{ color: "white" }} htmlFor="maeCodigo">Codigo</label>
                                            <InputText style={{ width: "100%" }}  disabled placeholder="Código Maq-Equipamento" id="maeCodigo" name="maeCodigo" value={formik.values.maqCodigo} />

                                        </span>


                                    </div>

                                    <div className="col-4">

                                    <span className="ml-2">
                                        <label style={{ color: "white" }} htmlFor="maeNome">Nome*</label>
                                        <InputText style={{ width: "100%" }}  placeholder="Digite nome da Máquina-Equipamento" id="maeNome" name="maeNome" value={formik.values.maqNome}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                    </span>

                                    <small className="p-error p-d-block">
                                        {formik.touched && formik.errors.maqNome}
                                    </small>
                                    </div>

                                    <div className="col-4">

                                    <span className="ml-2">
                                        <label style={{ color: "white" }} htmlFor="maeTag">TAG*</label>
                                        <InputText style={{ width: "100%" }}  placeholder="Digite a Tag da Máquina-Equipamento" id="maeTag" name="maeTag" value={formik.values.maqAndar}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                    </span>

                                    <small className="p-error p-d-block">
                                        {formik.touched && formik.errors.maqAndar}
                                    </small>
                                    </div>

                                    <div className="col-2">
                                        <span className="ml-2">
                                            <label style={{ color: "white" }} htmlFor="maeStatus">Ativa: *</label><br></br>
                                            <Checkbox inputId="maeStatus" name="maeStatus" checked={formik.values.maqStatus} onChange={formik.handleChange} />

                                        </span>

                                    </div>
                                    

                                    <Button  type="submit" label="Salvar" icon="pi pi-check" />


                                </TabPanel>

                                

                                <TabPanel header="Componente">

                                    <div className="col-2">

                                    <span className="ml-2">
                                        <label style={{ color: "white" }} htmlFor="comCodigo">Codigo</label>
                                        <InputText style={{ width: "100%" }}  disabled placeholder="Código Componente" id="comCodigo" name="comCodigo" value={formik.values.maqCodigo} />

                                    </span>


                                    </div>

                                    <div className="col-4">

                                    <span className="ml-2">
                                    <label style={{ color: "white" }} htmlFor="comNome">Nome*</label>
                                    <InputText style={{ width: "100%" }}  placeholder="Digite nome do Componente" id="comNome" name="comNome" value={formik.values.maqNome}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                    </span>

                                    <small className="p-error p-d-block">
                                    {formik.touched && formik.errors.maqNome}
                                    </small>
                                    </div>

                                    

                                    <div className="col-2">
                                    <span className="ml-2">
                                        <label style={{ color: "white" }} htmlFor="comStatus">Ativo: *</label><br></br>
                                        <Checkbox inputId="comStatus" name="comStatus" checked={formik.values.maqStatus} onChange={formik.handleChange} />

                                    </span>

                                    </div>


                                    <Button  type="submit" label="Salvar" icon="pi pi-check" />


                                </TabPanel>

                                <TabPanel header="Componente-Peça">

                                    <div className="col-2">

                                    <span className="ml-2">
                                        <label style={{ color: "white" }} htmlFor="copCodigo">Codigo</label>
                                        <InputText style={{ width: "100%" }}  disabled placeholder="Código Componente-Peça" id="copCodigo" name="copCodigo" value={formik.values.maqCodigo} />

                                    </span>


                                    </div>

                                    <div className="col-4">

                                    <span className="ml-2">
                                    <label style={{ color: "white" }} htmlFor="copDescricao">Descrição*</label>
                                    <InputText style={{ width: "100%" }}  placeholder="Digite a descrição do Componente-Peça" id="copDescricao" name="copDescricao" value={formik.values.maqNome}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                    </span>

                                    <small className="p-error p-d-block">
                                    {formik.touched && formik.errors.maqNome}
                                    </small>
                                    </div>



                                    <div className="col-2">
                                    <span className="ml-2">
                                        <label style={{ color: "white" }} htmlFor="copStatus">Ativo: *</label><br></br>
                                        <Checkbox inputId="copStatus" name="copStatus" checked={formik.values.maqStatus} onChange={formik.handleChange} />

                                    </span>

                                    </div>


                                    <Button  type="submit" label="Salvar" icon="pi pi-check" />


                                </TabPanel>


                                <TabPanel header="Sub-Componente">

                                    <div className="col-2">

                                    <span className="ml-2">
                                        <label style={{ color: "white" }} htmlFor="scoCodigo">Codigo</label>
                                        <InputText style={{ width: "100%" }}  disabled placeholder="Código Sub-Componente" id="scoCodigo" name="scoCodigo" value={formik.values.maqCodigo} />

                                    </span>


                                    </div>

                                    <div className="col-4">

                                    <span className="ml-2">
                                    <label style={{ color: "white" }} htmlFor="scoNome">Nome*</label>
                                    <InputText style={{ width: "100%" }}  placeholder="Digite nome do Sub-Componente" id="scoNome" name="scoNome" value={formik.values.maqNome}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                    </span>

                                    <small className="p-error p-d-block">
                                    {formik.touched && formik.errors.maqNome}
                                    </small>
                                    </div>



                                    <div className="col-2">
                                    <span className="ml-2">
                                        <label style={{ color: "white" }} htmlFor="scoStatus">Ativo: *</label><br></br>
                                        <Checkbox inputId="scoStatus" name="scoStatus" checked={formik.values.maqStatus} onChange={formik.handleChange} />

                                    </span>

                                    </div>


                                    <Button  type="submit" label="Salvar" icon="pi pi-check" />


                                </TabPanel>

                                <TabPanel header="Componente-Subcomponente">

                                    <div className="col-2">

                                    <span className="ml-2">
                                        <label style={{ color: "white" }} htmlFor="cscCodigo">Codigo</label>
                                        <InputText style={{ width: "100%" }}  disabled placeholder="Código Componente-Subcomponente" id="cscCodigo" name="cscCodigo" value={formik.values.maqCodigo} />

                                    </span>


                                    </div>

                                    <div className="col-4">

                                    <span className="ml-2">
                                    <label style={{ color: "white" }} htmlFor="cscDescricao">Descrição*</label>
                                    <InputText style={{ width: "100%" }}  placeholder="Digite a descrição do Componente-Subcomponente" id="cscDescricao" name="cscDescricao" value={formik.values.maqNome}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                    </span>

                                    </div>


                                    <Button  type="submit" label="Salvar" icon="pi pi-check" />


                                </TabPanel>
                            
                            
                            
                            
                            </TabView>      
                    
                        
                        <div>

                            <DataTable ref={dt} value={maquinas} selection={selectedMaquinas} onSelectionChange={(e) => setSelectedMaquinas(e.value)}
                                dataKey="maqCodigo" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} maquinas"
                                globalFilter={globalFilter}  header={header} responsiveLayout="stack">
                                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                                <Column field="maqCodigo" header="Código" sortable style={{ minWidth: '12rem' }}></Column>
                                <Column field="maqNome" header="Nome" sortable style={{ minWidth: '16rem' }}></Column>         
                                <Column field="maqAndar" header="Andar" sortable style={{ minWidth: '10rem' }}></Column>
                                <Column field="maqStatus" header="Ativa" sortable style={{ minWidth: '10rem' }}></Column>
                                <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                                
                            </DataTable>

                        </div>

                


                </form>
                
            </div>
        </div>
    );
}