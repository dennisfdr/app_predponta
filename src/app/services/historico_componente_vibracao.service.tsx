import {httpClient} from 'app/http'
import { HistoricoComponenteVibracao } from 'app/model/historico_componente_vibracao'
import { AxiosResponse } from 'axios'


const resourceURL: string = "/historicocomponentevibracao"


export const useHistoricoComponenteVibracaoService = () => {

   

    const salvar = async (historicocomponentevibracao: HistoricoComponenteVibracao) : Promise <HistoricoComponenteVibracao> => {
        const response : AxiosResponse <HistoricoComponenteVibracao> =  await httpClient.post<HistoricoComponenteVibracao>(resourceURL, historicocomponentevibracao)
        return response.data;
    }


    const atualizar = async (historicocomponentevibracao: HistoricoComponenteVibracao) : Promise < void > => {
        const url: string =`${resourceURL}/${historicocomponentevibracao.hcvCodigo}`
        await httpClient.put <HistoricoComponenteVibracao>(url, historicocomponentevibracao)

    }

    const carregar = async (hcvCodigo: any) : Promise<HistoricoComponenteVibracao> => {
        const url: string = `${resourceURL}/${hcvCodigo}`
        const response: AxiosResponse<HistoricoComponenteVibracao> = await httpClient.get(url);
        return response.data;
    }

    const deletar = async (hcvCodigo: any) : Promise<void> => {
        const url: string = `${resourceURL}/${hcvCodigo}`
        await httpClient.delete(url)
    }

    const listar = async () : Promise<HistoricoComponenteVibracao[]> => {
        const response: AxiosResponse<HistoricoComponenteVibracao[]> = await httpClient.get(resourceURL)
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