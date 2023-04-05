import {httpClient} from 'app/http'
import {ArquivoUpload} from 'app/model/arquivoUpload'
import { AxiosResponse } from 'axios'
import FormData from 'form-data'
import config from 'next/config'




const resourceURL: string = "/arquivouploads"




export const useArquivoUploadService = () => {

   
    
    const salvar = async (arquivoUpload: FormData) : Promise <ArquivoUpload> => {
        console.log(arquivoUpload)
        const response : AxiosResponse <ArquivoUpload, FormData> =  await httpClient.post<ArquivoUpload>(resourceURL, arquivoUpload)
        console.log(arquivoUpload)
        return response.data;
    }

    const atualizar = async (arquivoUpload: ArquivoUpload) : Promise < ArquivoUpload > => {
        const url: string =`${resourceURL}/${arquivoUpload.aruCodigo}`
        const response : AxiosResponse <ArquivoUpload> = await httpClient.put <ArquivoUpload>(url, arquivoUpload)
        return response.data;

    }


    const carregar = async (aruCodigo: any) : Promise<ArquivoUpload> => {
        const url: string = `${resourceURL}/${aruCodigo}`
        const response: AxiosResponse<ArquivoUpload> = await httpClient.get(url);
        return response.data;
    }

    const deletar = async (aruCodigo: any) : Promise<void> => {
        const url: string = `${resourceURL}/${aruCodigo}`
        console.log(url)
        await httpClient.delete(url)
    }

    const listar = async () : Promise<ArquivoUpload[]> => {
        const response: AxiosResponse<ArquivoUpload[]> = await httpClient.get(resourceURL)
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