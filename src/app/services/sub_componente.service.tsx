import {httpClient} from 'app/http'
import { Sub_Componente } from 'app/model/sub_componente'
import { Componente_Peca } from 'app/model/componente_peca'
import { AxiosResponse } from 'axios'


const resourceURL: string = "/subcomponentes"
const resourceURLComponentePeca: string = "/subcomponentes/componentePeca"





export const useSubComponenteService = () => {

   

    const salvar = async (subComponente: Sub_Componente) : Promise <Sub_Componente> => {
        const response : AxiosResponse <Sub_Componente> =  await httpClient.post<Sub_Componente>(resourceURL, subComponente)
        return response.data;
    }


    const atualizar = async (subComponente: Sub_Componente) : Promise < void > => {
        const url: string =`${resourceURL}/${subComponente.scoCodigo}`
        await httpClient.put <Sub_Componente>(url, subComponente)

    }

    const carregar = async (scoCodigo: any) : Promise<Sub_Componente> => {
        const url: string = `${resourceURL}/${scoCodigo}`
        const response: AxiosResponse<Sub_Componente> = await httpClient.get(url);
        return response.data;
    }

    const carregarByComponentePeca = async (componentePeca: Componente_Peca) : Promise<Sub_Componente[]> => {  
        const url: string = `${resourceURLComponentePeca}/${componentePeca.copCodigo}`
        const response: AxiosResponse<Sub_Componente[]> = await httpClient.get(url);
        return response.data
    }

    

    const deletar = async (scoCodigo: any) : Promise<void> => {
        const url: string = `${resourceURL}/${scoCodigo}`
        await httpClient.delete(url)
    }

    const listar = async () : Promise<Sub_Componente[]> => {
        const response: AxiosResponse<Sub_Componente[]> = await httpClient.get(resourceURL)
        return response.data
    }


    return{
        salvar,
        atualizar,
        carregar,
        deletar,
        carregarByComponentePeca,
        listar
    }
}