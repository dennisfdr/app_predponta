import {httpClient} from 'app/http'
import { InspecaoTermografica } from 'app/model/inspecao_termografica'
import { Medicao } from 'app/model/medicao'
import { AxiosResponse } from 'axios'


const resourceURL: string = "/inspecaotermografica"
const resourceURLMedicao: string = "/inspecaotermografica/medicao"


export const useInspecaoTermograficaService = () => {

   

    const salvar = async (inspecaoTermografica: InspecaoTermografica) : Promise <InspecaoTermografica> => { 
        const response : AxiosResponse <InspecaoTermografica> =  await httpClient.post<InspecaoTermografica>(resourceURL, inspecaoTermografica)
        return response.data;
    }


    const atualizar = async (inspecaoTermografica: InspecaoTermografica) : Promise < void > => {
        const url: string =`${resourceURL}/${inspecaoTermografica.iteCodigo}`
        await httpClient.put <InspecaoTermografica>(url, inspecaoTermografica)

    }

    const carregar = async (iteCodigo: any) : Promise<InspecaoTermografica> => {
        const url: string = `${resourceURL}/${iteCodigo}`
        const response: AxiosResponse<InspecaoTermografica> = await httpClient.get(url);
        return response.data;
    }

    const carregarByMedicao = async (medicao: Medicao) : Promise<InspecaoTermografica[]> => {  
        const url: string = `${resourceURLMedicao}/${medicao.medCodigo}`
        const response: AxiosResponse<InspecaoTermografica[]> = await httpClient.get(url);
        return response.data
    }

    
  

    const deletar = async (iteCodigo: any) : Promise<void> => {
        const url: string = `${resourceURL}/${iteCodigo}`
        await httpClient.delete(url)
    }

    const listar = async () : Promise<InspecaoTermografica[]> => {
        const response: AxiosResponse<InspecaoTermografica[]> = await httpClient.get(resourceURL)
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