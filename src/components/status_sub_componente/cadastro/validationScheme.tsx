import * as Yup from 'yup'

export const validationScheme = Yup.object().shape({
   

    sscDescricao: Yup.string().trim().required("Campo obrigatório."),
    sscCor: Yup.string().trim().required("Campo obrigatório."),
    
    
    
})