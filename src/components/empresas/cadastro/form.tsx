
import React, { useEffect, useState, useRef, ChangeEvent, FormEvent } from 'react';
import {  useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Calendar, CalendarChangeParams } from 'primereact/calendar';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
//import { CountryService } from '../service/CountryService';
import {Empresa, EmpresaEmail} from 'app/model/empresas';
import {useEmpresaService} from 'app/services/empresa.service';
import { validationScheme } from './validationScheme'

import { httpClient } from 'app/http';
import { AxiosResponse } from 'axios';
import useSWR from 'swr';
import { Toast } from 'primereact/toast';
import {Menu} from 'components/layout/menu';

import 'bootstrap/dist/css/bootstrap.min.css';
import * as Yup from 'yup'


interface EmpresaFormProps {
    empresas: Array<Empresa>,
    
    onSubmit: (empresa: Empresa) => void;
    //onNovaVenda: () => void;
    //vendaRealizada: boolean;
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
            empresaEmail: [],
            empPeriodicidadeMca: '',
            imagens: [],
            
            
}



let emptyEmpresaEmail: EmpresaEmail = {
   
    emeEmail: '',
    emeResponsavel: '',
    
};

export const EmpresaForm: React.FC<EmpresaFormProps> = ({
     
    empresas,
    onSubmit
    
}) => {


    const [countries, setCountries] = useState([]);
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});
    //const countryservice = new CountryService();
    const service = useEmpresaService()
    //const [empresas, setEmpresas] = useState<Empresa[]>([]);
    //const [emails, setEmails] = useState<EmpresaEmail[]>([]);
    const [ email, setEmail ] = useState<EmpresaEmail>(emptyEmpresaEmail);

     //Usando no Calender
     const [ date1, setAlteraData1 ] = useState<Date | Date[] | undefined>(undefined);
     const [ date2, setAlteraData2 ] = useState<Date | Date[] | undefined>(undefined);
     const [ date3, setAlteraData3 ] = useState<Date | Date[] | undefined>(undefined);
     const [ emailVisao, setEmailVisao ] = useState<string>('');
     const [ responsavelVisao, setResponsavelVisao ] = useState<string>('');
     //Usado no checkBox
    const [checked, setChecked] = useState<boolean>(false);

    
    const [empresaDialog, setEmpresaDialog] = useState(false);
    const [deleteEmpresaDialog, setDeleteEmpresaDialog] = useState(false);
    const [deleteEmpresasDialog, setDeleteEmpresasDialog] = useState(false);
    const [empresa, setEmpresa] = useState<Empresa>(formScheme);
    const [selectedEmpresas, setSelectedEmpresas] = useState<Empresa[]>([]);
   
    const [globalFilter, setGlobalFilter] = useState<string>();
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable>(null);
    const [message, setMessage] = useState(''); // This will be used to show a message if the submission is successful
    const [submitted, setSubmitted] = useState(false);

   // var _empresa: Empresa = {...empresa};

     

   


   /*const { data: result, error } = useSWR<AxiosResponse<Empresa[]>>
    ('/empresas', url => httpClient.get(url) )

    
    useEffect( () => {
        setEmpresas(result?.data || [])
    }, [result])

    /*useEffect(() => {
        countryservice.getCountries().then(data => setCountries(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps*/

    const formik = useFormik<Empresa>({         
        initialValues: formScheme,
        onSubmit: () => {
          setMessage('Form submitted');
          setSubmitted(true);
          console.log(formik.values);
        },
          validationSchema: Yup.object({
              empNome: Yup.string().trim().required("Campo obrigatório."),
              empStatus: Yup.string().trim().required("Campo obrigatório."),
              empProxMedicaoIt: Yup.string().trim().required("Campo obrigatório."),
              empProxMedicaoRi:Yup.string().trim().required("Campo obrigatório."),
              empProxMedicaoMca:Yup.string().trim().required("Campo obrigatório."),
              empPeriodicidadeIt: Yup.string().trim().required("Campo obrigatório."),
              empPeriodicidadeRi: Yup.string().trim().required("Campo obrigatório."),
              empPeriodicidadeMca: Yup.string().trim().required("Campo obrigatório."),
              
          }),
          
      })
    //console.log("Formik Values ;",  formik.values)

    const handleAddEmail = () => {   
        const itensAdicionados = formik.values.empresaEmail   
        itensAdicionados.push({
                emeEmail: emailVisao,
                emeResponsavel: responsavelVisao
            })               
        setEmailVisao('')
        setResponsavelVisao('')   
    }

    const actionBodyTemplate = (rowData: Empresa) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editEmpresa(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteEmpresa(rowData)} />
            </React.Fragment>
        );
    }

    const editEmpresa = (empresa: Empresa) => {
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



        //setEmpresaDialog(true);
        
    }



    const confirmDeleteEmpresa = (empresa: Empresa) => {
        setEmpresa(empresa);
        setDeleteEmpresaDialog(true);
    }
    const deletar = (empresa: Empresa) => {
        service.deletar(empresa.empCodigo).then(response =>{
            let _empresas = empresas.filter(val => val.empCodigo !== empresa.empCodigo);
            //setEmpresas(_empresas);
            setDeleteEmpresaDialog(false);
            setEmpresa(formScheme);
            toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Empresa Deleted', life: 3000 });
            })
    }


    const deleteEmpresa = () => {
       deletar(empresa);        
    }

    const hideDialog = () => {
        setSubmitted(false);
        setEmpresaDialog(false);
    }

    const hideDeleteEmpresaDialog = () => {
        setDeleteEmpresaDialog(false);
    }

    const hideDeleteEmpresasDialog = () => {
        setDeleteEmpresasDialog(false);
    }

    const confirmDeleteSelected = () => {
        setDeleteEmpresasDialog(true);
    }

    const deleteSelectedEmpresas = () => {
        let _empresas = empresas.filter(val => !selectedEmpresas.includes(val));
        //setEmpresas(_empresas);
        setDeleteEmpresasDialog(false);
        setSelectedEmpresas([]);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Empresas Deleted', life: 3000 });
    }
    const exportCSV = () => {
        dt.current?.exportCSV({selectionOnly:false});
    }

    const openNew = () => {
        setEmpresa(formScheme);
        setSubmitted(false);
        setEmpresaDialog(true);
    }


    const header = (
        <div className="flex flex-column md:flex-row md:align-items-right justify-content-between">
            <span className="p-input-icon-left w-full md:w-auto">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e: FormEvent<HTMLInputElement>) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." className="w-full lg:w-auto" />
            </span>
            <div className="mt-3 md:mt-0 flex justify-content-end">
                <Button icon="pi pi-plus" className="mr-2 p-button-rounded" onClick={openNew} tooltip="New" tooltipOptions={{position: 'bottom'}} />
                <Button icon="pi pi-trash" className="p-button-danger mr-2 p-button-rounded" onClick={confirmDeleteSelected} disabled={!selectedEmpresas || !selectedEmpresas.length} tooltip="Delete" tooltipOptions={{position: 'bottom'}} />
                <Button icon="pi pi-upload" className="p-button-help p-button-rounded" onClick={exportCSV} tooltip="Export" tooltipOptions={{position: 'bottom'}} />
            </div>
        </div>
    );

    const disableAddEmailButton = () => {

        if (emailVisao || responsavelVisao == ''){
            return true
        }
        return false;
    }

    const deleteEmpresaDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteEmpresaDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteEmpresa} />
        </React.Fragment>
    );

    const msgSubmit = (
        <React.Fragment>
            <div hidden={!submitted} className="alert alert-primary" role="alert">
                    {message}
            </div> 
        </React.Fragment>
    );
    




    


    /*const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };*/

    

    

    return (

        

        <div className="surface-card border-round shadow-2 p-4">
                <span className="text-900 text-2xl font-medium mb-4 block">Cadatro de Empresas:</span>

                
        <form id="cadastroEmpresa" onSubmit={formik.handleSubmit}>
          <div className="grid">             
                              
                    <div className="col-10">
                            
                            <div className="ml-2">
                                <label htmlFor="empNome" >Nome*</label> 
                                <InputText  style={{ width: "100%" }} id="empNome" name="empNome"  value={formik.values.empNome} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                                
                            </div>
                            
                            <small className="p-error p-d-block">
                                {formik.touched && formik.errors.empNome}
                            </small>
                    </div>

                        
                    <div className="col">
                        <div className="ml-2">
                        <label htmlFor="empStatus" >Ativa: *</label><br></br>
                            <Checkbox inputId="empStatus" name="empStatus" checked={formik.values.empStatus} onChange={formik.handleChange}/>
                            
                        </div>

                    </div>    
            
                    <div className="col-4">
                            <span className="ml-2">
                                <label htmlFor="empPeriodicidadeIt" >PeriodicidadeIt*</label> <br></br>
                                <InputText style={{ width: "58%" }} id="empPeriodicidadeIt" name="empPeriodicidadeIt" value={formik.values.empPeriodicidadeIt} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                                
                            </span>
                            <small className="p-error p-d-block">
                                {formik.touched && formik.errors.empPeriodicidadeIt}
                            </small>
                    </div>
                        

                    <div className="col-4">
                            <span className="ml-2">
                                <label htmlFor="empPeriodicidadeRi" >PeriodicidadeRi*</label> <br></br>
                                <InputText style={{ width: "58%" }} id="empPeriodicidadeRi" name="empPeriodicidadeRi" value={formik.values.empPeriodicidadeRi} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                
                            </span>
                            <small className="p-error p-d-block">
                                {formik.touched && formik.errors.empPeriodicidadeRi}
                            </small>
                    </div>

                    <div className="col-4">
                            <span className="ml-2">
                                <label htmlFor="periodicidadeMca" >PeriodicidadeMca*</label> <br></br>
                                <InputText style={{ width: "58%" }} id="empPeriodicidadeMca" name="empPeriodicidadeMca" value={formik.values.empPeriodicidadeMca} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                
                            </span>
                            <small className="p-error p-d-block">
                                {formik.touched && formik.errors.empPeriodicidadeMca}
                            </small>
                    </div>

                        
                    <div className="col-4">
                            <span className="ml-2">
                                <label htmlFor="empProxMedicaoIt">ProxMedicaoIt</label> <br></br>
                                <Calendar  id="empProxMedicaoIt" name="empProxMedicaoIt" value={date1} onChange={formik.handleChange} dateFormat="dd/mm/yy" mask="99/99/9999" showIcon onBlur={formik.handleBlur}/>
                                
                            </span>
                    </div>

                    <div className="col-4">
                            <span className="ml-2">
                                <label htmlFor="empProxMedicaoRi">ProxMedicaoRi</label> <br></br>
                                <Calendar id="empProxMedicaoRi" name="empProxMedicaoRi" value={date2} onChange={formik.handleChange} dateFormat="dd/mm/yy" mask="99/99/9999" showIcon onBlur={formik.handleBlur}/>
                                
                            </span>
                    </div>

                        

                    <div className="col-4">
                            <span className="ml-2">
                                <label htmlFor="empProxMedicaoMca">ProxMedicaoMca</label> <br></br>
                                <Calendar id="empProxMedicaoMca" name="empProxMedicaoMca" value={date3} onChange={formik.handleChange} dateFormat="dd/mm/yy" mask="99/99/9999" showIcon onBlur={formik.handleBlur}/>
                                
                            </span>
                   </div>


                    <div className="col-5">
                            <span className="ml-2">
                                <label htmlFor="emailVisao" > Email: *</label> <br></br>
                                <InputText style={{ width: "100%" }} id="emailVisao" name="emailVisao" value={emailVisao} onChange={e => setEmailVisao(e.target.value)} onBlur={formik.handleBlur}/>
                                
                            </span>
                            
                    </div>

                    <div className="col-5">
                            <span className="ml-2">
                                <label htmlFor="responsavelVisao" >Responsável: *</label>  <br></br> 
                                <InputText style={{ width: "100%" }} id="responsavelVisao" name="responsavelVisao" value={responsavelVisao} onChange={e => setResponsavelVisao(e.target.value)} onBlur={formik.handleBlur}/>
                                
                            </span>
                            
                    </div>
                   
                    <div className="col-2">
                    <br></br>
                        <Button type="button" 
                                //disabled={disableAddEmailButton()}
                                label="Adicionar Email" 
                                onClick={handleAddEmail} />
                    </div>


                    {formik.values.empresaEmail.length &&
                    <div className="col-12">
                        <DataTable value={formik.values.empresaEmail} emptyMessage="Nenhum email adicionado.">
                            <Column body={ (item: EmpresaEmail) => {
                                const handleRemoverItem = () => {
                                const novaLista = formik.values.empresaEmail.filter(
                                em => em.emeEmail !== item.emeEmail
                                )
                                formik.setFieldValue("emails", novaLista)
                                }

                                return (
                                <Button type="button" label="Excluir" onClick={handleRemoverItem} />
                                    )
                                }} />
                           
                            <Column field="emeEmail" header="Email" />
                            <Column field="emeResponsavel" header="Responsável" />                           
                            
                        </DataTable>                      
                    </div>
                    }    
                
                </div>

                
           

                <Button form='cadastroEmpresa' type="submit" label="Salvar" />
            
            
            

            <br></br>
            <br></br>

            
                        
                
        </form>

        <div>

                        <DataTable ref={dt} value={empresas} selection={selectedEmpresas} onSelectionChange={(e) => setSelectedEmpresas(e.value)}
                            dataKey="empCodigo" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} empresas"
                            globalFilter={globalFilter}  header={header} responsiveLayout="stack">

                            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                            <Column field="empCodigo" header="Código" sortable style={{ minWidth: '12rem' }}></Column>
                            <Column field="empNome" header="Nome" sortable style={{ minWidth: '16rem' }}></Column>
                            <Column field="empStatus" header="Status" sortable style={{ minWidth: '10rem' }}></Column>
                            <Column field="createdAt" header="Data Criação" sortable style={{ minWidth: '10rem' }}></Column>
                            <Column field="empProxMedicaoIt" header="Prox Med It" sortable style={{ minWidth: '10rem' }}></Column>
                            <Column field="empProxMedicaoRi" header="Prox Med Ri" sortable style={{ minWidth: '10rem' }}></Column>
                
                            <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                        </DataTable>





            </div>
                        

       

<Dialog visible={deleteEmpresaDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteEmpresaDialogFooter} onHide={hideDeleteEmpresaDialog}>
    <div className="flex align-items-center justify-content-center">
        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
        {empresa && <span> Tem certeza de que deseja excluir <b>{empresa.empNome}</b>?</span>}
    </div>
</Dialog>
               
           </div>
           
        
    );
}


             