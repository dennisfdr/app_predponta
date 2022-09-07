import {httpClient} from 'app/http'
import { McaCircuito } from 'app/model/mca_circuito'
import { AxiosResponse } from 'axios'


const resourceURL: string = "/mcacircuito"



export const useMcaCircuitoService = () => {

   

    const salvar = async (mcaCircuito: McaCircuito) : Promise <McaCircuito> => { 
        console.log(resourceURL)
        const response : AxiosResponse <McaCircuito> =  await httpClient.post<McaCircuito>(resourceURL, mcaCircuito)
        return response.data;
    }


    const atualizar = async (mcaCircuito: McaCircuito) : Promise < void > => {
        const url: string =`${resourceURL}/${mcaCircuito.mccCodigo}`
        await httpClient.put <McaCircuito>(url, mcaCircuito)

    }

    const carregar = async (mccCodigo: any) : Promise<McaCircuito> => {
        const url: string = `${resourceURL}/${mccCodigo}`
        const response: AxiosResponse<McaCircuito> = await httpClient.get(url);
        return response.data;
    }

      

    const deletar = async (mccCodigo: any) : Promise<void> => {
        const url: string = `${resourceURL}/${mccCodigo}`
        await httpClient.delete(url)
    }

    const listar = async () : Promise<McaCircuito[]> => {
        const response: AxiosResponse<McaCircuito[]> = await httpClient.get(resourceURL)
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