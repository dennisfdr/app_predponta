import {httpClient} from 'app/http'
import { CondicoesAmbiente } from 'app/model/condicoes_ambiente'
import { InspecaoTermograficaPeca } from 'app/model/inspecao_termografica_peca'
import { AxiosResponse } from 'axios'


const resourceURL: string = "/condicoesambiente"
const resourceURLInspecaoTermograficaPeca: string = "/condicoesambiente/inspecaotermograficapeca/"


export const useCondicoesAmbienteService = () => {

   

    const salvar = async (condicoesAmbiente: CondicoesAmbiente) : Promise <CondicoesAmbiente> => { 
        const response : AxiosResponse <CondicoesAmbiente> =  await httpClient.post<CondicoesAmbiente>(resourceURL, condicoesAmbiente)
        return response.data;
    }


    const atualizar = async (condicoesAmbiente: CondicoesAmbiente) : Promise < void > => {
        const url: string =`${resourceURL}/${condicoesAmbiente.camCodigo}`
        await httpClient.put <CondicoesAmbiente>(url, condicoesAmbiente)

    }

    const carregar = async (camCodigo: any) : Promise<CondicoesAmbiente> => {
        const url: string = `${resourceURL}/${camCodigo}`
        const response: AxiosResponse<CondicoesAmbiente> = await httpClient.get(url);
        return response.data;
    }

    const carregarByInspecaoTermograficaPeca = async (inspecaoTermograficaPeca: InspecaoTermograficaPeca) : Promise<CondicoesAmbiente[]> => {  
        const url: string = `${resourceURLInspecaoTermograficaPeca }/${inspecaoTermograficaPeca.itpCodigo}`
        const response: AxiosResponse<CondicoesAmbiente[]> = await httpClient.get(url);
        return response.data
    }
  

    const deletar = async (camCodigo: any) : Promise<void> => {
        const url: string = `${resourceURL}/${camCodigo}`
        await httpClient.delete(url)
    }

    const listar = async () : Promise<CondicoesAmbiente[]> => {
        const response: AxiosResponse<CondicoesAmbiente[]> = await httpClient.get(resourceURL)
        return response.data
    }


    return{
        salvar,
        atualizar,
        carregar,
        carregarByInspecaoTermograficaPeca,
        deletar,
        listar
    }
}