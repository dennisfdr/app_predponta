import * as Yup from 'yup'

export const validationScheme = Yup.object().shape({
   
    anoNumero: Yup.string().trim().required("Campo obrigatório."),
    anoTecnico: Yup.string().trim().required("Campo obrigatório."),
    anoContaminacao: Yup.string().trim().required("Campo obrigatório."),
    anoDesgaste: Yup.string().trim().required("Campo obrigatório."),
    anoViscosidade: Yup.string().trim().required("Campo obrigatório."),
    anoObservacao: Yup.string().trim().required("Campo obrigatório."),
    anoNumeroDocumentoAnalise: Yup.string().trim().required("Campo obrigatório."),
    anoNumeroOs: Yup.string().trim().required("Campo obrigatório."),
    anoPosHaviaFalha: Yup.string().trim().required("Campo obrigatório."),
    anoPosHaviaFalhaObs: Yup.string().trim().required("Campo obrigatório."),
    anoPosDiagnosticoFalha: Yup.string().trim().required("Campo obrigatório."),
    anoPosDiagnosticoFalhaObs: Yup.string().trim().required("Campo obrigatório."),
    anoPosTrabalhoAlem: Yup.string().trim().required("Campo obrigatório."),
    anoPosTrabalhoAlemObs: Yup.string().trim().required("Campo obrigatório."),
    anoPosDataIntervencao: Yup.string().trim().required("Campo obrigatório."),
    anoPosTempoExecucao: Yup.string().trim().required("Campo obrigatório."),
    anoPosResponsavel: Yup.string().trim().required("Campo obrigatório."),
    anoPosAvaliado: Yup.string().trim().required("Campo obrigatório."),
    anoPosStatusAvaliacao: Yup.string().trim().required("Campo obrigatório."),
    anoPosBaixada: Yup.string().trim().required("Campo obrigatório."),
    anoPosBaixadaObservacao: Yup.string().trim().required("Campo obrigatório."),
    anoDateInsert: Yup.string().trim().required("Campo obrigatório."),
    anoUserInsert: Yup.string().trim().required("Campo obrigatório."),
    anoPosNumeroOs: Yup.string().trim().required("Campo obrigatório."),
    anoNomeArquivo: Yup.string().trim().required("Campo obrigatório."),
    //anoArquivo: Yup.string().trim().required("Campo obrigatório."),
    
})