import * as Yup from 'yup'

export const validationScheme = Yup.object().shape({
    
    
   camTemperatura: Yup.string().trim().required("Campo obrigatório."),
    camCarga: Yup.string().trim().required("Campo obrigatório."),
    camPontoTermograma: Yup.string().trim().required("Campo obrigatório."),
    camEmissividade: Yup.string().trim().required("Campo obrigatório."),

   
    
    
})