import { McaStatus } from "app/model/mca_status";
import { useMcaStatusService } from "app/services";
import { Alert } from "components/common/message";
import { Menu } from "components/layout/menu";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { McaStatusForm } from "./form";



export const CadastroMcaStatus: React.FC = () => {

    const service = useMcaStatusService();
    const [ messages, setMessages ] = useState<Alert[]>([])
    const [ vendaRealizada, setVendaRealizada ] = useState<boolean>(false)
    const [ mcaStatus, setMcaStatus ] = useState<McaStatus>();
    
   

    const router = useRouter();
    const { mcasCodigo } = router.query;

   

    

    
    const handleSubmit = (mcaStatus: McaStatus) => {     

        
        if(mcaStatus.mcasCodigo){

            
           
            service.atualizar(mcaStatus).then(response => {
                setMessages([{
                    tipo: "success", texto: "McaStatus atualizado com sucesso!"
                }])
                    
            })
        }  else {

            
            
            service.salvar(mcaStatus)
            
                    .then(McaStatusSalvo => {                       
                        setMcaStatus(McaStatusSalvo);                     
                        setMessages([{
                            tipo: "success", texto: "McaStatus salvo com sucesso!"
                        }])
                        
                                        
                    })
            } 
    }    

    
    return (
        //<Layout titulo="Empresa">
        <React.Fragment>
            <Menu/>        
            <McaStatusForm   onSubmit={handleSubmit}/>  
        </React.Fragment>

       //</Layout>
    )
}