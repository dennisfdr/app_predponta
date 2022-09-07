import { Maquina } from "app/model/maquinas";
import { useMaquinaService } from "app/services";
import { Alert } from "components/common/message";
import { Menu } from "components/layout/menu";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { MaquinaForm } from "./form";



export const CadastroMaquina: React.FC = () => {

    const service = useMaquinaService();
    const [ messages, setMessages ] = useState<Alert[]>([])
    const [ vendaRealizada, setVendaRealizada ] = useState<boolean>(false)
    const [ maquina, setMaquina ] = useState<Maquina>();
    
   

    const router = useRouter();
    const { maqCodigo } = router.query;

   

    

    
    const handleSubmit = (maquina: Maquina) => {     

          
        if(maquina.maqCodigo){
           
            service.atualizar(maquina).then(response => {
                setMessages([{
                    tipo: "success", texto: "Empresa atualizado com sucesso!"
                }])
                    
            })
        }  else {
            
            service.salvar(maquina)
            
                    .then(maquinaSalvo => {                       
                        setMaquina(maquinaSalvo);                     
                        setMessages([{
                            tipo: "success", texto: "Empresa salvo com sucesso!"
                        }])
                        
                                        
                    })
            } 
    }    

    
    return (
        //<Layout titulo="Empresa">
        <React.Fragment>
            <Menu/>        
            <MaquinaForm   onSubmit={handleSubmit}/>  
        </React.Fragment>

       //</Layout>
    )
}