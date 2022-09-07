import {httpClient} from 'app/http'
import { InspecaoAcusticaLocal } from 'app/model/inspecao_acustica_local'
import { RelatorioIntervencao } from 'app/model/relatorio_intervencao'
import { AxiosResponse } from 'axios'


const resourceURL: string = "/relatoriointervencaos"
const resourceURLInspecaoAcusticaLocal: string = "/relatoriointervencaos/inspecaoAcusticaLocal"

export const useRelatorioIntervencaoService = () => {

   

    const salvar = async (relatorioIntervencao: RelatorioIntervencao) : Promise <RelatorioIntervencao> => { 
        const response : AxiosResponse <RelatorioIntervencao> =  await httpClient.post<RelatorioIntervencao>(resourceURL, relatorioIntervencao)
        return response.data;
    }


    const atualizar = async (relatorioIntervencao: RelatorioIntervencao) : Promise < void > => {
        const url: string =`${resourceURL}/${relatorioIntervencao.riCodigo}`
        await httpClient.put <RelatorioIntervencao>(url, relatorioIntervencao)

    }

    const carregar = async (riCodigo: any) : Promise<RelatorioIntervencao> => {
        const url: string = `${resourceURL}/${riCodigo}`
        const response: AxiosResponse<RelatorioIntervencao> = await httpClient.get(url);
        return response.data;
    }


    const carregarByInspecaoAcusticaLocal = async (inspecaoAcusticaLocal: InspecaoAcusticaLocal) : Promise<RelatorioIntervencao[]> => {  
        const url: string = `${resourceURLInspecaoAcusticaLocal}/${inspecaoAcusticaLocal.ialCodigo}`
        const response: AxiosResponse<RelatorioIntervencao[]> = await httpClient.get(url);
        return response.data
    }

    
  

    const deletar = async (riCodigo: any) : Promise<void> => {
        const url: string = `${resourceURL}/${riCodigo}`
        await httpClient.delete(url)
    }

    const listar = async () : Promise<RelatorioIntervencao[]> => {
        const response: AxiosResponse<RelatorioIntervencao[]> = await httpClient.get(resourceURL)
        return response.data
    }


    return{
        salvar,
        atualizar,
        carregar,
        carregarByInspecaoAcusticaLocal,
        deletar,
        listar
    }
}