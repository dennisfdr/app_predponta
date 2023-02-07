import * as Yup from 'yup'

export const validationScheme = Yup.object().shape({
   

    maqNome: Yup.string().trim().required("Campo obrigatório."),
    maqAndar: Yup.string().trim().required("Campo obrigatório."),
    maqStatus: Yup.string().trim().required("Campo obrigatório."),
    

})