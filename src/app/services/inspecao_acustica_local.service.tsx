import {httpClient} from 'app/http'
import { InspecaoAcusticaLocal } from 'app/model/inspecao_acustica_local'
import { Medicao } from 'app/model/medicao'
import { AxiosResponse } from 'axios'


const resourceURL: string = "/inspecaoacusticalocals"
const resourceURLMedicao: string = "/inspecaoacusticalocals/medicao"


export const useInspecaoAcusticaLocalService = () => {

   

    const salvar = async (inspecaoAcusticaLocal: InspecaoAcusticaLocal) : Promise <InspecaoAcusticaLocal> => { 
        const response : AxiosResponse <InspecaoAcusticaLocal> =  await httpClient.post<InspecaoAcusticaLocal>(resourceURL, inspecaoAcusticaLocal)
        return response.data;
    }


    const atualizar = async (inspecaoAcusticaLocal: InspecaoAcusticaLocal) : Promise < void > => {
        const url: string =`${resourceURL}/${inspecaoAcusticaLocal.ialCodigo}`
        await httpClient.put <InspecaoAcusticaLocal>(url, inspecaoAcusticaLocal)

    }

    const carregar = async (ialCodigo: any) : Promise<InspecaoAcusticaLocal> => {
        const url: string = `${resourceURL}/${ialCodigo}`
        const response: AxiosResponse<InspecaoAcusticaLocal> = await httpClient.get(url);
        return response.data;
    }

    const carregarByMedicao = async (medicao: Medicao) : Promise<InspecaoAcusticaLocal[]> => {  
        const url: string = `${resourceURLMedicao}/${medicao.medCodigo}`
        const response: AxiosResponse<InspecaoAcusticaLocal[]> = await httpClient.get(url);
        return response.data
    }
  

    const deletar = async (ialCodigo: any) : Promise<void> => {
        const url: string = `${resourceURL}/${ialCodigo}`
        await httpClient.delete(url)
    }

    const listar = async () : Promise<InspecaoAcusticaLocal[]> => {
        const response: AxiosResponse<InspecaoAcusticaLocal[]> = await httpClient.get(resourceURL)
        return response.data
    }


    return{
        salvar,
        atualizar,
        carregar,
        carregarByMedicao,
        deletar,
        listar
    }
}