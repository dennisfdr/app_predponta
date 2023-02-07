import {httpClient} from 'app/http'
import { Componente } from 'app/model/componentes'
import { MaquinaEquipamento } from 'app/model/maquina_equipamentos'
import { AxiosResponse } from 'axios'


const resourceURL: string = "/componentes"
const resourceURLMaquinaEquipamento: string = "/componentes/maquinaEquipamento"




export const useComponenteService = () => {

   

    const salvar = async (componente: Componente) : Promise <Componente> => {
        console.log(componente)
        const response : AxiosResponse <Componente> =  await httpClient.post<Componente>(resourceURL, componente)
        return response.data;
    }


    const atualizar = async (componente: Componente) : Promise < void > => {
        const url: string =`${resourceURL}/${componente.comCodigo}`
        await httpClient.put <Componente>(url, componente)

    }

    const carregar = async (comCodigo: any) : Promise<Componente> => {
        const url: string = `${resourceURL}/${comCodigo}`
        const response: AxiosResponse<Componente> = await httpClient.get(url);
        return response.data;
    }

    const carregarByMaquinaEquipamento = async (maquinaEquipamento: MaquinaEquipamento) : Promise<Componente[]> => {  
        const url: string = `${resourceURLMaquinaEquipamento}/${maquinaEquipamento.maeCodigo}`
        const response: AxiosResponse<Componente[]> = await httpClient.get(url);
        return response.data
    }

    const deletar = async (comCodigo: any) : Promise<void> => {
        const url: string = `${resourceURL}/${comCodigo}`
        await httpClient.delete(url)
    }

    const listar = async () : Promise<Componente[]> => {
        const response: AxiosResponse<Componente[]> = await httpClient.get(resourceURL)
        return response.data
    }


    return{
        salvar,
        atualizar,
        carregar,
        deletar,
        carregarByMaquinaEquipamento,
        listar
    }
}