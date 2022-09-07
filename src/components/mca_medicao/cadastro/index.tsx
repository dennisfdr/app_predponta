import { McaMedicao } from "app/model/mca_medicao";
import { useMcaMedicaoService } from "app/services";
import { Alert } from "components/common/message";
import { Menu } from "components/layout/menu";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { McaMedicaoForm } from "./form";



export const CadastroMcaMedicao: React.FC = () => {

    const service = useMcaMedicaoService();
    const [ messages, setMessages ] = useState<Alert[]>([])
    const [ vendaRealizada, setVendaRealizada ] = useState<boolean>(false)
    const [ mcaMedicao, setMcaMedicao ] = useState<McaMedicao>();
    
   

    const router = useRouter();
    const { memCodigo } = router.query;

   

    

    
    const handleSubmit = (mcaMedicao: McaMedicao) => {     

        
        if(mcaMedicao.memCodigo){

            
           
            service.atualizar(mcaMedicao).then(response => {
                setMessages([{
                    tipo: "success", texto: "McaMedicao atualizado com sucesso!"
                }])
                    
            })
        }  else {

            
            
            service.salvar(mcaMedicao)
            
                    .then(McaMedicaoSalvo => {                       
                        setMcaMedicao(McaMedicaoSalvo);                     
                        setMessages([{
                            tipo: "success", texto: "McaMedicao salvo com sucesso!"
                        }])
                        
                                        
                    })
            } 
    }    

    
    return (
        //<Layout titulo="Empresa">
        <React.Fragment>
            <Menu/>        
            <McaMedicaoForm   onSubmit={handleSubmit}/>  
        </React.Fragment>

       //</Layout>
    )
}