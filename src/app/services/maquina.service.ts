import {httpClient} from 'app/http'
import { Maquina } from 'app/model/maquinas'
import { Setor } from 'app/model/setor'
import { AxiosResponse } from 'axios'


const resourceURL: string = "/maquinas"
const resourceURLSetor: string = "/maquinas/setor"



export const useMaquinaService = () => {

   

    const salvar = async (maquina: Maquina) : Promise <Maquina> => {
        const response : AxiosResponse <Maquina> =  await httpClient.post<Maquina>(resourceURL, maquina)
        return response.data;
    }


    const atualizar = async (maquina: Maquina) : Promise < void > => {
        const url: string =`${resourceURL}/${maquina.maqCodigo}`
        await httpClient.put <Maquina>(url, maquina)

    }

    const carregar = async (maqCodigo: any) : Promise<Maquina> => {
        const url: string = `${resourceURL}/${maqCodigo}`
        const response: AxiosResponse<Maquina> = await httpClient.get(url);
        return response.data;
    }

    const carregarBySetor = async (setor: Setor) : Promise<Maquina[]> => {
        const url: string = `${resourceURLSetor}/${setor.setCodigo}`
        const response: AxiosResponse<Maquina[]> = await httpClient.get(url);
        return response.data
    }




    const deletar = async (maqCodigo: any) : Promise<void> => {
        const url: string = `${resourceURL}/${maqCodigo}`
        await httpClient.delete(url)
    }

    const listar = async () : Promise<Maquina[]> => {
        const response: AxiosResponse<Maquina[]> = await httpClient.get(resourceURL)
        return response.data
    }


    return{
        salvar,
        atualizar,
        carregar,
        deletar,
        carregarBySetor,
        listar
    }
}