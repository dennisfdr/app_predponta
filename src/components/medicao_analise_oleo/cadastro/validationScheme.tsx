import * as Yup from 'yup'

export const validationScheme = Yup.object().shape({
   
    maoData: Yup.string().trim().required("Campo obrigatório."),
    
    
})