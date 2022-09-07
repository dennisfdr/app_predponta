import * as Yup from 'yup'

export const validationScheme = Yup.object().shape({
   

    empNome: Yup.string().trim().required("Campo obrigatório."),
    empStatus: Yup.string().trim().required("Campo obrigatório."),
    empProxMedicaoIt: Yup.string().trim().required("Campo obrigatório."),
    empProxMedicaoRi:Yup.string().trim().required("Campo obrigatório."),
    empProxMedicaoMca:Yup.string().trim().required("Campo obrigatório."),
    empPeriodicidadeIt: Yup.string().trim().required("Campo obrigatório."),
    empPeriodicidadeRi: Yup.string().trim().required("Campo obrigatório."),
    empPeriodicidadeMca: Yup.string().trim().required("Campo obrigatório."),
    emeEmail: Yup.string().trim().required("Campo obrigatório."),
    emeResponsavel: Yup.string().trim().required("Campo obrigatório.")

})