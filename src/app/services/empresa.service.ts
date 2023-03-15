import {httpClient} from 'app/http'
import {Empresa} from 'app/model/empresas'
import { AxiosResponse } from 'axios'


const resourceURL: string = "/empresas"




export const useEmpresaService = () => {

   

    const salvar = async (empresa: Empresa) : Promise <Empresa> => {
        const response : AxiosResponse <Empresa> =  await httpClient.post<Empresa>(resourceURL, empresa)
        return response.data;
    }


    
    const atualizar = async (empresa: Empresa) : Promise < Empresa > => {
        const url: string =`${resourceURL}/${empresa.empCodigo}`
        const response : AxiosResponse <Empresa> = await httpClient.put <Empresa>(url, empresa)
        return response.data;

    }


    const carregar = async (empCodigo: any) : Promise<Empresa> => {
        const url: string = `${resourceURL}/${empCodigo}`
        const response: AxiosResponse<Empresa> = await httpClient.get(url);
        return response.data;
    }

    const deletar = async (empCodigo: any) : Promise<void> => {
        const url: string = `${resourceURL}/${empCodigo}`
        console.log(url)
        await httpClient.delete(url)
    }

    const listar = async () : Promise<Empresa[]> => {
        const response: AxiosResponse<Empresa[]> = await httpClient.get(resourceURL)
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