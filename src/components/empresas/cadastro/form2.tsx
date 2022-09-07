import { ArquivoUpload, Empresa, EmpresaEmail, Setor } from "app/model/empresas";
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



interface EmpresaFormProps {

   
    empresaSalvo : Empresa,
    mensagens: any,
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
    empresaEmail: [],
    imagens: [],
    setor: [],
    empPeriodicidadeMca: '',
    
    
}

export const EmpresaForm: React.FC<EmpresaFormProps> = ({


  
    empresaSalvo,
    mensagens,
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
    const [ empresasEmails, setEmpresasEmails ] = useState<EmpresaEmail[]>([]);
    const [ empresasImagens, setEmpresasImagens ] = useState<ArquivoUpload[]>([])
    const [ empresasSetor, setEmpresasSetor ] = useState<Setor[]>([])


    const [ empresas, setEmpresas ] = useState<Empresa[]>([]);
   


    /* Ativação das TabView */
   const [activeIndex1, setActiveIndex1] = useState(0);
    

    /*const { data: result, error } = useSWR<AxiosResponse<Empresa[]>>
    ('/empresa', url => httpClient.get(url) )


    useEffect( () => {
        setEmpresas(result?.data || [])
    }, [result])*/

    const todosEndpoint = "http://localhost:8080/empresas";

    const [todos, setTodos] = React.useState([]);
    React.useEffect(() => {
      const getData = async () => {
        const response = await fetch(todosEndpoint);
        const data = await response.json();
        setEmpresas(data);
      };
       getData();
      }, []);
  

    

    const formik = useFormik<Empresa>({         
      initialValues: formScheme,
      onSubmit,
      
      /*onSubmit: () => {
        setMessage('Form submitted');
        setSubmitted(true);
        console.log(formik.values);
      },*/
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

    
    const hideDialog = () => {
        setSubmitted(false);
        setEmpresaDialog(false);
    }

    const empresaDialogFooter = (
        <React.Fragment>
            <Button label="Fechar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
           
        </React.Fragment>
    );

    
    const handleAddEmail = () => {
           
        const itensAdicionados = formik.values.empresaEmail   
        
        itensAdicionados.push({
                emeEmail: emailVisao,
                emeResponsavel: responsavelVisao,
                empresa: empresaSalvo
               
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
                empresa: empresaSalvo      
            })   
        setAruDescricaoVisao(''),
        setAruDataVisao(null),
        setAruArquivoVisao(''),
        setIndex(index+1),
        setEmpresasImagens(itensAdicionados)
       
    }

    const converteData = (dataImagem: Date | Date[]) => {
 
        var dataUTC = new Date(""+dataImagem).toString();
        var novaDataISO = new Date(dataUTC).toISOString();
        return novaDataISO;


    }

    const editEmpresa = (empresa: Empresa) => {
        
        console.log(empresa)
        setEmpresa({...empresa});
        
        /*var empProxMedicaoIt = empresa.empProxMedicaoIt.replaceAll('-', '/');
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
        }*/



        setEmpresaDialog(true);
        
    }




    const handleAddSetor = () => {
           
        const itensAdicionados = formik.values.setor   
        
        itensAdicionados.push({
                setNome: nomeSetorVisao,
                setStatus: statusSetorVisao,
                empresa: empresaSalvo
               
            })               
        setNomeSetorVisao('')
        setStatusSetorVisao(false) 
        setEmpresasSetor(itensAdicionados)  
    }

    const actionBodyTemplate = (rowData: Empresa) => {
        return (
            <React.Fragment> 
                    <Button icon="pi pi-search" className="p-button-rounded p-button-info"   onClick={() => editEmpresa(rowData)}/>      
                    <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2"   />
                    <Button icon="pi pi-trash" className="p-button-rounded p-button-danger"  />
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
      
      
      const uploadImageToClient = (event: any) => {
        if (event.target.files && event.target.files[0]) {
            setImages((imageList) => [...imageList, event.target.files[0]]);
            setImageURLS((urlList) => [
                ...urlList,
                URL.createObjectURL(event.target.files[0])
            ]);
        }
    };

   


      const imageBodyTemplate = (rowData: ArquivoUpload) => {
           return (
                    <Zoom>
                        <img
                            alt="Clique para exapandir a imagem"
                            src={rowData.aruArquivo}
                            width="500"
                         />
                    </Zoom>      
                   
           ); 
        }


       const handleSalvaEmpresaEmail = () => { 
           setActiveIndex1(2);
           service.salvarEmpresaEmail(empresasEmails);
          
       }

       const handleSalvaImagem = () => {  
        setActiveIndex1(3);
        service.salvarEmpresaImagem(empresasImagens);
       
        }

        const handleSalvaSetor = () => { 
            setActiveIndex1(0);
            service.salvarEmpresaSetor(empresasSetor);
           
        }

       

        
        


    return (

        <div className="tabview-demo">
            <div className="card">
                <div className="surface-card border-round shadow-2 p-4">
                <span className="text-900 text-2xl font-medium mb-4 block">Cadatro de Empresas:</span>
                <form id="cadastroEmpresa" onSubmit={formik.handleSubmit}>

           
                    <TabView activeIndex={activeIndex1} onTabChange={(e) => setActiveIndex1(e.index)}>
                        <TabPanel header="Dados Empresa">
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

                                <div className="col-2" >

                                    {!empresaSalvo &&


                                        <Button  type="submit" label="Salvar" icon="pi pi-check" />
                                    } {empresaSalvo &&
                                        <Button onClick={() => setActiveIndex1(1)} label="Proximo" />

                                    }   

                                </div>

                            </div>    
                        </TabPanel>

                        <TabPanel header="Emails Empresa" disabled>


                            <div className="col-5">
                                <span className="ml-2">
                                    <label style={{ color: "white" }} htmlFor="emailVisao"> Email: *</label> <br></br>
                                    <InputText style={{ width: "100%" }} placeholder="Digite email da empresa" id="emailVisao" name="emailVisao" value={emailVisao} onChange={e => setEmailVisao(e.target.value)} onBlur={formik.handleBlur} />

                                </span>

                            </div>

                            <div className="col-5">
                                <span className="ml-2">
                                    <label style={{ color: "white" }} htmlFor="responsavelVisao">Responsável: *</label>  <br></br>
                                    <InputText style={{ width: "100%" }} placeholder="Digite responsável pelo email" id="responsavelVisao" name="responsavelVisao" value={responsavelVisao} onChange={e => setResponsavelVisao(e.target.value)} onBlur={formik.handleBlur} />

                                </span>

                            </div>

                            <div className="col-2">
                                <br></br>
                                <Button type="button"
                                    //disabled={disableAddEmailButton()}
                                    label="Adicionar Email"
                                    onClick={handleAddEmail} />
                            </div>


                            {formik.values.empresaEmail &&
                                <div className="col-12">
                                    <DataTable value={formik.values.empresaEmail} emptyMessage="Nenhum email adicionado.">
                                        <Column  style={{width: "10%"}} body={(item: EmpresaEmail) => {
                                            const handleRemoverItem = () => {
                                                const novaLista = formik.values.empresaEmail.filter(
                                                    em => em.emeEmail !== item.emeEmail
                                                );
                                                formik.setFieldValue("emails", novaLista);
                                            };

                                            return (
                                                <Button  icon="pi pi-trash" className="p-button-rounded p-button-danger" type="button" label="Excluir" onClick={handleRemoverItem} />
                                            );
                                        } } />

                                        <Column field="emeEmail" header="Email" />
                                        <Column field="emeResponsavel" header="Responsável" />
                                        <Column field="empresa.empNome" header="Empresa" />                                  

                                    </DataTable>
                                </div>}

                                <Button onClick={handleSalvaEmpresaEmail} label="Proximo" />
                                

                        </TabPanel>

                        <TabPanel header="Imagens Empresa" disabled>


                            <div className="col-3">
                                <span >
                                    <label style={{ color: "white" }} htmlFor="aruDescricaoVisao"> Descrição: *</label> <br></br>
                                    <InputText style={{ width: "100%" }} placeholder="Digite descrição imagem" id="aruDescricaoVisao" name="aruDescricaoVisao" value={aruDescricaoVisao} onChange={e => setAruDescricaoVisao(e.target.value)} onBlur={formik.handleBlur} />

                                </span>

                            </div>

                            <div className="col-3">
                                <span className="ml-2">
                                    <label style={{ color: "white" }} htmlFor="aruDataVisao">Data: *</label>  <br></br>
                                    <Calendar style={{ width: "90%" }} placeholder="Digite data da imagem" id="aruDataVisao" name="aruDataVisao" value={aruDataVisao}onChange={e => setAruDataVisao(e.target.value)} dateFormat="dd/mm/yy" mask="99/99/9999" showIcon onBlur={formik.handleBlur} />
                                    
                                </span>

                            </div>

                            <div className="col-2">
                                <span className="ml-2">
                                    
                                    <input type="file" style={{ display: "none" }} id="aruArquivoVisao" name="aruArquivoVisao" accept="image/*" onChange={uploadImageToClient} />
                                    <>                   
                                    <label  className="avatar" htmlFor="aruArquivoVisao"  >Carregar Imagens: *</label>                               
                                    <style jsx global>{`
                                        .avatar {
                                                    border-radius: 5px;
                                                    border: 1px solid ##F0E68C;
                                                    padding: 5px 5px;
                                                    width: 210px;
                                                    height: 40px;
                                                    background: khaki;
                                                    color: black;
                                                    display: block;
                                                    fontFamily: Times, Times New Roman, serif;
                                                    text-align: center; 
                                                    cursor: pointer;
                                                    
                                                    transiction: .5s
                                                    background-color: #F0E68C;
                                                }
                                        .avatar:hover {
                                            color: red;
                                            backgroud: white;

                                            
                                        }     
                                        `}</style>
                                    </>  
                                </span>
                            </div>

                            <div className="col-2">
                                <br></br>
                                <Button type="button"
                                    //disabled={disableAddEmailButton()}
                                    label="Adicionar Imagens"
                                    onClick={handleAddImagens} />
                            </div>


                            {formik.values.imagens.length &&
                                <div className="col-12">
                                    <DataTable  dataKey="aruDescricao" value={formik.values.imagens} emptyMessage="Nenhum email adicionado.">
                                        <Column  style={{width: "10%"}} body={(item: ArquivoUpload) => {
                                            const handleRemoverItem = () => {
                                                const novaLista = formik.values.imagens.filter(
                                                    im => im.aruDescricao !== item.aruDescricao
                                                );
                                                formik.setFieldValue("imagens", novaLista);
                                            };

                                            return (
                                                <Button  icon="pi pi-trash" className="p-button-rounded p-button-danger" type="button" label="Excluir" onClick={handleRemoverItem} />
                                            );
                                        } } />

                                        <Column field="aruDescricao" header="Descricao" />
                                        <Column field="aruData" header="Data" />
                                        <Column field="aruArqvuivo" body={imageBodyTemplate} header="Imagem" ></Column>
                                        <Column field="empresa.empNome" header="Empresa" />
                                        

                                    </DataTable>
                                </div>}

                                <Button onClick={handleSalvaImagem} label="Proximo" />
                                
                        </TabPanel>

                    

                        <TabPanel header="Setor Empresa" disabled>

                        <div className="col-5">
                                <span className="ml-2">
                                    <label style={{ color: "white" }} htmlFor="nomeSetorVisao"> Setor: *</label> <br></br>
                                    <InputText style={{ width: "100%" }} placeholder="Digite setor da empresa" id="nomeSetorVisao" name="nomeSetorVisao" value={nomeSetorVisao} onChange={e => setNomeSetorVisao(e.target.value)} onBlur={formik.handleBlur} />

                                </span>

                            </div>

                            <div className="col-5">
                                <span className="ml-2">
                                    <label style={{ color: "white" }} htmlFor="statusSetorVisao">Ativo: *</label>  <br></br>
                                    <Checkbox inputId="statusSetorVisao" name="statusSetorVisao" checked={statusSetorVisao} onChange={e => setStatusSetorVisao(e.checked)} />
                                </span>

                            </div>

                            <div className="col-2">
                                <br></br>
                                <Button type="button"
                                    //disabled={disableAddEmailButton()}
                                    label="Adicionar Setor"
                                    onClick={handleAddSetor} />
                            </div>


                            {formik.values.setor &&
                                <div className="col-12">
                                    <DataTable value={formik.values.setor} emptyMessage="Nenhum Setor adicionado.">
                                        <Column  style={{width: "10%"}} body={(item: Setor) => {
                                            const handleRemoverItem = () => {
                                                const novaLista = formik.values.setor.filter(
                                                    em => em.setNome !== item.setNome
                                                );
                                                formik.setFieldValue("setor", novaLista);
                                            };

                                            return (
                                                <Button  icon="pi pi-trash" className="p-button-rounded p-button-danger" type="button" label="Excluir" onClick={handleRemoverItem} />
                                            );
                                        } } />

                                        <Column field="setNome" header="Nome" />
                                        <Column field="setStatus" header="Ativo" />
                                        <Column field="empresa.empNome" header="Empresa" />                                  

                                    </DataTable>
                                </div>}

                                <Button onClick={handleSalvaSetor} label="Finalizar Cadastro Empresa" />

                        
                                


                        </TabPanel>    

                    </TabView>
                <div>

                        <DataTable ref={dt} value={empresas} selection={selectedEmpresas} onSelectionChange={(e) => setSelectedEmpresas(e.value)}
                            dataKey="empCodigo" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} empresas"
                            globalFilter={globalFilter}  header={header} responsiveLayout="stack">

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

                    <div className="field col">
                        <label htmlFor="createdAt">Data Criação: </label>
                        <InputText id="createdAt" value={empresa?.createdAt} disabled/>
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



            </div>
            </div>

        </div>

            
        );
}