import { Componente_Peca } from "app/model/componente_peca";
import { useComponentePecaService } from "app/services";
import { Alert } from "components/common/message";
import { Menu } from "components/layout/menu";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { ComponentePecaForm } from "./form";



export const CadastroComponentePeca: React.FC = () => {

    const service = useComponentePecaService();
    const [ messages, setMessages ] = useState<Alert[]>([])
    const [ vendaRealizada, setVendaRealizada ] = useState<boolean>(false)
    const [ componentePeca, setComponentePeca ] = useState<Componente_Peca>();
    
   

    const router = useRouter();
    const { comCodigo } = router.query;

   

    

    
    const handleSubmit = (componentePeca: Componente_Peca) => {     

          
        if(componentePeca.copCodigo){
           
            service.atualizar(componentePeca).then(response => {
                setMessages([{
                    tipo: "success", texto: "ComponentePeca atualizado com sucesso!"
                }])
                    
            })
        }  else {
            
            service.salvar(componentePeca)
            
                    .then(ComponentePecaSalvo => {                       
                        setComponentePeca(ComponentePecaSalvo);                     
                        setMessages([{
                            tipo: "success", texto: "ComponentePeca salvo com sucesso!"
                        }])
                        
                                        
                    })
            } 
    }    

    
    return (
        //<Layout titulo="Empresa">
        <React.Fragment>
            <Menu/>        
            <ComponentePecaForm   onSubmit={handleSubmit}/>  
        </React.Fragment>

       //</Layout>
    )
}