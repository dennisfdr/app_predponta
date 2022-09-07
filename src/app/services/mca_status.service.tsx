import {httpClient} from 'app/http'
import { McaStatus } from 'app/model/mca_status'
import { AxiosResponse } from 'axios'


const resourceURL: string = "/mcastatus"



export const useMcaStatusService = () => {

   

    const salvar = async (mcaStatus: McaStatus) : Promise <McaStatus> => { 
        console.log(resourceURL)
        const response : AxiosResponse <McaStatus> =  await httpClient.post<McaStatus>(resourceURL, mcaStatus)
        return response.data;
    }


    const atualizar = async (mcaStatus: McaStatus) : Promise < void > => {
        const url: string =`${resourceURL}/${mcaStatus.mcasCodigo}`
        await httpClient.put <McaStatus>(url, mcaStatus)

    }

    const carregar = async (mcasCodigo: any) : Promise<McaStatus> => {
        const url: string = `${resourceURL}/${mcasCodigo}`
        const response: AxiosResponse<McaStatus> = await httpClient.get(url);
        return response.data;
    }

      

    const deletar = async (mcasCodigo: any) : Promise<void> => {
        const url: string = `${resourceURL}/${mcasCodigo}`
        await httpClient.delete(url)
    }

    const listar = async () : Promise<McaStatus[]> => {
        const response: AxiosResponse<McaStatus[]> = await httpClient.get(resourceURL)
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