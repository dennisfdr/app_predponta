import {httpClient} from 'app/http'
import { CondicoesAmbiente } from 'app/model/condicoes_ambiente'
import { EspecificacaoFalha } from 'app/model/especificacao_falha'
import { AxiosResponse } from 'axios'


const resourceURL: string = "/especificacaofalha"
const resourceURLCondicoesAmbiente: string = "/inspecaotermografica/condicaoambiente"


export const useEspecificacaoFalhaService = () => {

   

    const salvar = async (especificacaoFalha: EspecificacaoFalha) : Promise <EspecificacaoFalha> => { 
        const response : AxiosResponse <EspecificacaoFalha> =  await httpClient.post<EspecificacaoFalha>(resourceURL, especificacaoFalha)
        return response.data;
    }


    const atualizar = async (especificacaoFalha: EspecificacaoFalha) : Promise < void > => {
        const url: string =`${resourceURL}/${especificacaoFalha.efaCodigo}`
        await httpClient.put <EspecificacaoFalha>(url, especificacaoFalha)

    }

    const carregar = async (efaCodigo: any) : Promise<EspecificacaoFalha> => {
        const url: string = `${resourceURL}/${efaCodigo}`
        const response: AxiosResponse<EspecificacaoFalha> = await httpClient.get(url);
        return response.data;
    }

    const carregarByCondicoesAmbiente = async (condicoesAmbiente: CondicoesAmbiente) : Promise<EspecificacaoFalha[]> => {  
        const url: string = `${resourceURLCondicoesAmbiente}/${condicoesAmbiente.camCodigo}`
        const response: AxiosResponse<EspecificacaoFalha[]> = await httpClient.get(url);
        return response.data
    }
  

    const deletar = async (efaCodigo: any) : Promise<void> => {
        const url: string = `${resourceURL}/${efaCodigo}`
        await httpClient.delete(url)
    }

    const listar = async () : Promise<EspecificacaoFalha[]> => {
        const response: AxiosResponse<EspecificacaoFalha[]> = await httpClient.get(resourceURL)
        return response.data
    }


    return{
        salvar,
        atualizar,
        carregar,
        carregarByCondicoesAmbiente,
        deletar,
        listar
    }
}