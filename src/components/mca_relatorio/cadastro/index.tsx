import { McaRelatorio } from "app/model/mca_relatorio";
import { useMcaRelatorioService } from "app/services";
import { Alert } from "components/common/message";
import { Menu } from "components/layout/menu";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { McaRelatorioForm } from "./form";



export const CadastroMcaRelatorio: React.FC = () => {

    const service = useMcaRelatorioService();
    const [ messages, setMessages ] = useState<Alert[]>([])
    const [ vendaRealizada, setVendaRealizada ] = useState<boolean>(false)
    const [ mcaRelatorio, setMcaRelatorio ] = useState<McaRelatorio>();
    
   

    const router = useRouter();
    const { mcrCodigo } = router.query;

   

    

    
    const handleSubmit = (mcaRelatorio: McaRelatorio) => {     

        
        if(mcaRelatorio.mcrCodigo){

            
           
            service.atualizar(mcaRelatorio).then(response => {
                setMessages([{
                    tipo: "success", texto: "McaRelatorio atualizado com sucesso!"
                }])
                    
            })
        }  else {

            
            
            service.salvar(mcaRelatorio)
            
                    .then(McaRelatorioSalvo => {                       
                        setMcaRelatorio(McaRelatorioSalvo);                     
                        setMessages([{
                            tipo: "success", texto: "McaRelatorio salvo com sucesso!"
                        }])
                        
                                        
                    })
            } 
    }    

    
    return (
        //<Layout titulo="Empresa">
        <React.Fragment>
            <Menu/>        
            <McaRelatorioForm   onSubmit={handleSubmit}/>  
        </React.Fragment>

       //</Layout>
    )
}