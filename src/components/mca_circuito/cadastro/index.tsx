import { McaCircuito } from "app/model/mca_circuito";
import { useMcaCircuitoService } from "app/services";
import { Alert } from "components/common/message";
import { Menu } from "components/layout/menu";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { McaCircuitoForm } from "./form";



export const CadastroMcaCircuito: React.FC = () => {

    const service = useMcaCircuitoService();
    const [ messages, setMessages ] = useState<Alert[]>([])
    const [ vendaRealizada, setVendaRealizada ] = useState<boolean>(false)
    const [ mcaCircuito, setMcaCircuito ] = useState<McaCircuito>();
    
   

    const router = useRouter();
    const { mccCodigo } = router.query;

   

    

    
    const handleSubmit = (mcaCircuito: McaCircuito) => {     

        
        if(mcaCircuito.mccCodigo){

            
           
            service.atualizar(mcaCircuito).then(response => {
                setMessages([{
                    tipo: "success", texto: "McaCircuito atualizado com sucesso!"
                }])
                    
            })
        }  else {

            
            
            service.salvar(mcaCircuito)
            
                    .then(McaCircuitoSalvo => {                       
                        setMcaCircuito(McaCircuitoSalvo);                     
                        setMessages([{
                            tipo: "success", texto: "McaCircuito salvo com sucesso!"
                        }])
                        
                                        
                    })
            } 
    }    

    
    return (
        //<Layout titulo="Empresa">
        <React.Fragment>
            <Menu/>        
            <McaCircuitoForm   onSubmit={handleSubmit}/>  
        </React.Fragment>

       //</Layout>
    )
}