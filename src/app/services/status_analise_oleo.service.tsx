import {httpClient} from 'app/http'
import { MedicaoAnaliseOleo } from 'app/model/medicao_analise_oleo'
import { StatusAnaliseOleo } from 'app/model/status_analise_oleo'
import { AxiosResponse } from 'axios'


const resourceURL: string = "/statusanaliseoleo"
const resourceURLMedicaoAnaliseOleo: string = "/statusoanaliseoleo/medicaoanaliseoleo"


export const useStatusAnaliseOleoService = () => {

   

    const salvar = async (statusAnaliseOleo: StatusAnaliseOleo) : Promise <StatusAnaliseOleo> => { 
        const response : AxiosResponse <StatusAnaliseOleo> =  await httpClient.post<StatusAnaliseOleo>(resourceURL, statusAnaliseOleo)
        return response.data;
    }


    const atualizar = async (statusAnaliseOleo: StatusAnaliseOleo) : Promise < void > => {
        const url: string =`${resourceURL}/${statusAnaliseOleo.saoCodigo}`
        await httpClient.put <StatusAnaliseOleo>(url, statusAnaliseOleo)

    }

    const carregar = async (saoCodigo: any) : Promise<StatusAnaliseOleo> => {
        const url: string = `${resourceURL}/${saoCodigo}`
        const response: AxiosResponse<StatusAnaliseOleo> = await httpClient.get(url);
        return response.data;
    }

    const carregarByMedicaoAnaliseOleo = async (medicaAnaliseOleo: MedicaoAnaliseOleo) : Promise<StatusAnaliseOleo[]> => {  
        const url: string = `${resourceURLMedicaoAnaliseOleo}/${medicaAnaliseOleo.maoCodigo}`
        const response: AxiosResponse<StatusAnaliseOleo[]> = await httpClient.get(url);
        return response.data
    }
  

    const deletar = async (saoCodigo: any) : Promise<void> => {
        const url: string = `${resourceURL}/${saoCodigo}`
        await httpClient.delete(url)
    }

    const listar = async () : Promise<StatusAnaliseOleo[]> => {
        const response: AxiosResponse<StatusAnaliseOleo[]> = await httpClient.get(resourceURL)
        return response.data
    }


    return{
        salvar,
        atualizar,
        carregar,
        carregarByMedicaoAnaliseOleo,
        deletar,
        listar
    }
}