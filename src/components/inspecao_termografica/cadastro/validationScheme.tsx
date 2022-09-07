import * as Yup from 'yup'

export const validationScheme = Yup.object().shape({
   
    itePosicao: Yup.string().trim().required("Campo obrigatório."),
    iteFase: Yup.string().trim().required("Campo obrigatório."),
    iteFalha: Yup.string().trim().required("Campo obrigatório."),
    iteAcaoProposta: Yup.string().trim().required("Campo obrigatório."),
    iteFotoCamera: Yup.string().trim().required("Campo obrigatório."),
    iteFotoTermografica: Yup.string().trim().required("Campo obrigatório."),
    itePosHaviaFalha: Yup.string().trim().required("Campo obrigatório."),
    itePosHaviaFalhaObs: Yup.string().trim().required("Campo obrigatório."),
    itePosDiagnosticoFalha: Yup.string().trim().required("Campo obrigatório."),
    itePosDiagnosticoFalhaObs: Yup.string().trim().required("Campo obrigatório."),
    itePosTrabalhoAlem: Yup.string().trim().required("Campo obrigatório."),
    itePosTrabalhoAlemObs: Yup.string().trim().required("Campo obrigatório."),
    itePosDataIntervencao: Yup.string().trim().required("Campo obrigatório."),
    itePosTempoExecucao: Yup.string().trim().required("Campo obrigatório."),
    itePosResponsavel: Yup.string().trim().required("Campo obrigatório."),
    itePosNumeroOs: Yup.string().trim().required("Campo obrigatório."),
    itePosAvaliacaoIt: Yup.string().trim().required("Campo obrigatório."),
    iteDataAvaliacao: Yup.string().trim().required("Campo obrigatório."),
    iteStatus: Yup.string().trim().required("Campo obrigatório."),
    iteDataCriacao: Yup.string().trim().required("Campo obrigatório."),
    iteTipo: Yup.string().trim().required("Campo obrigatório."),
    iteFotoPainel: Yup.string().trim().required("Campo obrigatório."),
    iteFotoPainelDesc: Yup.string().trim().required("Campo obrigatório."),
    iteDataBaixa: Yup.string().trim().required("Campo obrigatório."),
    itePrazoExecucao: Yup.string().trim().required("Campo obrigatório."),
    iteEquipamentos: Yup.string().trim().required("Campo obrigatório."),
    iteTecnicoResponsavel: Yup.string().trim().required("Campo obrigatório."),
    iteNumeroOs: Yup.string().trim().required("Campo obrigatório."),
    iteCustoPreditiva: Yup.string().trim().required("Campo obrigatório."),
    iteCustoCorretiva: Yup.string().trim().required("Campo obrigatório."),
    iteQuebraEquipamento: Yup.string().trim().required("Campo obrigatório."),
    itePainelNumPortas: Yup.string().trim().required("Campo obrigatório."),
    
    
})