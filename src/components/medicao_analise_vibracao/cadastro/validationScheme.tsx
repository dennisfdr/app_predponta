import * as Yup from 'yup'

export const validationScheme = Yup.object().shape({
   

    mavData: Yup.string().trim().required("Campo obrigatório."),
   
    
})