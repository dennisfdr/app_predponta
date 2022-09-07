import {httpClient} from 'app/http'
import { Componente } from 'app/model/componentes'
import { Medicao } from 'app/model/medicao'
import { AxiosResponse } from 'axios'


const resourceURL: string = "/medicaos"
const resourceURLComponente: string = "/medicaos/componente"






export const useMedicaoService = () => {

   

    const salvar = async (medicao: Medicao) : Promise <Medicao> => {
        const response : AxiosResponse <Medicao> =  await httpClient.post<Medicao>(resourceURL, medicao)
        return response.data;
    }


    const atualizar = async (medicao: Medicao) : Promise < void > => {
        const url: string =`${resourceURL}/${medicao.medCodigo}`
        await httpClient.put <Medicao>(url, medicao)

    }

    const carregar = async (meCodigo: any) : Promise<Medicao> => {
        const url: string = `${resourceURL}/${meCodigo}`
        const response: AxiosResponse<Medicao> = await httpClient.get(url);
        return response.data;
    }

    const carregarByComponente = async (componente: Componente) : Promise<Medicao[]> => {  
        const url: string = `${resourceURLComponente}/${componente.comCodigo}`
        const response: AxiosResponse<Medicao[]> = await httpClient.get(url);
        return response.data
    }
    

    const deletar = async (medCodigo: any) : Promise<void> => {
        const url: string = `${resourceURL}/${medCodigo}`
        await httpClient.delete(url)
    }

    const listar = async () : Promise<Medicao[]> => {
        const response: AxiosResponse<Medicao[]> = await httpClient.get(resourceURL)
        return response.data
    }


    return{
        salvar,
        atualizar,
        carregar,
        carregarByComponente,
        deletar,
        listar
    }
}