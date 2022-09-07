import * as Yup from 'yup'

export const validationScheme = Yup.object().shape({
   

    hcvObservacao: Yup.string().trim().required("Campo obrigatório."),
    hcvOrdemServico: Yup.string().trim().required("Campo obrigatório."),
    
})