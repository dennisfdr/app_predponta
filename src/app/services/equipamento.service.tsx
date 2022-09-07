import {httpClient} from 'app/http'
import { Equipamento } from 'app/model/equipamento'
import { AxiosResponse } from 'axios'


const resourceURL: string = "/equipamentos"


export const useEquipamentoService = () => {

   

    const salvar = async (equipamento: Equipamento) : Promise <Equipamento> => {
        const response : AxiosResponse <Equipamento> =  await httpClient.post<Equipamento>(resourceURL, equipamento)
        return response.data;
    }


    const atualizar = async (equipamento: Equipamento) : Promise < void > => {
        const url: string =`${resourceURL}/${equipamento.equCodigo}`
        await httpClient.put <Equipamento>(url, equipamento)

    }

    const carregar = async (equCodigo: any) : Promise<Equipamento> => {
        const url: string = `${resourceURL}/${equCodigo}`
        const response: AxiosResponse<Equipamento> = await httpClient.get(url);
        return response.data;
    }

    const deletar = async (equCodigo: any) : Promise<void> => {
        const url: string = `${resourceURL}/${equCodigo}`
        await httpClient.delete(url)
    }

    const listar = async () : Promise<Equipamento[]> => {
        const response: AxiosResponse<Equipamento[]> = await httpClient.get(resourceURL)
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