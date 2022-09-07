import * as Yup from 'yup'

export const validationScheme = Yup.object().shape({
   
    
    ialDescricao: Yup.string().trim().required("Campo obrigatório."),
    ialStatus: Yup.string().trim().required("Campo obrigatório."),
    
    
    
})