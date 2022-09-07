import {httpClient} from 'app/http'
import { HistoricoComponente } from 'app/model/historico_componentes'
import { AxiosResponse } from 'axios'


const resourceURL: string = "/historicocomponentes"




export const useHistoricoComponenteService = () => {

   

    const salvar = async (historicoComponente: HistoricoComponente) : Promise <HistoricoComponente> => {
        
        const response : AxiosResponse <HistoricoComponente> =  await httpClient.post<HistoricoComponente>(resourceURL, historicoComponente)
        return response.data;
    }


    const atualizar = async (historicoComponente: HistoricoComponente) : Promise < void > => {
        const url: string =`${resourceURL}/${historicoComponente.hcoCodigo}`
        await httpClient.put <HistoricoComponente>(url, historicoComponente)

    }

    const carregar = async (hcoCodigo: any) : Promise<HistoricoComponente> => {
        const url: string = `${resourceURL}/${hcoCodigo}`
        const response: AxiosResponse<HistoricoComponente> = await httpClient.get(url);
        return response.data;
    }

    const deletar = async (hcoCodigo: any) : Promise<void> => {
        const url: string = `${resourceURL}/${hcoCodigo}`
        await httpClient.delete(url)
    }

    const listar = async () : Promise<HistoricoComponente[]> => {
        const response: AxiosResponse<HistoricoComponente[]> = await httpClient.get(resourceURL)
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