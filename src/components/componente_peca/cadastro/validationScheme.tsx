import * as Yup from 'yup'

export const validationScheme = Yup.object().shape({
   

    copDescricao: Yup.string().trim().required("Campo obrigatório."),
    copStatus: Yup.string().trim().required("Campo obrigatório."),
    
    
    
})