import {httpClient} from 'app/http'
import { Categoria } from 'app/model/categoria'
import { AxiosResponse } from 'axios'


const resourceURL: string = "/categoria"



export const useCategoriaService = () => {

   

    const salvar = async (categoria: Categoria) : Promise <Categoria> => { 
        console.log(resourceURL)
        const response : AxiosResponse <Categoria> =  await httpClient.post<Categoria>(resourceURL, categoria)
        return response.data;
    }


    const atualizar = async (categoria: Categoria) : Promise < void > => {
        const url: string =`${resourceURL}/${categoria.catCodigo}`
        await httpClient.put <Categoria>(url, categoria)

    }

    const carregar = async (catCodigo: any) : Promise<Categoria> => {
        const url: string = `${resourceURL}/${catCodigo}`
        const response: AxiosResponse<Categoria> = await httpClient.get(url);
        return response.data;
    }

      

    const deletar = async (catCodigo: any) : Promise<void> => {
        const url: string = `${resourceURL}/${catCodigo}`
        await httpClient.delete(url)
    }

    const listar = async () : Promise<Categoria[]> => {
        const response: AxiosResponse<Categoria[]> = await httpClient.get(resourceURL)
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