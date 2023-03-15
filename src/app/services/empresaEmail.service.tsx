import {httpClient} from 'app/http'
import { EmpresaEmail } from 'app/model/empresaEmail'
import { AxiosResponse } from 'axios'



const resourceURL: string = "/empresaemails"




export const useEmpresaEmailService = () => {

   

    const salvar = async (empresaEmail: EmpresaEmail) : Promise <EmpresaEmail> => {
        console.log(empresaEmail)
        const response : AxiosResponse <EmpresaEmail> =  await httpClient.post<EmpresaEmail>(resourceURL, empresaEmail)
        return response.data;
    }
   
    const atualizar = async (empresaEmail: EmpresaEmail) : Promise < EmpresaEmail > => {
        const url: string =`${resourceURL}/${empresaEmail.emeCodigo}`
        const response : AxiosResponse <EmpresaEmail> = await httpClient.put <EmpresaEmail>(url, empresaEmail)
        return response.data;

    }


    const carregar = async (emeCodigo: any) : Promise<EmpresaEmail> => {
        const url: string = `${resourceURL}/${emeCodigo}`
        const response: AxiosResponse<EmpresaEmail> = await httpClient.get(url);
        return response.data;
    }

    const deletar = async (emeCodigo: any) : Promise<void> => {
        const url: string = `${resourceURL}/${emeCodigo}`
        console.log(url)
        await httpClient.delete(url)
    }

    const listar = async () : Promise<EmpresaEmail[]> => {
        const response: AxiosResponse<EmpresaEmail[]> = await httpClient.get(resourceURL)
        return response.data
    }


    return{
        salvar,
        atualizar,
        carregar,
        deletar,
        listar
    }
}