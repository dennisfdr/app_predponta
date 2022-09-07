import * as Yup from 'yup'

export const validationScheme = Yup.object().shape({
    
    efaTemperaturaFalha: Yup.string().trim().required("Campo obrigatório."),
    efaTemperaturaAceitavel: Yup.string().trim().required("Campo obrigatório."),
    efaExcessoTemperatura: Yup.string().trim().required("Campo obrigatório."),
    efaPrazoLimite: Yup.string().trim().required("Campo obrigatório."),
    efaPontoTermograma: Yup.string().trim().required("Campo obrigatório."),
    
    
})