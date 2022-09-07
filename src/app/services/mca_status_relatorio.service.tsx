import {httpClient} from 'app/http'
import { McaStatusRelatorio } from 'app/model/mca_status_relatorio'
import { AxiosResponse } from 'axios'


const resourceURL: string = "/mcastatusrelatorio"



export const useMcaStatusRelatorioService = () => {

   

    const salvar = async (mcaStatusRelatorio: McaStatusRelatorio) : Promise <McaStatusRelatorio> => { 
        console.log(resourceURL)
        const response : AxiosResponse <McaStatusRelatorio> =  await httpClient.post<McaStatusRelatorio>(resourceURL, mcaStatusRelatorio)
        return response.data;
    }


    const atualizar = async (mcaStatusRelatorio: McaStatusRelatorio) : Promise < void > => {
        const url: string =`${resourceURL}/${mcaStatusRelatorio.mcasrCodigo}`
        await httpClient.put <McaStatusRelatorio>(url, mcaStatusRelatorio)

    }

    const carregar = async (mcasrCodigo: any) : Promise<McaStatusRelatorio> => {
        const url: string = `${resourceURL}/${mcasrCodigo}`
        const response: AxiosResponse<McaStatusRelatorio> = await httpClient.get(url);
        return response.data;
    }

      

    const deletar = async (mcasrCodigo: any) : Promise<void> => {
        const url: string = `${resourceURL}/${mcasrCodigo}`
        await httpClient.delete(url)
    }

    const listar = async () : Promise<McaStatusRelatorio[]> => {
        const response: AxiosResponse<McaStatusRelatorio[]> = await httpClient.get(resourceURL)
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