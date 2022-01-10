import React, { useState, useEffect, useRef, ChangeEvent, FormEvent } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import useSWR from 'swr';
import {Menu} from 'components/layout/menu';
import { Calendar } from 'primereact/calendar';

//import { getEmpresas } from '../../EmpresaService';

import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';

import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton, RadioButtonChangeParams } from 'primereact/radiobutton';
import { InputNumber, InputNumberChangeParams } from 'primereact/inputnumber';

import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import 'primereact/resources/themes/luna-amber/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import {Empresa} from 'app/dtos/empresas';
import {useEmpresaService} from 'app/services/empresa.service';

import { httpClient } from 'app/http';
import { AxiosResponse } from 'axios';




function App() {
    let emptyEmpresa: Empresa = {
        empCodigo: '',
        empNome: '',
        empStatus: '',
        createdAt: '',
        empProxMedicaoIt: '',
        
    };
    const service = useEmpresaService()
    const [empresas, setEmpresas] = useState<Empresa[]>([]);
    const [empresaDialog, setEmpresaDialog] = useState(false);
    const [deleteEmpresaDialog, setDeleteEmpresaDialog] = useState(false);
    const [deleteEmpresasDialog, setDeleteEmpresasDialog] = useState(false);
    const [empresa, setEmpresa] = useState<Empresa>(emptyEmpresa);
    const [selectedEmpresas, setSelectedEmpresas] = useState<Empresa[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState<string>();
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable>(null);
    var variavelData = new Date (); 

    const [empProxMedicaoIt, setDate14] = useState<Date | Date[] | undefined>(undefined);
    
    const { data: result, error } = useSWR<AxiosResponse<Empresa[]>>
    ('/empresas', url => httpClient.get(url) )

    
    useEffect( () => {
        setEmpresas(result?.data || [])
    }, [result])


   /* useEffect(() => {
        
        service.salvar
        service.carregar
        service.atualizar

       // getEmpresas().then(data => setEmpresas(data));
    }, []);*/

    const formatCurrency = (value: number) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }


    const openNew = () => {
        setEmpresa(emptyEmpresa);
        setSubmitted(false);
        setEmpresaDialog(true);
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


    const salvar = (empresa: Empresa) => {
        service.salvar(empresa).then(response =>{
          
        })
    }

    const saveEmpresa = () => {
        setSubmitted(true);
        onEmpProxMedicaoIt;
        salvar(empresa);

        if (empresa.empNome?.trim()) {
            let _empresas = [...empresas];
            let _empresa = {...empresa};
            if (empresa.empCodigo) {
                const index = findIndexById(empresa.empCodigo);

                _empresas[index] = _empresa;
                toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Empresa Updated', life: 3000 });
            }
            else {              
                _empresas.push(_empresa);
                toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Empresa Created', life: 3000 });
            }
            
            console.log(empresa);
            setEmpresas(_empresas);
            setEmpresaDialog(false);
            setEmpresa(emptyEmpresa);
        }
    }

    const editEmpresa = (empresa: Empresa) => {
        setEmpresa({...empresa});
        setEmpresaDialog(true);
    }

    const confirmDeleteEmpresa = (empresa: Empresa) => {
        setEmpresa(empresa);
        setDeleteEmpresaDialog(true);
    }
    const deletar = (empresa: Empresa) => {
        service.deletar(empresa.empCodigo).then(response =>{
            let _empresas = empresas.filter(val => val.empCodigo !== empresa.empCodigo);
            setEmpresas(_empresas);
            setDeleteEmpresaDialog(false);
            setEmpresa(emptyEmpresa);
            toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Empresa Deleted', life: 3000 });
            })
    }


    const deleteEmpresa = () => {
       deletar(empresa);        
    }

    const findIndexById = (empCodigo: string) => {
        let index = -1;
        for (let i = 0; i < empresas.length; i++) {
            if (empresas[i].empCodigo === empCodigo) {
                index = i;
                break;
            }
        }

        return index;
    }

   /* const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }*/

    const exportCSV = () => {
        dt.current?.exportCSV({selectionOnly:false});
    }

    const confirmDeleteSelected = () => {
        setDeleteEmpresasDialog(true);
    }

    const deleteSelectedEmpresas = () => {
        let _empresas = empresas.filter(val => !selectedEmpresas.includes(val));
        setEmpresas(_empresas);
        setDeleteEmpresasDialog(false);
        setSelectedEmpresas([]);
        toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Empresas Deleted', life: 3000 });
    }

    /*const onCategoryChange = (e: RadioButtonChangeParams) => {
        let _empresa = {...empresa};
        _empresa['category'] = e.value;
        setEmpresa(_empresa);
    }*/

    const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const val = (e.target && e.target.value) || '';
        let _empresa: Empresa = {...empresa};
        _empresa.empNome = val;

        setEmpresa(_empresa);
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        const val = (e.target && e.target.value) || '';
        let _empresa: Empresa = {...empresa};
        _empresa.empStatus = val;

        setEmpresa(_empresa);
    }

    const onEmpProxMedicaoIt = (data:string) => {
        console.log("data"+data, );
        let _empresa: Empresa = {...empresa};
        _empresa.empProxMedicaoIt = data;

        setEmpresa(_empresa);
    }

    
   // const updateField = (data: Empresa, empProxMedicaoIt: string) => {
   //     setEmpresa({
   //       ...empresa,
   //       [empProxMedicaoIt]: data,
   //     });
    
   //     console.log(empresa);
   //   };

  
    //const priceBodyTemplate = (rowData: Empresa) => {
    //    return (rowData.date !== undefined) ? formatCurrency(rowData.date): '';
    //}
 

    /*const onPriceChange = (e: InputNumberChangeParams) => {
        const val = e.value || 0;
        let _empresa = {...empresa};
        _empresa.price = val;

        setEmpresa(_empresa);
    }

    const onQuantityChange = (e: InputNumberChangeParams) => {
        const val = e.value || 0;
        let _empresa = {...empresa};
        _empresa.quantity = val;

        setEmpresa(_empresa);
    }

    const imageBodyTemplate = (rowData: Empresa) => {
        return <img src={`demo/images/empresa/${rowData.image}`} alt={rowData.image} className="w-7rem shadow-2" />
    }

    const priceBodyTemplate = (rowData: Empresa) => {
        return (rowData.price !== undefined) ? formatCurrency(rowData.price): '';
    }

    const ratingBodyTemplate = (rowData: Empresa) => {
        return <Rating value={rowData.rating} readOnly cancel={false} />;
    }

    const statusBodyTemplate = (rowData: Empresa) => {
        return <span className={`empresa-badge status-${rowData.inventoryStatus?.toLowerCase()}`}>{rowData.inventoryStatus}</span>;
    }*/

    const actionBodyTemplate = (rowData: Empresa) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editEmpresa(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteEmpresa(rowData)} />
            </React.Fragment>
        );
    }

    const header = (
        <div className="flex flex-column md:flex-row md:align-items-center justify-content-between">
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
    const empresaDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveEmpresa} />
        </React.Fragment>
    );

    const deleteEmpresaDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteEmpresaDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteEmpresa} />
        </React.Fragment>
    );

    const deleteEmpresasDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteEmpresasDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedEmpresas} />
        </React.Fragment>
    );

    return (
        <div className="datatable-crud-demo surface-card p-4 border-round shadow-2">
            <Toast ref={toast} />

            <div className="text-3xl text-800 font-bold mb-4">
            EMPRESAS
            <Menu />
                
            </div>

            <DataTable ref={dt} value={empresas} selection={selectedEmpresas} onSelectionChange={(e) => setSelectedEmpresas(e.value)}
                dataKey="empCodigo" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} empresas"
                globalFilter={globalFilter} header={header} responsiveLayout="stack">

                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                <Column field="empCodigo" header="Código" sortable style={{ minWidth: '12rem' }}></Column>
                <Column field="empNome" header="Nome" sortable style={{ minWidth: '16rem' }}></Column>
                <Column field="empStatus" header="Status" sortable style={{ minWidth: '10rem' }}></Column>
                <Column field="createdAt" header="Data" sortable style={{ minWidth: '10rem' }}></Column>
                <Column field="empProxMedicaoIt" header="Prox Med It" sortable style={{ minWidth: '10rem' }}></Column>
                
                <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
            </DataTable>

            <Dialog visible={empresaDialog} breakpoints={{'960px': '75vw', '640px': '100vw'}} style={{width: '40vw'}} header="Empresa Details" modal className="p-fluid" footer={empresaDialogFooter} onHide={hideDialog}>
             
                <div className="field">
                    <label htmlFor="name">Nome</label>
                    <InputText id="name" value={empresa.empNome} onChange={(e) => onNameChange(e)} required autoFocus className={classNames({ 'p-invalid': submitted && !empresa.empNome })} />
                    {submitted && !empresa.empNome && <small className="p-error">Nome é requerido.</small>}

                    <label htmlFor="status">Status</label>
                    <InputText id="status" value={empresa.empStatus} onChange={(e) => onStatusChange(e)} required autoFocus className={classNames({ 'p-invalid': submitted && !empresa.empStatus })} />
                    {submitted && !empresa.empStatus && <small className="p-error">Status é requerido.</small>}

                    <label htmlFor="empProxMedicaoIt">Prox Med It</label>

                    <Calendar id="empProxMedicaoIt" value={empProxMedicaoIt} onChange={(e) => (setDate14(e.value))} mask="99/99/9999"/>


            
                </div>
        
               
            </Dialog>

            <Dialog visible={deleteEmpresaDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteEmpresaDialogFooter} onHide={hideDeleteEmpresaDialog}>
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                    {empresa && <span> Tem certeza de que deseja excluir <b>{empresa.empNome}</b>?</span>}
                </div>
            </Dialog>

            <Dialog visible={deleteEmpresasDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteEmpresasDialogFooter} onHide={hideDeleteEmpresasDialog}>
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                    {empresa && <span>Tem certeza de que deseja excluir as empresas selecionadas?</span>}
                </div>
            </Dialog>
        </div>
    );
}

export default App;