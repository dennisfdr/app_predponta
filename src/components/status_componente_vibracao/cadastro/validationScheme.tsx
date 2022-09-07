import * as Yup from 'yup'

export const validationScheme = Yup.object().shape({
   

    scvDescricao: Yup.string().trim().required("Campo obrigatório."),
    scvCor: Yup.string().trim().required("Campo obrigatório."),
    scvOrdem: Yup.string().trim().required("Campo obrigatório."),
    
    
    
    
})