import {httpClient} from 'app/http'
import { McaMedicao } from 'app/model/mca_medicao'
import { McaRelatorio } from 'app/model/mca_relatorio'
import { AxiosResponse } from 'axios'


const resourceURL: string = "/mcarelatorio"
const resourceURLMedicao: string = "/mcarelatorio/mecamedicao/"


export const useMcaRelatorioService = () => {

   

    const salvar = async (mcaRelatorio: McaRelatorio) : Promise <McaRelatorio> => { 
        console.log(resourceURL)
        const response : AxiosResponse <McaRelatorio> =  await httpClient.post<McaRelatorio>(resourceURL, mcaRelatorio)
        return response.data;
    }


    const atualizar = async (mcaRelatorio: McaRelatorio) : Promise < void > => {
        const url: string =`${resourceURL}/${mcaRelatorio.mcrCodigo}`
        await httpClient.put <McaRelatorio>(url, mcaRelatorio)

    }

    const carregar = async (memCodigo: any) : Promise<McaRelatorio> => {
        const url: string = `${resourceURL}/${memCodigo}`
        const response: AxiosResponse<McaRelatorio> = await httpClient.get(url);
        return response.data;
    }

    const carregarByMcaMedicao = async (mcaMedicao: McaMedicao) : Promise<McaRelatorio[]> => {  
        const url: string = `${resourceURLMedicao}/${mcaMedicao.memCodigo}`
        const response: AxiosResponse<McaRelatorio[]> = await httpClient.get(url);
        return response.data
    }

    
  

    const deletar = async (memCodigo: any) : Promise<void> => {
        const url: string = `${resourceURL}/${memCodigo}`
        await httpClient.delete(url)
    }

    const listar = async () : Promise<McaRelatorio[]> => {
        const response: AxiosResponse<McaRelatorio[]> = await httpClient.get(resourceURL)
        return response.data
    }


    return{
        salvar,
        atualizar,
        carregar,
        carregarByMcaMedicao,
        deletar,
        listar
    }
}