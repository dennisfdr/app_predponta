import * as Yup from 'yup'

export const validationScheme = Yup.object().shape({
   
    riFalha: Yup.string().trim().required("Campo obrigatório."),
    riEspecificacaoFalha: Yup.string().trim().required("Campo obrigatório."),
    riPosicao: Yup.string().trim().required("Campo obrigatório."),
    riAcaoProposta: Yup.string().trim().required("Campo obrigatório."),
    riEspectro: Yup.string().trim().required("Campo obrigatório."),
    riCurvaTendencia: Yup.string().trim().required("Campo obrigatório."),
    riVideo: Yup.string().trim().required("Campo obrigatório."),
    riStatus: Yup.string().trim().required("Campo obrigatório."),  
    riDataAbertura: Yup.string().trim().required("Campo obrigatório."),
    riDataColeta: Yup.string().trim().required("Campo obrigatório."),
    riFotoComponente: Yup.string().trim().required("Campo obrigatório."),
    riHaviaFalha: Yup.string().trim().required("Campo obrigatório."),
    riHaviaFalhaObs: Yup.string().trim().required("Campo obrigatório."),
    riDiagnosticoFalha: Yup.string().trim().required("Campo obrigatório."),
    riDiagnosticoFalhaObs: Yup.string().trim().required("Campo obrigatório."),
    riTrabalhoAlem: Yup.string().trim().required("Campo obrigatório."),
    riTrabalhoAlemObs: Yup.string().trim().required("Campo obrigatório."),
    riDataIntervencao: Yup.string().trim().required("Campo obrigatório."),
    riTempoExecucao: Yup.string().trim().required("Campo obrigatório."),
    riResponsavel: Yup.string().trim().required("Campo obrigatório."),
    riNumOs: Yup.string().trim().required("Campo obrigatório."),
    riStatusAvaliacao: Yup.string().trim().required("Campo obrigatório."),
    riAvaliado: Yup.string().trim().required("Campo obrigatório."),
    riBaixada: Yup.string().trim().required("Campo obrigatório."),
    riBaixadaObs: Yup.string().trim().required("Campo obrigatório."),
    riPrazoExecucao: Yup.string().trim().required("Campo obrigatório."),
    riCriticidade: Yup.string().trim().required("Campo obrigatório."),
    riEquipamentos: Yup.string().trim().required("Campo obrigatório."),
    riCategoria: Yup.string().trim().required("Campo obrigatório."),
    riNumeroOs: Yup.string().trim().required("Campo obrigatório."),
    riCustoPreditiva: Yup.string().trim().required("Campo obrigatório."),
    riCustoCorretiva: Yup.string().trim().required("Campo obrigatório."),
    riQuebraEquipamento: Yup.string().trim().required("Campo obrigatório."),
    
    
    
    
    
    
    
})