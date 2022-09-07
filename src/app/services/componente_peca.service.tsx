import {httpClient} from 'app/http'
import { Componente_Peca } from 'app/model/componente_peca'
import { Componente } from 'app/model/componentes'
import { AxiosResponse } from 'axios'


const resourceURL: string = "/componentepecas"
const resourceURLComponente: string = "/componentepecas/componente"





export const useComponentePecaService = () => {

   

    const salvar = async (componentePeca: Componente_Peca) : Promise <Componente_Peca> => {
        const response : AxiosResponse <Componente_Peca> =  await httpClient.post<Componente_Peca>(resourceURL, componentePeca)
        return response.data;
    }


    const atualizar = async (componentePeca: Componente_Peca) : Promise < void > => {
        const url: string =`${resourceURL}/${componentePeca.copCodigo}`
        await httpClient.put <Componente_Peca>(url, componentePeca)

    }

    const carregar = async (copCodigo: any) : Promise<Componente_Peca> => {
        const url: string = `${resourceURL}/${copCodigo}`
        const response: AxiosResponse<Componente_Peca> = await httpClient.get(url);
        return response.data;
    }

    const carregarByComponente = async (componente: Componente) : Promise<Componente_Peca[]> => {  
        const url: string = `${resourceURLComponente}/${componente.comCodigo}`
        const response: AxiosResponse<Componente_Peca[]> = await httpClient.get(url);
        return response.data
    }

    

    const deletar = async (copCodigo: any) : Promise<void> => {
        const url: string = `${resourceURL}/${copCodigo}`
        await httpClient.delete(url)
    }

    const listar = async () : Promise<Componente_Peca[]> => {
        const response: AxiosResponse<Componente_Peca[]> = await httpClient.get(resourceURL)
        return response.data
    }


    return{
        salvar,
        atualizar,
        carregar,
        deletar,
        carregarByComponente,
        listar
    }
}