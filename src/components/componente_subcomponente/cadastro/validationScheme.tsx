import * as Yup from 'yup'

export const validationScheme = Yup.object().shape({
   

    cscDescricao: Yup.string().trim().required("Campo obrigatório."),
    
    
    
    
})