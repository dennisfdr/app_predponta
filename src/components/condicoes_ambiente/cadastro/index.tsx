import { CondicoesAmbiente } from "app/model/condicoes_ambiente";
import { useCondicoesAmbienteService } from "app/services";
import { Alert } from "components/common/message";
import { Menu } from "components/layout/menu";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { CondicoesAmbienteForm } from "./form";



export const CadastroCondicoesAmbiente: React.FC = () => {

    const service = useCondicoesAmbienteService();
    const [ messages, setMessages ] = useState<Alert[]>([])
    const [ vendaRealizada, setVendaRealizada ] = useState<boolean>(false)
    const [ condicoesAmbiente, setCondicoesAmbiente ] = useState<CondicoesAmbiente>();
    
   

    const router = useRouter();
    const { camCodigo } = router.query;

   

    

    
    const handleSubmit = (condicoesAmbiente: CondicoesAmbiente) => {     

       
        if(condicoesAmbiente.camCodigo){
           
            service.atualizar(condicoesAmbiente).then(response => {
                setMessages([{
                    tipo: "success", texto: "CondicoesAmbiente atualizado com sucesso!"
                }])
                    
            })
        }  else {
            
            service.salvar(condicoesAmbiente)
            
                    .then(CondicoesAmbienteSalvo => {                       
                        setCondicoesAmbiente(CondicoesAmbienteSalvo);                     
                        setMessages([{
                            tipo: "success", texto: "CondicoesAmbiente salvo com sucesso!"
                        }])
                        
                                        
                    })
            } 
    }    

    
    return (
        //<Layout titulo="Empresa">
        <React.Fragment>
            <Menu/>        
            <CondicoesAmbienteForm   onSubmit={handleSubmit}/>  
        </React.Fragment>

       //</Layout>
    )
}