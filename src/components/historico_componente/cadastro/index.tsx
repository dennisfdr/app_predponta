import { HistoricoComponente } from "app/model/historico_componentes";
import { Maquina } from "app/model/maquinas";
import { useHistoricoComponenteService } from "app/services";
import { Alert } from "components/common/message";
import { Menu } from "components/layout/menu";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { HistoricoComponenteForm } from "./form";



export const CadastroHistoricoComponente: React.FC = () => {

    const service = useHistoricoComponenteService();
    const [ messages, setMessages ] = useState<Alert[]>([])
    const [ vendaRealizada, setVendaRealizada ] = useState<boolean>(false)
    const [ historicoComponente, setHistoricoComponente ] = useState<HistoricoComponente>();
    
   

    const router = useRouter();
    const { hcoCodigo } = router.query;

   

    

    
    const handleSubmit = (historicoComponente: HistoricoComponente) => {     

          
        if(historicoComponente.hcoCodigo){
           
            service.atualizar(historicoComponente).then(response => {
                setMessages([{
                    tipo: "success", texto: "Historico Componente atualizado com sucesso!"
                }])
                    
            })
        }  else {
            
            service.salvar(historicoComponente)
            
                    .then(historicoComponenteSalvo => {                       
                        setHistoricoComponente(historicoComponenteSalvo);                     
                        setMessages([{
                            tipo: "success", texto: "Historico Componente salvo com sucesso!"
                        }])
                        
                                        
                    })
            } 
    }    

    
    return (
        //<Layout titulo="Empresa">
        <React.Fragment>
            <Menu/>        
            <HistoricoComponenteForm   onSubmit={handleSubmit}/>  
        </React.Fragment>

       //</Layout>
    )
}