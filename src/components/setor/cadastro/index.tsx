import { Setor } from "app/model/setor";
import { useSetorService } from "app/services";
import { Alert } from "components/common/message";
import { Menu } from "components/layout/menu";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { SetorForm } from "./form";



export const CadastroSetor: React.FC = () => {

    const service = useSetorService();
    const [ messages, setMessages ] = useState<Alert[]>([])
    const [ vendaRealizada, setVendaRealizada ] = useState<boolean>(false)
    const [ setor, setSetor ] = useState<Setor>();
    
   

    const router = useRouter();
    const { setCodigo } = router.query;

   

    

    
    const handleSubmit = (setor: Setor) => {     

          
        if(setor.setCodigo){
           
            service.atualizar(setor).then(response => {
                setMessages([{
                    tipo: "success", texto: "Setor atualizado com sucesso!"
                }])
                    
            })
        }  else {
            
            service.salvar(setor)
            
                    .then(SetorSalvo => {                       
                        setSetor(SetorSalvo);                     
                        setMessages([{
                            tipo: "success", texto: "Setor salvo com sucesso!"
                        }])
                        
                                        
                    })
            } 
    }    

    
    return (
        //<Layout titulo="Empresa">
        <React.Fragment>
            <Menu/>        
            <SetorForm   onSubmit={handleSubmit}/>  
        </React.Fragment>

       //</Layout>
    )
}