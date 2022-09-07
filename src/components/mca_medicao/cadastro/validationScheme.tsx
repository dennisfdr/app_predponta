import * as Yup from 'yup'

export const validationScheme = Yup.object().shape({
   
    memData: Yup.string().trim().required("Campo obrigatório."),
    
})