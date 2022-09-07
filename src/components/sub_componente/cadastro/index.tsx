import { Sub_Componente } from "app/model/sub_componente";
import { useSubComponenteService } from "app/services";
import { Alert } from "components/common/message";
import { Menu } from "components/layout/menu";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { Sub_ComponenteForm } from "./form";



export const CadastroSubComponente: React.FC = () => {

    const service = useSubComponenteService();
    const [ messages, setMessages ] = useState<Alert[]>([])
    const [ vendaRealizada, setVendaRealizada ] = useState<boolean>(false)
    const [ subComponente, setSubComponente ] = useState<Sub_Componente>();
    
   

    const router = useRouter();
    const { comCodigo } = router.query;

   

    

    
    const handleSubmit = (subComponente: Sub_Componente) => {     

          
        if(subComponente.scoCodigo){
           
            service.atualizar(subComponente).then(response => {
                setMessages([{
                    tipo: "success", texto: "SubComponente atualizado com sucesso!"
                }])
                    
            })
        }  else {
            
            service.salvar(subComponente)
            
                    .then(SubComponenteSalvo => {                       
                        setSubComponente(SubComponenteSalvo);                     
                        setMessages([{
                            tipo: "success", texto: "SubComponente salvo com sucesso!"
                        }])
                        
                                        
                    })
            } 
    }    

    
    return (
        //<Layout titulo="Empresa">
        <React.Fragment>
            <Menu/>        
            <Sub_ComponenteForm   onSubmit={handleSubmit}/>  
        </React.Fragment>

       //</Layout>
    )
}