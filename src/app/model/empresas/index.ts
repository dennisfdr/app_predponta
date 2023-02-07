

export interface Empresa {
    
    empCodigo?: string;
    empNome?: string;
    empStatus?: string;
    createdAt?: string;
    empProxMedicaoIt: string;
    empProxMedicaoRi: string;
    empProxMedicaoMca: string;
    updateAt?:string;
    empPeriodicidadeIt?: string;
    empPeriodicidadeRi?: string;
    empPeriodicidadeMca?: string;
    empresaEmail?: Array<EmpresaEmail>;
    imagens?: Array<ArquivoUpload>;
    setor?: Array<Setor>;
    
}


export interface EmpresaEmail {
    emeEmail?: string;
    emeResponsavel?: string;
    empresa?: Empresa
}

export interface ArquivoUpload {
    aruDescricao?: string;
    aruArquivo?: string;
    aruNomeOriginalArquivo?: string;
    aruData?: string;
    empresa?: Empresa
}

export interface Setor {
    setCodigo?:string;
    setNome?: string;
    setStatus?: boolean;
    empresa?: Empresa
}