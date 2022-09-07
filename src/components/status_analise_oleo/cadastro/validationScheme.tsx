import * as Yup from 'yup'

export const validationScheme = Yup.object().shape({
   
    
    saoDescricao: Yup.string().trim().required("Campo obrigatório."),
    saoCor: Yup.string().trim().required("Campo obrigatório."),
    saoOrdem: Yup.string().trim().required("Campo obrigatório."),
    
    
})