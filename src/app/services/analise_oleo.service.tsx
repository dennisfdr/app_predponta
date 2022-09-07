import {httpClient} from 'app/http'
import { AnaliseOleo } from 'app/model/analise_oleo'
import { Medicao } from 'app/model/medicao'
import { AxiosResponse } from 'axios'


const resourceURL: string = "/analiseoleo"
const resourceURLMedicao: string = "/analiseoleo/medicao"


export const useAnaliseOleoService = () => {

   

    const salvar = async (analiseOleo: AnaliseOleo) : Promise <AnaliseOleo> => { 
        console.log(resourceURL)
        const response : AxiosResponse <AnaliseOleo> =  await httpClient.post<AnaliseOleo>(resourceURL, analiseOleo)
        return response.data;
    }


    const atualizar = async (analiseOleo: AnaliseOleo) : Promise < void > => {
        const url: string =`${resourceURL}/${analiseOleo.anoCodigo}`
        await httpClient.put <AnaliseOleo>(url, analiseOleo)

    }

    const carregar = async (anoCodigo: any) : Promise<AnaliseOleo> => {
        const url: string = `${resourceURL}/${anoCodigo}`
        const response: AxiosResponse<AnaliseOleo> = await httpClient.get(url);
        return response.data;
    }

    const carregarByMedicao = async (medicao: Medicao) : Promise<AnaliseOleo[]> => {  
        const url: string = `${resourceURLMedicao}/${medicao.medCodigo}`
        const response: AxiosResponse<AnaliseOleo[]> = await httpClient.get(url);
        return response.data
    }

    
  

    const deletar = async (anoCodigo: any) : Promise<void> => {
        const url: string = `${resourceURL}/${anoCodigo}`
        await httpClient.delete(url)
    }

    const listar = async () : Promise<AnaliseOleo[]> => {
        const response: AxiosResponse<AnaliseOleo[]> = await httpClient.get(resourceURL)
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