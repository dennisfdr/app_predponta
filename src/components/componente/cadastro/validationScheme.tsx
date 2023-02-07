import * as Yup from 'yup'

export const validationScheme = Yup.object().shape({
   

    hcoObservacao: Yup.string().trim().required("Campo obrigatório."),
    hcoOrdemServico: Yup.string().trim().required("Campo obrigatório."),
    
    
    
})