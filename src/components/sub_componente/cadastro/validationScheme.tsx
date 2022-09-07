import * as Yup from 'yup'

export const validationScheme = Yup.object().shape({
   

    scoNome: Yup.string().trim().required("Campo obrigatório."),
    scoStatus: Yup.string().trim().required("Campo obrigatório."),
    
    
    
})