import { Componente } from "app/model/componentes";
import { Maquina } from "app/model/maquinas";
import { useComponenteService } from "app/services";
import { Alert } from "components/common/message";
import { Menu } from "components/layout/menu";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { ComponenteForm } from "./form";



export const CadastroComponente: React.FC = () => {

    const service = useComponenteService();
    const [ messages, setMessages ] = useState<Alert[]>([])
    const [ vendaRealizada, setVendaRealizada ] = useState<boolean>(false)
    const [ componente, setComponente ] = useState<Componente>();
    
   

    const router = useRouter();
    const { comCodigo } = router.query;

   

    

    
    const handleSubmit = (componente: Componente) => {     

          
        if(componente.comCodigo){
           
            service.atualizar(componente).then(response => {
                setMessages([{
                    tipo: "success", texto: "Componente atualizado com sucesso!"
                }])
                    
            })
        }  else {
            
            service.salvar(componente)
            
                    .then(componenteSalvo => {                       
                        setComponente(componenteSalvo);                     
                        setMessages([{
                            tipo: "success", texto: "Componente salvo com sucesso!"
                        }])
                        
                                        
                    })
            } 
    }    

    
    return (
        //<Layout titulo="Empresa">
        <React.Fragment>
            <Menu/>        
            <ComponenteForm   onSubmit={handleSubmit}/>  
        </React.Fragment>

       //</Layout>
    )
}