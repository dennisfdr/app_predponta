import {httpClient} from 'app/http'
import { MedicaoAnaliseVibracao } from 'app/model/medicao_analise_vibracao'
import { StatusComponenteVibracao } from 'app/model/status_componente_vibracao'
import { AxiosResponse } from 'axios'


const resourceURL: string = "/statuscomponentevibracao"
const resourceURLMedicaoAnaliseVibracao: string = "/statuscomponentevibracao/medicaoAnaliseVibracao"

export const useStatusComponenteVibracaoService = () => {

   

    const salvar = async (statuscomponentevibracao: StatusComponenteVibracao) : Promise <StatusComponenteVibracao> => {
        const response : AxiosResponse <StatusComponenteVibracao> =  await httpClient.post<StatusComponenteVibracao>(resourceURL, statuscomponentevibracao)
        return response.data;
    }


    const atualizar = async (statuscomponentevibracao: StatusComponenteVibracao) : Promise < void > => {
        const url: string =`${resourceURL}/${statuscomponentevibracao.scvCodigo}`
        await httpClient.put <StatusComponenteVibracao>(url, statuscomponentevibracao)

    }

    const carregar = async (scvCodigo: any) : Promise<StatusComponenteVibracao> => {
        const url: string = `${resourceURL}/${scvCodigo}`
        const response: AxiosResponse<StatusComponenteVibracao> = await httpClient.get(url);
        return response.data;
    }

    const carregarByMedicaoAnaliseVibracao = async (medicaoAnaliseVibracao: MedicaoAnaliseVibracao) : Promise<StatusComponenteVibracao[]> => {  
        const url: string = `${resourceURLMedicaoAnaliseVibracao}/${medicaoAnaliseVibracao.mavCodigo}`
        const response: AxiosResponse<StatusComponenteVibracao[]> = await httpClient.get(url);
        return response.data
    }


    const deletar = async (scvCodigo: any) : Promise<void> => {
        const url: string = `${resourceURL}/${scvCodigo}`
        await httpClient.delete(url)
    }

    const listar = async () : Promise<StatusComponenteVibracao[]> => {
        const response: AxiosResponse<StatusComponenteVibracao[]> = await httpClient.get(resourceURL)
        return response.data
    }


    return{
        salvar,
        atualizar,
        carregar,
        carregarByMedicaoAnaliseVibracao,
        deletar,
        listar
    }
}