import {httpClient} from 'app/http'
import {Empresa} from 'app/dtos/empresas'
import { AxiosResponse } from 'axios'

const resourceURL: string = "/empresas"


export const useEmpresaService = () => {

    const salvar = async (empresa: Empresa) : Promise <Empresa> => {
        const response : AxiosResponse <Empresa> =  await httpClient.post<Empresa>(resourceURL, empresa)
        return response.data;
    }

    const atualizar = async (empresa: Empresa) : Promise < void > => {
        const url: string =`${resourceURL}/${empresa.empCodigo}`
        await httpClient.put <Empresa>(url, empresa)

    }

    const carregar = async (empCodigo: any) : Promise<Empresa> => {
        const url: string = `${resourceURL}/${empCodigo}`
        const response: AxiosResponse<Empresa> = await httpClient.get(url);
        return response.data;
    }

    const deletar = async (empCodigo: any) : Promise<void> => {
        const url: string = `${resourceURL}/${empCodigo}`
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