import {httpClient} from 'app/http'
import { MedicaoAnaliseOleo } from 'app/model/medicao_analise_oleo'
import { AnaliseOleo } from 'app/model/analise_oleo'
import { AxiosResponse } from 'axios'


const resourceURL: string = "/medicaoanaliseoleo"
const resourceURLAnaliseOleo: string = "/medicaoanaliseoleo/analiseoleo"


export const useMedicaoAnaliseOleoService = () => {

   

    const salvar = async (medicaoAnaliseOleo: MedicaoAnaliseOleo) : Promise <MedicaoAnaliseOleo> => { 
        const response : AxiosResponse <MedicaoAnaliseOleo> =  await httpClient.post<MedicaoAnaliseOleo>(resourceURL, medicaoAnaliseOleo)
        return response.data;
    }


    const atualizar = async (medicaoAnaliseOleo: MedicaoAnaliseOleo) : Promise < void > => {
        const url: string =`${resourceURL}/${medicaoAnaliseOleo.maoCodigo}`
        await httpClient.put <MedicaoAnaliseOleo>(url, medicaoAnaliseOleo)

    }

    const carregar = async (maoCodigo: any) : Promise<MedicaoAnaliseOleo> => {
        const url: string = `${resourceURL}/${maoCodigo}`
        const response: AxiosResponse<MedicaoAnaliseOleo> = await httpClient.get(url);
        return response.data;
    }

    const carregarByAnaliseOleo = async (analiseOleo: AnaliseOleo) : Promise<MedicaoAnaliseOleo[]> => {  
        const url: string = `${resourceURLAnaliseOleo}/${analiseOleo.anoCodigo}`
        const response: AxiosResponse<MedicaoAnaliseOleo[]> = await httpClient.get(url);
        return response.data
    }
  

    const deletar = async (maoCodigo: any) : Promise<void> => {
        const url: string = `${resourceURL}/${maoCodigo}`
        await httpClient.delete(url)
    }

    const listar = async () : Promise<MedicaoAnaliseOleo[]> => {
        const response: AxiosResponse<MedicaoAnaliseOleo[]> = await httpClient.get(resourceURL)
        return response.data
    }


    return{
        salvar,
        atualizar,
        carregar,
        carregarByAnaliseOleo,
        deletar,
        listar
    }
}