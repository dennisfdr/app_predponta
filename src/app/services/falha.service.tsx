import {httpClient} from 'app/http'
import { Falha } from 'app/model/falha'
import { AxiosResponse } from 'axios'


const resourceURL: string = "/falhas"




export const useFalhaService = () => {

   

    const salvar = async (falha: Falha) : Promise <Falha> => {
        const response : AxiosResponse <Falha> =  await httpClient.post<Falha>(resourceURL, falha)
        return response.data;
    }


    const atualizar = async (falha: Falha) : Promise < void > => {
        const url: string =`${resourceURL}/${falha.falCodigo}`
        await httpClient.put <Falha>(url, falha)

    }

    const carregar = async (falCodigo: any) : Promise<Falha> => {
        const url: string = `${resourceURL}/${falCodigo}`
        const response: AxiosResponse<Falha> = await httpClient.get(url);
        return response.data;
    }



    const deletar = async (falCodigo: any) : Promise<void> => {
        const url: string = `${resourceURL}/${falCodigo}`
        await httpClient.delete(url)
    }

    const listar = async () : Promise<Falha[]> => {
        const response: AxiosResponse<Falha[]> = await httpClient.get(resourceURL)
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