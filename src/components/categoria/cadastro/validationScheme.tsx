import * as Yup from 'yup'

export const validationScheme = Yup.object().shape({

    catDescricao: Yup.string().trim().required("Campo obrigatório."),
    
    
    
})