import { StatusAnaliseOleo } from "app/model/status_analise_oleo";
import { useStatusAnaliseOleoService } from "app/services";
import { Alert } from "components/common/message";
import { Menu } from "components/layout/menu";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { StatusAnaliseOleoForm } from "./form";



export const CadastroStatusAnaliseOleo: React.FC = () => {

    const service = useStatusAnaliseOleoService();
    const [ messages, setMessages ] = useState<Alert[]>([])
    const [ vendaRealizada, setVendaRealizada ] = useState<boolean>(false)
    const [ statusAnaliseOleo, setStatusAnaliseOleo ] = useState<StatusAnaliseOleo>();
    
   

    const router = useRouter();
    const { saoCodigo } = router.query;

   

    

    
    const handleSubmit = (statusAnaliseOleo: StatusAnaliseOleo) => {     

        
        if(statusAnaliseOleo.saoCodigo){
           
            service.atualizar(statusAnaliseOleo).then(response => {
                setMessages([{
                    tipo: "success", texto: "StatusAnaliseOleo atualizado com sucesso!"
                }])
                    
            })
        }  else {

            
            
            service.salvar(statusAnaliseOleo)
            
                    .then(StatusAnaliseOleoSalvo => {                       
                        setStatusAnaliseOleo(StatusAnaliseOleoSalvo);                     
                        setMessages([{
                            tipo: "success", texto: "StatusAnaliseOleo salvo com sucesso!"
                        }])
                        
                                        
                    })
            } 
    }    

    
    return (
        //<Layout titulo="Empresa">
        <React.Fragment>
            <Menu/>        
            <StatusAnaliseOleoForm   onSubmit={handleSubmit}/>  
        </React.Fragment>

       //</Layout>
    )
}