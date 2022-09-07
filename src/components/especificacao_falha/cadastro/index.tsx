import { EspecificacaoFalha } from "app/model/especificacao_falha";
import { useEspecificacaoFalhaService } from "app/services";
import { Alert } from "components/common/message";
import { Menu } from "components/layout/menu";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { EspecificacaoFalhaForm } from "./form";



export const CadastroEspecificacaoFalha: React.FC = () => {

    const service = useEspecificacaoFalhaService();
    const [ messages, setMessages ] = useState<Alert[]>([])
    const [ vendaRealizada, setVendaRealizada ] = useState<boolean>(false)
    const [ especificacaoFalha, setEspecificacaoFalha ] = useState<EspecificacaoFalha>();
    
   

    const router = useRouter();
    const { efaCodigo } = router.query;

   

    

    
    const handleSubmit = (especificacaoFalha: EspecificacaoFalha) => {     

       
        if(especificacaoFalha.efaCodigo){
           
            service.atualizar(especificacaoFalha).then(response => {
                setMessages([{
                    tipo: "success", texto: "EspecificacaoFalha atualizado com sucesso!"
                }])
                    
            })
        }  else {
            
            service.salvar(especificacaoFalha)
            
                    .then(EspecificacaoFalhaSalvo => {                       
                        setEspecificacaoFalha(EspecificacaoFalhaSalvo);                     
                        setMessages([{
                            tipo: "success", texto: "EspecificacaoFalha salvo com sucesso!"
                        }])
                        
                                        
                    })
            } 
    }    

    
    return (
        //<Layout titulo="Empresa">
        <React.Fragment>
            <Menu/>        
            <EspecificacaoFalhaForm   onSubmit={handleSubmit}/>  
        </React.Fragment>

       //</Layout>
    )
}