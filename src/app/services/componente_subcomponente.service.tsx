import {httpClient} from 'app/http'
import { Componente_Sub_Componente } from 'app/model/componente_subcomponente'
import { Componente } from 'app/model/componentes'
import { AxiosResponse } from 'axios'


const resourceURL: string = "/componentesubcomponentes"






export const useComponente_Sub_ComponenteService = () => {

   

    const salvar = async (componenteSubComponente: Componente_Sub_Componente) : Promise <Componente_Sub_Componente> => {
        const response : AxiosResponse <Componente_Sub_Componente> =  await httpClient.post<Componente_Sub_Componente>(resourceURL, componenteSubComponente)
        return response.data;
    }


    const atualizar = async (componenteSubComponente: Componente_Sub_Componente) : Promise < void > => {
        const url: string =`${resourceURL}/${componenteSubComponente.cscCodigo}`
        await httpClient.put <Componente_Sub_Componente>(url, componenteSubComponente)

    }

    const carregar = async (cscCodigo: any) : Promise<Componente_Sub_Componente> => {
        const url: string = `${resourceURL}/${cscCodigo}`
        const response: AxiosResponse<Componente_Sub_Componente> = await httpClient.get(url);
        return response.data;
    }

    
   
 

    const deletar = async (cscCodigo: any) : Promise<void> => {
        const url: string = `${resourceURL}/${cscCodigo}`
        await httpClient.delete(url)
    }

    const listar = async () : Promise<Componente_Sub_Componente[]> => {
        const response: AxiosResponse<Componente_Sub_Componente[]> = await httpClient.get(resourceURL)
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