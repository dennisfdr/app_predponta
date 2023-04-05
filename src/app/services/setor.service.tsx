import {httpClient} from 'app/http'
import { Setor } from 'app/model/setor'
import { Empresa } from 'app/model/empresas'
import { AxiosResponse } from 'axios'



const resourceURL: string = "/setors"
const resourceURLEmpresa: string = "/setors/empresa"


export const useSetorService = () => {

   

    const salvar = async (setor: Setor) : Promise <Setor> => {
        const response : AxiosResponse <Setor> =  await httpClient.post<Setor>(resourceURL, setor)
        return response.data;
    }

    const atualizar = async (setor: Setor) : Promise < Setor > => {
        const url: string =`${resourceURL}/${setor.setCodigo}`
        const response : AxiosResponse <Setor> = await httpClient.put <Setor>(url, setor)
        return response.data;

    }


    const carregar = async (setCodigo: any) : Promise<Setor> => {
        const url: string = `${resourceURL}/${setCodigo}`
        const response: AxiosResponse<Setor> = await httpClient.get(url);
        return response.data;
    }

    const carregarByEmpresa = async (empresa: Empresa) : Promise<Setor[]> => {  
        const url: string = `${resourceURLEmpresa}/${empresa.empCodigo}`
        const response: AxiosResponse<Setor[]> = await httpClient.get(url);
        return response.data
    }

    const deletar = async (setCodigo: any) : Promise<void> => {
        const url: string = `${resourceURL}/${setCodigo}`
        console.log(url)
        await httpClient.delete(url)
    }

    const listar = async () : Promise<Setor[]> => {
        const response: AxiosResponse<Setor[]> = await httpClient.get(resourceURL)
        return response.data
    }


    return{
        salvar,
        atualizar,
        carregar,
        carregarByEmpresa,
        deletar,
        listar
    }
}