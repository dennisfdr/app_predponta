import * as Yup from 'yup'

export const validationScheme = Yup.object().shape({

    mcasDescricao: Yup.string().trim().required("Campo obrigatório."),
    mcasCor: Yup.string().trim().required("Campo obrigatório."),
    
    
})