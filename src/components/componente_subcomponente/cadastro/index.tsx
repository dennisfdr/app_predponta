import { Componente_Sub_Componente } from "app/model/componente_subcomponente";
import { useComponente_Sub_ComponenteService } from "app/services";
import { Alert } from "components/common/message";
import { Menu } from "components/layout/menu";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { Componente_Sub_ComponenteForm } from "./form";



export const CadastroComponenteSubComponente: React.FC = () => {

    const service = useComponente_Sub_ComponenteService();
    const [ messages, setMessages ] = useState<Alert[]>([])
    const [ vendaRealizada, setVendaRealizada ] = useState<boolean>(false)
    const [ componenteSubComponente, setComponenteSubComponente ] = useState<Componente_Sub_Componente>();
    
   

    const router = useRouter();
    const { comCodigo } = router.query;

   

    

    
    const handleSubmit = (componenteSubComponente: Componente_Sub_Componente) => {     

          
        if(componenteSubComponente.cscCodigo){
           
            service.atualizar(componenteSubComponente).then(response => {
                setMessages([{
                    tipo: "success", texto: "ComponenteSubComponente atualizado com sucesso!"
                }])
                    
            })
        }  else {
            
            service.salvar(componenteSubComponente)
            
                    .then(componenteSubComponenteSalvo => {                       
                        setComponenteSubComponente(componenteSubComponenteSalvo);                     
                        setMessages([{
                            tipo: "success", texto: "ComponenteSubComponente salvo com sucesso!"
                        }])
                        
                                        
                    })
            } 
    }    

    
    return (
        //<Layout titulo="Empresa">
        <React.Fragment>
            <Menu/>        
            <Componente_Sub_ComponenteForm   onSubmit={handleSubmit}/>  
        </React.Fragment>

       //</Layout>
    )
}