import { StatusSubComponente } from "app/model/status_sub_componente";
import { Maquina } from "app/model/maquinas";
import { useStatusSubComponenteService } from "app/services";
import { Alert } from "components/common/message";
import { Menu } from "components/layout/menu";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { StatusSubComponenteForm } from "./form";



export const CadastroStatusSubComponente: React.FC = () => {

    const service = useStatusSubComponenteService();
    const [ messages, setMessages ] = useState<Alert[]>([])
    const [ vendaRealizada, setVendaRealizada ] = useState<boolean>(false)
    const [ statusSubComponente, setStatusSubComponente ] = useState<StatusSubComponente>();
    
   

    const router = useRouter();
    const { sscCodigo } = router.query;

   

    

    
    const handleSubmit = (status_sub_componente: StatusSubComponente) => {     

          
        if(status_sub_componente.sscCodigo){
           
            service.atualizar(status_sub_componente).then(response => {
                setMessages([{
                    tipo: "success", texto: "StatusSuComponente atualizado com sucesso!"
                }])
                    
            })
        }  else {
            
            service.salvar(status_sub_componente)
            
                    .then(historicoComponenteSalvo => {                       
                        setStatusSubComponente(historicoComponenteSalvo);                     
                        setMessages([{
                            tipo: "success", texto: "StatusSuComponente salvo com sucesso!"
                        }])
                        
                                        
                    })
            } 
    }    

    
    return (
        //<Layout titulo="Empresa">
        <React.Fragment>
            <Menu/>        
            <StatusSubComponenteForm   onSubmit={handleSubmit}/>  
        </React.Fragment>

       //</Layout>
    )
}