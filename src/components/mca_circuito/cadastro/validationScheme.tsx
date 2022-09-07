import * as Yup from 'yup'

export const validationScheme = Yup.object().shape({

    mccDescricao: Yup.string().trim().required("Campo obrigatório."),
    mccTag: Yup.string().trim().required("Campo obrigatório."),
    mccStatus: Yup.string().trim().required("Campo obrigatório."),
    //mccFoto: Yup.string().trim().required("Campo obrigatório."),
    
})