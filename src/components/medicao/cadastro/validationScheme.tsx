import * as Yup from 'yup'

export const validationScheme = Yup.object().shape({
   

    medData: Yup.string().trim().required("Campo obrigatório."),
    
    
    
    
})