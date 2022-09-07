import { McaStatusRelatorio } from "app/model/mca_status_relatorio";
import { useMcaStatusRelatorioService } from "app/services";
import { Alert } from "components/common/message";
import { Menu } from "components/layout/menu";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { McaStatusRelatorioForm } from "./form";



export const CadastroMcaStatusRelatorio: React.FC = () => {

    const service = useMcaStatusRelatorioService();
    const [ messages, setMessages ] = useState<Alert[]>([])
    const [ vendaRealizada, setVendaRealizada ] = useState<boolean>(false)
    const [ mcaStatusRelatorio, setMcaStatusRelatorio ] = useState<McaStatusRelatorio>();
    
   

    const router = useRouter();
    const { mcasrCodigo } = router.query;

   

    

    
    const handleSubmit = (mcaStatusRelatorio: McaStatusRelatorio) => {     

        
        if(mcaStatusRelatorio.mcasrCodigo){

            
           
            service.atualizar(mcaStatusRelatorio).then(response => {
                setMessages([{
                    tipo: "success", texto: "McaStatusRelatorio atualizado com sucesso!"
                }])
                    
            })
        }  else {

            
            
            service.salvar(mcaStatusRelatorio)
            
                    .then(McaStatusRelatorioSalvo => {                       
                        setMcaStatusRelatorio(McaStatusRelatorioSalvo);                     
                        setMessages([{
                            tipo: "success", texto: "McaStatusRelatorio salvo com sucesso!"
                        }])
                        
                                        
                    })
            } 
    }    

    
    return (
        //<Layout titulo="Empresa">
        <React.Fragment>
            <Menu/>        
            <McaStatusRelatorioForm   onSubmit={handleSubmit}/>  
        </React.Fragment>

       //</Layout>
    )
}