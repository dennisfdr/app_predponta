import { StatusComponenteVibracao } from "app/model/status_componente_vibracao";
import { useStatusComponenteVibracaoService } from "app/services";
import { Alert } from "components/common/message";
import { Menu } from "components/layout/menu";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { StatusComponenteVibracaoForm } from "./form";



export const CadastroStatusComponenteVibracao: React.FC = () => {

    const service = useStatusComponenteVibracaoService();
    const [ messages, setMessages ] = useState<Alert[]>([])
    const [ vendaRealizada, setVendaRealizada ] = useState<boolean>(false)
    const [ statusComponenteVibracao, setInspecaoAcusticaLocal ] = useState<StatusComponenteVibracao>();
    
   

    const router = useRouter();
    const { scvCodigo } = router.query;

   

    

    
    const handleSubmit = (statusComponenteVibracao: StatusComponenteVibracao) => {     

        
        if(statusComponenteVibracao.scvCodigo){
           
            service.atualizar(statusComponenteVibracao).then(response => {
                setMessages([{
                    tipo: "success", texto: "StatusComponenteVibracao atualizado com sucesso!"
                }])
                    
            })
        }  else {
            
            service.salvar(statusComponenteVibracao)
            
                    .then(StatusComponenteVibracaoSalvo => {                       
                        setInspecaoAcusticaLocal(StatusComponenteVibracaoSalvo);                     
                        setMessages([{
                            tipo: "success", texto: "StatusComponenteVibracao salvo com sucesso!"
                        }])
                        
                                        
                    })
            } 
    }    

    
    return (
        //<Layout titulo="Empresa">
        <React.Fragment>
            <Menu/>        
            <StatusComponenteVibracaoForm   onSubmit={handleSubmit}/>  
        </React.Fragment>

       //</Layout>
    )
}