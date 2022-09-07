import * as Yup from 'yup'

export const validationScheme = Yup.object().shape({

    mcasrDescricao: Yup.string().trim().required("Campo obrigatório."),
    mcasrCor: Yup.string().trim().required("Campo obrigatório."),
    
    
})