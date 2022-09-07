import {httpClient} from 'app/http'
import { StatusSubComponente } from 'app/model/status_sub_componente'
import { AxiosResponse } from 'axios'


const resourceURL: string = "/statussubcomponentes"




export const useStatusSubComponenteService = () => {

   

    const salvar = async (statusSubComponente: StatusSubComponente) : Promise <StatusSubComponente> => { 
        const response : AxiosResponse <StatusSubComponente> =  await httpClient.post<StatusSubComponente>(resourceURL, statusSubComponente)
        return response.data;
    }


    const atualizar = async (statusSubComponente: StatusSubComponente) : Promise < void > => {
        const url: string =`${resourceURL}/${statusSubComponente.sscCodigo}`
        await httpClient.put <StatusSubComponente>(url, statusSubComponente)

    }

    const carregar = async (sscCodigo: any) : Promise<StatusSubComponente> => {
        const url: string = `${resourceURL}/${sscCodigo}`
        const response: AxiosResponse<StatusSubComponente> = await httpClient.get(url);
        return response.data;
    }

    const deletar = async (sscCodigo: any) : Promise<void> => {
        const url: string = `${resourceURL}/${sscCodigo}`
        await httpClient.delete(url)
    }

    const listar = async () : Promise<StatusSubComponente[]> => {
        const response: AxiosResponse<StatusSubComponente[]> = await httpClient.get(resourceURL)
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