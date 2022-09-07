import { Falha } from "app/model/falha";
import { useFalhaService } from "app/services";
import { Alert } from "components/common/message";
import { Menu } from "components/layout/menu";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { FalhaForm } from "./form";



export const CadastroFalha: React.FC = () => {

    const service = useFalhaService();
    const [ messages, setMessages ] = useState<Alert[]>([])
    const [ vendaRealizada, setVendaRealizada ] = useState<boolean>(false)
    const [ falha, setMedicao ] = useState<Falha>();
    
   

    const router = useRouter();
    const { falCodigo } = router.query;

   

    

    
    const handleSubmit = (falha: Falha) => {     

          
        if(falha.falCodigo){
           
            service.atualizar(falha).then(response => {
                setMessages([{
                    tipo: "success", texto: "Falha atualizado com sucesso!"
                }])
                    
            })
        }  else {
            
            service.salvar(falha)
            
                    .then(FalhaSalvo => {                       
                        setMedicao(FalhaSalvo);                     
                        setMessages([{
                            tipo: "success", texto: "Falha salvo com sucesso!"
                        }])
                        
                                        
                    })
            } 
    }    

    
    return (
        //<Layout titulo="Empresa">
        <React.Fragment>
            <Menu/>        
            <FalhaForm   onSubmit={handleSubmit}/>  
        </React.Fragment>

       //</Layout>
    )
}