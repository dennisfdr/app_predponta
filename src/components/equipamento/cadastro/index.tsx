import { Equipamento } from "app/model/equipamento";
import { useEquipamentoService } from "app/services";
import { Alert } from "components/common/message";
import { Menu } from "components/layout/menu";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { EquipamentoForm } from "./form";



export const CadastroEquipamento: React.FC = () => {

    const service = useEquipamentoService();
    const [ messages, setMessages ] = useState<Alert[]>([])
    const [ vendaRealizada, setVendaRealizada ] = useState<boolean>(false)
    const [ equipamento, setEquipamento ] = useState<Equipamento>();
    
   

    const router = useRouter();
    const { equCodigo } = router.query;

   

    

    
    const handleSubmit = (equipamento: Equipamento) => {     

          
        if(equipamento.equCodigo){
           
            service.atualizar(equipamento).then(response => {
                setMessages([{
                    tipo: "success", texto: "Equipamento atualizado com sucesso!"
                }])
                    
            })
        }  else {
            
            service.salvar(equipamento)
            
                    .then(EquipamentoSalvo => {                       
                        setEquipamento(EquipamentoSalvo);                     
                        setMessages([{
                            tipo: "success", texto: "Equipamento salvo com sucesso!"
                        }])
                        
                                        
                    })
            } 
    }    

    
    return (
        //<Layout titulo="Empresa">
        <React.Fragment>
            <Menu/>        
            <EquipamentoForm   onSubmit={handleSubmit}/>  
        </React.Fragment>

       //</Layout>
    )
}