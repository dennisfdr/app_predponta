import {httpClient} from 'app/http'
import {ArquivoUpload, Empresa, EmpresaEmail, Setor} from 'app/model/empresas'
import { AxiosResponse } from 'axios'


const resourceURL: string = "/empresas"
const resourceURL2: string = "/empresaemails"
const resourceURL3: string = "/arquivouploads"
const resourceURL4: string = "/setors"



export const useEmpresaService = () => {

   

    const salvar = async (empresa: Empresa) : Promise <Empresa> => {
        const response : AxiosResponse <Empresa> =  await httpClient.post<Empresa>(resourceURL, empresa)
        return response.data;
    }


    /*const salvarEmpresaEmail = async (empresaEmail: EmpresaEmail) : Promise <EmpresaEmail> => {
        console.log("Empresa Email..." + empresaEmail.toString())
        const response : AxiosResponse <EmpresaEmail> =  await httpClient.post<EmpresaEmail>(resourceURL2, empresaEmail)
        return response.data;
        
    }*/

    const salvarEmpresaEmail = async (empresaEmail: Array<EmpresaEmail>) : Promise < void > => {
        //const url: string =`${resourceURL2}/${empresaEmail}`
        console.log(empresaEmail)
        await httpClient.post <EmpresaEmail>(resourceURL2, empresaEmail)

    }

    /*const salvarEmpresaImagem = async (empresaImagem: Array<ArquivoUpload>) : Promise <ArquivoUpload> => {
        const response : AxiosResponse <ArquivoUpload> =  await httpClient.post<ArquivoUpload>(resourceURL3, empresaImagem)
        return response.data;
        
    }*/

    const salvarEmpresaImagem = async (empresaImagem: Array<ArquivoUpload>) : Promise <void> => {
        console.log(empresaImagem)
        await httpClient.post<ArquivoUpload>(resourceURL3, empresaImagem)
       
        
    }



    /*const salvarEmpresaSetor = async (empresaSetor: Array<Setor>) : Promise <Setor> => {
        const response : AxiosResponse <Setor> =  await httpClient.post<Setor>(resourceURL4, empresaSetor)
        return response.data;
        
    }*/

    const salvarEmpresaSetor = async (empresaSetor: Array<Setor>) : Promise <void> => {
        await httpClient.post<Setor>(resourceURL4, empresaSetor)
        
        
    }

   

    const atualizar = async (empresa: Empresa) : Promise < Empresa > => {
        const url: string =`${resourceURL}/${empresa.empCodigo}`
        const response : AxiosResponse <Empresa> = await httpClient.put <Empresa>(url, empresa)
        return response.data;

    }


    const carregar = async (empCodigo: any) : Promise<Empresa> => {
        const url: string = `${resourceURL}/${empCodigo}`
        const response: AxiosResponse<Empresa> = await httpClient.get(url);
        return response.data;
    }

    const deletar = async (empCodigo: any) : Promise<void> => {
        const url: string = `${resourceURL}/${empCodigo}`
        console.log(url)
        await httpClient.delete(url)
    }

    const listar = async () : Promise<Empresa[]> => {
        const response: AxiosResponse<Empresa[]> = await httpClient.get(resourceURL)
        return response.data
    }


    return{
        salvar,
        atualizar,
        carregar,
        deletar,
        salvarEmpresaImagem,
        salvarEmpresaEmail,
        salvarEmpresaSetor,
        listar
    }
}