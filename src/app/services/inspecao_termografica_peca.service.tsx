import {httpClient} from 'app/http'
import { InspecaoTermografica } from 'app/model/inspecao_termografica'
import { InspecaoTermograficaPeca } from 'app/model/inspecao_termografica_peca'
import { Medicao } from 'app/model/medicao'
import { AxiosResponse } from 'axios'


const resourceURL: string = "/inspecaotermograficapeca"
const resourceURLInspecaoTermografica: string = "/inspecaotermograficapeca/inspecaotermografica"


export const useInspecaoTermograficaPecaService = () => {

   

    const salvar = async (inspecaoTermograficaPeca: InspecaoTermograficaPeca) : Promise <InspecaoTermograficaPeca> => { 
        const response : AxiosResponse <InspecaoTermograficaPeca> =  await httpClient.post<InspecaoTermograficaPeca>(resourceURL, inspecaoTermograficaPeca)
        return response.data;
    }


    const atualizar = async (inspecaoTermograficaPeca: InspecaoTermograficaPeca) : Promise < void > => {
        const url: string =`${resourceURL}/${inspecaoTermograficaPeca.itpCodigo}`
        await httpClient.put <InspecaoTermograficaPeca>(url, inspecaoTermograficaPeca)

    }

    const carregar = async (itpCodigo: any) : Promise<InspecaoTermograficaPeca> => {
        const url: string = `${resourceURL}/${itpCodigo}`
        const response: AxiosResponse<InspecaoTermograficaPeca> = await httpClient.get(url);
        return response.data;
    }

    const carregarByInspecaoTermografica = async (inspecaoTermografica: InspecaoTermografica) : Promise<InspecaoTermograficaPeca[]> => {  
        const url: string = `${resourceURLInspecaoTermografica}/${inspecaoTermografica.iteCodigo}`
        const response: AxiosResponse<InspecaoTermograficaPeca[]> = await httpClient.get(url);
        return response.data
    }
  

    const deletar = async (itpCodigo: any) : Promise<void> => {
        const url: string = `${resourceURL}/${itpCodigo}`
        await httpClient.delete(url)
    }

    const listar = async () : Promise<InspecaoTermograficaPeca[]> => {
        const response: AxiosResponse<InspecaoTermograficaPeca[]> = await httpClient.get(resourceURL)
        return response.data
    }


    return{
        salvar,
        atualizar,
        carregar,
        carregarByInspecaoTermografica,
        deletar,
        listar
    }
}