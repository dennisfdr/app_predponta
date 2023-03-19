import { Empresa } from "app/model/empresas";
import { useFormik } from "formik";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { FormEvent, useEffect, useRef, useState } from "react";
import { InputNumber } from 'primereact/inputnumber';
import { TabView, TabPanel } from 'primereact/tabview';




import Image from 'next/image'


import 'bootstrap/dist/css/bootstrap.min.css';
import * as Yup from 'yup'
import { Toast } from "primereact/toast";
import React from "react";
import { FileUpload } from 'primereact/fileupload';
import { InputMask } from 'primereact/inputmask';

import { useEmpresaService } from 'app/services'
import { Alert } from "components/common/message";
import internal from "stream";
import { httpClient } from 'app/http';
import { AxiosResponse } from 'axios';
import useSWR from 'swr';


import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { Dialog } from "primereact/dialog";
import { getEnvironmentData } from "worker_threads";
import Link from "next/link";




interface EmpresaFormProps {

   
   
    empresaSalvo : Empresa;
    onSubmit: (empresa: Empresa) => void;

}

const formScheme: Empresa = {
    empCodigo: '',
    empNome: '',
    empStatus: '',
    empProxMedicaoIt:'',
    empProxMedicaoRi:'',
    empProxMedicaoMca:'',
    createdAt: '',
    updateAt: '',
    empPeriodicidadeIt: '',
    empPeriodicidadeRi: '',
    empPeriodicidadeMca: '',
   
    
    
    
}

export const EmpresaForm: React.FC<EmpresaFormProps> = ({
    empresaSalvo,
    onSubmit

}) => {

    

    
    //Usando para cadastro de email
    const [ emailVisao, setEmailVisao ] = useState<string>('');
    const [ responsavelVisao, setResponsavelVisao ] = useState<string>('');

    //Usando no Calender
    const [ date1, setAlteraData1 ] = useState<Date | Date[] | undefined>(undefined);
    const [ date2, setAlteraData2 ] = useState<Date | Date[] | undefined>(undefined);
    const [ date3, setAlteraData3 ] = useState<Date | Date[] | undefined>(undefined);

    //Usando na imagem
    const [ aruDescricaoVisao, setAruDescricaoVisao ] = useState<string>('');
    const [ aruDataVisao, setAruDataVisao ] = useState<Date | Date[] | undefined>(undefined);
    const [ aruArquivoVisao, setAruArquivoVisao] = useState(null);

    //Usando no Setor
    const [ nomeSetorVisao, setNomeSetorVisao ] = useState<string>('');
    const [ statusSetorVisao, setStatusSetorVisao ] = useState<boolean>(false);


    
    const [submitted, setSubmitted] = useState(false);

    const [globalFilter, setGlobalFilter] = useState<string>();
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable>(null);
    const [selectedEmpresas, setSelectedEmpresas] = useState<Empresa[]>([]);
    const [ image, setImage] = useState<string>();
    const [empresaDialog, setEmpresaDialog] = useState(false);
    const [deleteEmpresaDialog, setDeleteEmpresaDialog] = useState(false);
    const [deleteEmpresasDialog, setDeleteEmpresasDialog] = useState(false);

    const [images, setImages] = useState([])
    const [imageURLS, setImageURLS] = useState([])
    const [tag, setTag] = useState(null)
    const [ index, setIndex] = useState(0);
    const service = useEmpresaService();
    const [ empresa, setEmpresa ] = useState<Empresa>();
    const [ empresaSalvo1, setEmpresaSalvo ] = useState<Empresa>();
    


    const [ empresas, setEmpresas ] = useState<Empresa[]>([]);

   
   


    /* Ativação das TabView */
   const [activeIndex1, setActiveIndex1] = useState(0);

   const [mostraBotao, setMostraBotao] = useState(false);
   const [deleteDialog, setDeleteDialog] = useState(false);
  
  
    

   
    const formik = useFormik<Empresa>({         
      initialValues: formScheme,
      onSubmit,
      
     
        validationSchema: Yup.object({
            empNome: Yup.string().trim().required("Campo obrigatório."),
           
            empProxMedicaoIt: Yup.string().trim().required("Campo obrigatório."),
            empProxMedicaoRi:Yup.string().trim().required("Campo obrigatório."),
            empProxMedicaoMca:Yup.string().trim().required("Campo obrigatório."),
            empPeriodicidadeIt: Yup
            .number()
            .required("O campo é obrigatório.")
            .positive("O campo deve ser positivo.")
            .integer("O campo deve ser um número inteiro."),
            empPeriodicidadeRi: Yup.string().trim().required("Campo obrigatório."),
            empPeriodicidadeMca: Yup.string().trim().required("Campo obrigatório."),
            
        }),
        
    })

    /* Limpar formulário*/ 
    const limparFormulario = () => {

        formik.setFieldValue("empCodigo", '')
        formik.setFieldValue("empNome", '')
        formik.setFieldValue("empStatus", '')
        formik.setFieldValue("empProxMedicaoIt", '')
        formik.setFieldValue("empProxMedicaoRi", '')
        formik.setFieldValue("empProxMedicaoMca", '')
        formik.setFieldValue("createdAt", '')
        formik.setFieldValue("updateAt", '')
        formik.setFieldValue("empPeriodicidadeIt", '')
        formik.setFieldValue("empPeriodicidadeRi", '')
        formik.setFieldValue("empPeriodicidadeMca", '')

    }

    /* Métodos do CRUD (listar, gravar, editar)*/
    
    const getData = () => {
        service.listar().then(response => setEmpresas(response))
      }; 
    
      useEffect(() => { 
       
        getData();
        
      }, []); 

     
    
    const salvar = () => { 
        service.salvar(formik.values).then(response => {
            setEmpresa(response); 
            setEmpresas((state) => [...state, { ...response }]);  
            setEmpresaSalvo(response)
            
            toast.current.show({ severity: 'success', summary: 'Cadastro com sucesso', life: 3000 });
            
           
            /*Limpando formulário*/
            limparFormulario();
            getData();
        })       
    }

    const alterar = async () =>  {
        service.atualizar(formik.values).then(response => {
            toast.current.show({ severity: 'success', summary: 'Alerado  com sucesso', life: 3000 });
            /*Limpando formulário*/
            limparFormulario();
            /*Alterando Caption Botão*/
            setMostraBotao(false);

            getData()
        })
    }

    const deletar = async () =>  {
            service.deletar(empresa.empCodigo).then(response => {
            setDeleteDialog(false);  
            toast.current.show({ severity: 'success', summary: 'Deletado com sucesso!!', life: 3000 });
            getData()
            
        })
    }

    
    const hideDialog = () => {
        setSubmitted(false);
        setEmpresaDialog(false);
    }

    const confirmDelete = (empresa: React.SetStateAction<Empresa>) => {
        setEmpresa(empresa);
        setDeleteDialog(true);
    }

    const empresaDialogFooter = (
        <React.Fragment>
            <Button label="Fechar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} /> 
        </React.Fragment>
    );

    const hideDeleteDialog = () => {
        setDeleteDialog(false);
    }

    const deleteDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deletar} />
        </React.Fragment>
    );


    


    
    /*const handleAddEmail = () => {
           
        const itensAdicionados = formik.values.empresaEmail   
        
        itensAdicionados.push({
                emeEmail: emailVisao,
                emeResponsavel: responsavelVisao,
                empresa: empresaSalvo1
               
            })               
        setEmailVisao('')
        setResponsavelVisao('') 
        setEmpresasEmails(itensAdicionados)  
    }

    const handleAddImagens = () => {   
        const itensAdicionados = formik.values.imagens    
        itensAdicionados.push({
                aruDescricao: aruDescricaoVisao,
                aruData: converteData(aruDataVisao),
                aruArquivo: imageURLS[index], 
                empresa: empresaSalvo1      
            })   
        setAruDescricaoVisao(''),
        setAruDataVisao(null),
        setAruArquivoVisao(''),
        setIndex(index+1),
        setEmpresasImagens(itensAdicionados)
       
    }*/

    const converteData = (dataImagem: Date | Date[]) => {
 
        var dataUTC = new Date(""+dataImagem).toString();
        var novaDataISO = new Date(dataUTC).toISOString();
        return novaDataISO;


    }

    const editEmpresa = (empresa: Empresa) => {

        /*Altera caption do botão para ALTERAR*/
        setMostraBotao(true);

        /* Campos do formulário*/
        
        formik.setFieldValue("empCodigo", empresa.empCodigo)
        formik.setFieldValue("empNome", empresa.empNome)
        formik.setFieldValue("empStatus", empresa.empStatus)
        formik.setFieldValue("empProxMedicaoIt", empresa.empProxMedicaoIt)
        formik.setFieldValue("empProxMedicaoRi", empresa.empProxMedicaoRi)
        formik.setFieldValue("empProxMedicaoMca", empresa.empProxMedicaoMca)
        formik.setFieldValue("empPeriodicidadeIt", empresa.empPeriodicidadeIt)
        formik.setFieldValue("empPeriodicidadeRi", empresa.empPeriodicidadeRi)
        formik.setFieldValue("empPeriodicidadeMca", empresa.empPeriodicidadeMca)
        
    }

    /*const editEmpresa = (empresa: Empresa) => {
        
        console.log(empresa)
        setEmpresa({...empresa});
        
        var empProxMedicaoIt = empresa.empProxMedicaoIt.replaceAll('-', '/');
        var empProxMedicaoItBanco = new Date(empProxMedicaoIt); 
        setAlteraData1(empProxMedicaoItBanco);

        var empProxMedicaoRi = empresa.empProxMedicaoRi.replaceAll('-', '/');
        var empProxMedicaoRiBanco = new Date(empProxMedicaoRi); 
        setAlteraData2(empProxMedicaoRiBanco);

        var empProxMedicaoMca = empresa.empProxMedicaoMca.replaceAll('-', '/');
        var empProxMedicaoMcaBanco = new Date(empProxMedicaoMca); 
        setAlteraData3(empProxMedicaoMcaBanco);

        if(empresa.empStatus == '1') {
            setChecked(true)
        } else {
            setChecked(false)
        }



        setEmpresaDialog(true);
        
    }*/

    const consultaEmpresa = (empresa: Empresa) => {

        setEmpresa({...empresa})
        setEmpresaDialog(true);
        setMostraBotao(false);  
      
    }





   /* const handleAddSetor = () => {
           
        const itensAdicionados = formik.values.setor   
        
        itensAdicionados.push({
                setNome: nomeSetorVisao,
                setStatus: statusSetorVisao,
                empresa: empresaSalvo1
               
            })               
        setNomeSetorVisao('')
        setStatusSetorVisao(false) 
        setEmpresasSetor(itensAdicionados)  
    }*/

    const actionBodyTemplate = (rowData: Empresa) => {
        return (
            <React.Fragment> 
                    <Button icon="pi pi-search" className="p-button-rounded p-button-info"  tooltip='Consultar' tooltipOptions={{position: 'bottom'}} type="button"  onClick={() => consultaEmpresa(rowData)}/>      
                    <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" tooltip='Editar' tooltipOptions={{position: 'bottom'}} type="button" onClick={() => editEmpresa(rowData)}  />
                    <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" tooltip='Deletar' tooltipOptions={{position: 'bottom'}} type="button" onClick={() => confirmDelete(rowData)} />
            </React.Fragment>
        );
    }

    const exportCSV = () => {
        dt.current?.exportCSV({selectionOnly:false});
    }

    const confirmDeleteSelected = () => {
        setDeleteEmpresasDialog(true);
    }

    const header = (
        <div className="flex flex-column md:flex-row md:align-items-right justify-content-between">
           <div className="mt-1 md:mt-0 flex justify-content-end">
                <Button icon="pi pi-trash" className="p-button-danger mr-2 p-button-rounded" onClick={confirmDeleteSelected} disabled={!selectedEmpresas || !selectedEmpresas.length} tooltip="Delete" tooltipOptions={{position: 'bottom'}} />
                <Button icon="pi pi-upload" className="p-button-help p-button-rounded" onClick={exportCSV} tooltip="Export" tooltipOptions={{position: 'bottom'}} />
                <span className="p-input-icon-left w-full md:w-auto">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e: FormEvent<HTMLInputElement>) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." className="w-full lg:w-auto" />
                </span>
            </div>
        </div>
    );

   
    
    const displaySuccess = () => {
        toast.current.show({ severity: 'success', summary: 'Successfully Done', detail: 'Successfull Content', life: 3000 });

    }
    


    // Trabalhando com imagems
    const onBasicUpload = () => {       
        return toast.current?.show({severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode'});
    }

    const handleChange = (event: any) => {

        let file = event.target.files[0];

        
        if (event.target.files && event.target.files[0]) {
          const i = event.target.files[0];
          
          setAruArquivoVisao(i);
         
    
    
        }
      };
      
 
    return (

       
            <div className="card">
                <div className="surface-card border-round shadow-2 p-4">
                <span className="text-900 text-2xl font-medium mb-4 block">Cadatro de Empresas:</span>
                <form id="cadastroEmpresa" onSubmit={formik.handleSubmit}>
                <Toast ref={toast} />

           
                    
                            <div className="grid">
                                <div className="col-10">

                                    <span className="ml-2">
                                        <label style={{ color: "white" }} htmlFor="empNome">Nome*</label>
                                        <InputText style={{ width: "100%" }}  placeholder="Digite nome da empresa" id="empNome" name="empNome" value={formik.values.empNome}  onChange={formik.handleChange} onBlur={formik.handleBlur} />

                                    </span>

                                    <small className="p-error p-d-block">
                                        {formik.touched && formik.errors.empNome}
                                    </small>
                                </div>


                                <div className="col-2">
                                        <span className="ml-2">
                                            <label style={{ color: "white" }} htmlFor="empStatus">Ativa: *</label><br></br>
                                            <Checkbox inputId="empStatus" name="empStatus" checked={formik.values.empStatus} onChange={formik.handleChange} />

                                        </span>

                                </div>

                                <div className="col-4">
                                    <span className="ml-2">
                                        <label style={{ color: "white" }} htmlFor="empPeriodicidadeIt">PeriodicidadeIt*</label> <br></br>
                                        <InputMask style={{ width: "58%" }}  placeholder="Digite a periodicidade" id="empPeriodicidadeIt" name="empPeriodicidadeIt" value={formik.values.empPeriodicidadeIt}  onChange={formik.handleChange} onBlur={formik.handleBlur}  mask="9?99"  autoClear />

                                    </span>
                                
                                </div>


                                <div className="col-4">
                                    <span className="ml-2">
                                        <label style={{ color: "white" }} htmlFor="empPeriodicidadeRi">PeriodicidadeRi*</label> <br></br>
                                        <InputMask style={{ width: "58%" }} placeholder="Digite a periodicidade" id="empPeriodicidadeRi" name="empPeriodicidadeRi" value={formik.values.empPeriodicidadeRi} onChange={formik.handleChange} onBlur={formik.handleBlur} mask="9?99"  autoClear/>

                                    </span>
                                    
                                </div>

                                <div className="col-4">
                                    <span className="ml-2">
                                        <label style={{ color: "white" }} htmlFor="periodicidadeMca">PeriodicidadeMca*</label> <br></br>
                                        <InputMask style={{ width: "58%" }} placeholder="Digite a periodicidade" id="empPeriodicidadeMca" name="empPeriodicidadeMca" value={formik.values.empPeriodicidadeMca} onChange={formik.handleChange} onBlur={formik.handleBlur} mask="9?99"  autoClear/>

                                    </span>
                                    
                                </div>


                                <div className="col-4">
                                    <span className="ml-2">
                                        <label style={{ color: "white" }} htmlFor="empProxMedicaoIt">ProxMedicaoIt</label> <br></br>
                                        <Calendar style={{ width: "58%" }} placeholder="Digite a próxima data" id="empProxMedicaoIt" name="empProxMedicaoIt" value={date1} onChange={formik.handleChange} dateFormat="dd/mm/yy" mask="99/99/9999" showIcon onBlur={formik.handleBlur} />

                                    </span>
                                </div>

                                <div className="col-4">
                                    <span className="ml-2">
                                        <label htmlFor="empProxMedicaoRi">ProxMedicaoRi</label> <br></br>
                                        <Calendar style={{ width: "58%" }} placeholder="Digite a próxima data" id="empProxMedicaoRi" name="empProxMedicaoRi" value={date2} onChange={formik.handleChange} dateFormat="dd/mm/yy" mask="99/99/9999" showIcon onBlur={formik.handleBlur} />

                                    </span>
                                </div>



                                <div className="col-4">
                                    <span className="ml-2">
                                        <label style={{ color: "white" }} htmlFor="empProxMedicaoMca">ProxMedicaoMca</label> <br></br>
                                        <Calendar style={{ width: "58%" }} placeholder="Digite a próxima data" id="empProxMedicaoMca" name="empProxMedicaoMca" value={date3} onChange={formik.handleChange} dateFormat="dd/mm/yy" mask="99/99/9999" showIcon onBlur={formik.handleBlur} />

                                    </span>
                                </div>

                                <div className="col-4" >

                                    {!mostraBotao &&
                                            <Button type="button" label="Salvar Empresa" icon="pi pi-check" onClick={salvar}/>
                                        } {mostraBotao &&
                                            <Button  type="button" label="Alterar" icon="pi pi-check" onClick={alterar}/>
                                        } 

                                        <Link href={{ 
                                                pathname: "/cadastros/empresaEmail", 
                                                query: { id: empresa?.empCodigo },
                                                
                                                }}>
                                                <Button>Cadastrar Email </Button>  
                                                
                                        </Link>


                               </div>
                               </div>
                        <div>

                                <DataTable ref={dt} value={empresas} selection={selectedEmpresas} onSelectionChange={(e) => setSelectedEmpresas(e.value)}
                                    dataKey="empCodigo" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} empresas"
                                    globalFilter={globalFilter}  header={header} responsiveLayout="stack" stateKey="tablestatedemo-session">

                                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                                    <Column field="empCodigo" header="Código" sortable style={{ minWidth: '12rem' }}></Column>
                                    <Column field="empNome" header="Nome" sortable style={{ minWidth: '16rem' }}></Column>
                                    
                                    <Column field="empProxMedicaoIt" header="Prox Med It" sortable style={{ minWidth: '10rem' }}></Column>
                                    <Column field="empProxMedicaoRi" header="Prox Med Ri" sortable style={{ minWidth: '10rem' }}></Column>
                                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                        
                                    
                                </DataTable>





                        </div>
            </form>

            <Dialog visible={empresaDialog} breakpoints={{'960px': '75vw', '640px': '100vw'}} style={{width: '40vw'}} header="Cadastro de Empresa" modal className="p-fluid" footer={empresaDialogFooter} onHide={hideDialog}>
             
                <div className="p-formgrid grid">
                    <div className="field col">
                        <label htmlFor="empCodigo">Código: </label>
                        <InputText id="empCodigo"  name="empCodigo" value={empresa?.empCodigo} disabled/>
                    </div>

                   
    
                </div>
                 
                <div className="p-formgrid grid">
                <div className="field col">
                    <label htmlFor="empNome">Nome</label>
                    <InputText id="empNome"  value={empresa?.empNome} disabled/>
                </div>

                <div className="p-checkbox-box">
                    <label htmlFor="empStatus">Ativo:  </label>
                    <Checkbox  inputId="empStatus" value={empresa?.empStatus } icon/>   
                </div>

                </div>

                <div className="p-formgrid grid">

                <div className="field col">
                    <label htmlFor="empPeriodicidadeIt">Periodicidade It</label>
                    <InputText id="empPeriodicidadeIt"  value={empresa?.empPeriodicidadeIt} disabled/>
                </div>

                <div className="field col">
                    <label htmlFor="empPeriodicidadeRi">Periodicidade Ri</label>
                    <InputText id="empPeriodicidadeRi"  value={empresa?.empPeriodicidadeRi} disabled/>
                </div>

                <div className="field col">
                    <label htmlFor="empPeriodicidadeMca">Periodicidade Mca</label>
                    <InputText id="empPeriodicidadeMca"  value={empresa?.empPeriodicidadeMca} disabled/>
                </div>


                </div>
                
            </Dialog>

            <Dialog visible={deleteDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteDialogFooter} onHide={hideDeleteDialog}>
                    <div className="flex align-items-center justify-content-center">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                        {empresa && <span>Tem certeza que quer deletar? <b>{empresa.empNome}</b>?</span>}
                    </div>
            </Dialog>



            </div>
            </div>

       

            
        );
}

