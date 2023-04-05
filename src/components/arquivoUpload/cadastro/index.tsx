import { ArquivoUpload } from "app/model/arquivoUpload";
import { useArquivoUploadService } from "app/services";
import { Alert } from "components/common/message";
import { Menu } from "components/layout/menu";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { ArquivoUploadForm } from "./form";



export const CadastroArquivoUpload: React.FC = () => {

    const service = useArquivoUploadService();
    const [ messages, setMessages ] = useState<Alert[]>([])
    const [ vendaRealizada, setVendaRealizada ] = useState<boolean>(false)
    const [ arquivoUpload, setArquivoUpload ] = useState<ArquivoUpload>();
    
   

    const router = useRouter();
    const { aruCodigo } = router.query;

   

    

    
    const handleSubmit = (arquivoUpload: ArquivoUpload) => {     

          
        if(arquivoUpload.aruCodigo){
           
            service.atualizar(arquivoUpload).then(response => {
                setMessages([{
                    tipo: "success", texto: "ArquivoUpload atualizado com sucesso!"
                }])
                    
            })
        }  else {
            
            /*service.salvar(arquivoUpload)
            
                    .then(ArquivoUploadSalvo => {                       
                        setArquivoUpload(ArquivoUploadSalvo);                     
                        setMessages([{
                            tipo: "success", texto: "ArquivoUpload salvo com sucesso!"
                        }])
                        
                                        
                    })*/
            } 
    }    

    
    return (
        //<Layout titulo="Empresa">
        <React.Fragment>
            <Menu/>        
            <ArquivoUploadForm   onSubmit={handleSubmit}/>  
        </React.Fragment>

       //</Layout>
    )
}