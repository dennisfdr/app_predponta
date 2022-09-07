import {httpClient} from 'app/http'
import { MaquinaEquipamento } from 'app/model/maquina_equipamentos'
import { Maquina } from 'app/model/maquinas'
import { AxiosResponse } from 'axios'


const resourceURL: string = "/maquinaequipamentos"
const resourceURLMaquina: string = "/maquinaequipamentos/maquina"



export const useMaquinaEquipamentoService = () => {

   

    const salvar = async (maquinaEquipamento: MaquinaEquipamento) : Promise <MaquinaEquipamento> => {
        const response : AxiosResponse <MaquinaEquipamento> =  await httpClient.post<MaquinaEquipamento>(resourceURL, maquinaEquipamento)
        return response.data;
    }


    const atualizar = async (maquinaEquipamento: MaquinaEquipamento) : Promise < void > => {
        const url: string =`${resourceURL}/${maquinaEquipamento.maeCodigo}`
        await httpClient.put <MaquinaEquipamento>(url, maquinaEquipamento)

    }

    const carregar = async (maeCodigo: any) : Promise<MaquinaEquipamento> => {
        const url: string = `${resourceURL}/${maeCodigo}`
        const response: AxiosResponse<MaquinaEquipamento> = await httpClient.get(url);
        return response.data;
    }

    const carregarByMaquina = async (maquina: Maquina) : Promise<MaquinaEquipamento[]> => {  
        const url: string = `${resourceURLMaquina}/${maquina.maqCodigo}`
        const response: AxiosResponse<MaquinaEquipamento[]> = await httpClient.get(url);
        return response.data
    }

    const deletar = async (maqCodigo: any) : Promise<void> => {
        const url: string = `${resourceURL}/${maqCodigo}`
        await httpClient.delete(url)
    }

    const listar = async () : Promise<MaquinaEquipamento[]> => {
        const response: AxiosResponse<MaquinaEquipamento[]> = await httpClient.get(resourceURL)
        return response.data
    }


    return{
        salvar,
        atualizar,
        carregar,
        deletar,
        carregarByMaquina,
        listar
    }
}