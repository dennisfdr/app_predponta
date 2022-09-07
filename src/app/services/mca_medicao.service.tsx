import {httpClient} from 'app/http'
import { McaMedicao } from 'app/model/mca_medicao'
import { Medicao } from 'app/model/medicao'
import { AxiosResponse } from 'axios'


const resourceURL: string = "/mcamedicao"
const resourceURLMedicao: string = "/mcamedicao/medicao"


export const useMcaMedicaoService = () => {

   

    const salvar = async (mcaMedicao: McaMedicao) : Promise <McaMedicao> => { 
        console.log(resourceURL)
        const response : AxiosResponse <McaMedicao> =  await httpClient.post<McaMedicao>(resourceURL, mcaMedicao)
        return response.data;
    }


    const atualizar = async (mcaMedicao: McaMedicao) : Promise < void > => {
        const url: string =`${resourceURL}/${mcaMedicao.memCodigo}`
        await httpClient.put <McaMedicao>(url, mcaMedicao)

    }

    const carregar = async (memCodigo: any) : Promise<McaMedicao> => {
        const url: string = `${resourceURL}/${memCodigo}`
        const response: AxiosResponse<McaMedicao> = await httpClient.get(url);
        return response.data;
    }

    const carregarByMedicao = async (medicao: Medicao) : Promise<McaMedicao[]> => {  
        const url: string = `${resourceURLMedicao}/${medicao.medCodigo}`
        console.log(url)
        const response: AxiosResponse<McaMedicao[]> = await httpClient.get(url);
        return response.data
    }

    
  

    const deletar = async (memCodigo: any) : Promise<void> => {
        const url: string = `${resourceURL}/${memCodigo}`
        await httpClient.delete(url)
    }

    const listar = async () : Promise<McaMedicao[]> => {
        const response: AxiosResponse<McaMedicao[]> = await httpClient.get(resourceURL)
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