import {httpClient} from 'app/http'
import { Medicao } from 'app/model/medicao'
import { MedicaoAnaliseVibracao } from 'app/model/medicao_analise_vibracao'
import { AxiosResponse } from 'axios'


const resourceURL: string = "/medicaoanalisevibracao"
const resourceURLMedicao: string = "/medicaoanalisevibracao/medicao"


export const useMedicaoAnaliseVibracaoService = () => {

   

    const salvar = async (medicaoAnaliseVibracao: MedicaoAnaliseVibracao) : Promise <MedicaoAnaliseVibracao> => {
        const response : AxiosResponse <MedicaoAnaliseVibracao> =  await httpClient.post<MedicaoAnaliseVibracao>(resourceURL, medicaoAnaliseVibracao)
        return response.data;
    }


    const atualizar = async (medicaoAnaliseVibracao: MedicaoAnaliseVibracao) : Promise < void > => {
        const url: string =`${resourceURL}/${medicaoAnaliseVibracao.mavCodigo}`
        await httpClient.put <MedicaoAnaliseVibracao>(url, medicaoAnaliseVibracao)

    }

    const carregar = async (mavCodigo: any) : Promise<MedicaoAnaliseVibracao> => {
        const url: string = `${resourceURL}/${mavCodigo}`
        const response: AxiosResponse<MedicaoAnaliseVibracao> = await httpClient.get(url);
        return response.data;
    }

    const carregarByMedicao = async (medicao: Medicao) : Promise<MedicaoAnaliseVibracao[]> => {  
        const url: string = `${resourceURLMedicao}/${medicao.medCodigo}`
        const response: AxiosResponse<MedicaoAnaliseVibracao[]> = await httpClient.get(url);
        return response.data
    }

    const deletar = async (mavCodigo: any) : Promise<void> => {
        const url: string = `${resourceURL}/${mavCodigo}`
        await httpClient.delete(url)
    }

    const listar = async () : Promise<MedicaoAnaliseVibracao[]> => {
        const response: AxiosResponse<MedicaoAnaliseVibracao[]> = await httpClient.get(resourceURL)
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