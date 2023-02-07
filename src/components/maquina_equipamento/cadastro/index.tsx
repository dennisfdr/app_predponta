import { MaquinaEquipamento } from "app/model/maquina_equipamentos";
import { useMaquinaEquipamentoService } from "app/services";
import { Alert } from "components/common/message";
import { Menu } from "components/layout/menu";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { MaquinaEquipamentoForm } from "./form";



export const CadastroMaquinaEquipamento: React.FC = () => {

    const service = useMaquinaEquipamentoService();
    const [ messages, setMessages ] = useState<Alert[]>([])
    const [ vendaRealizada, setVendaRealizada ] = useState<boolean>(false)
    const [ maquinaEquipamento, setMaquinaEquipamento ] = useState<MaquinaEquipamento>();
    
   

    const router = useRouter();
    const { maeCodigo } = router.query;

   

    

    
    const handleSubmit = (maquinaEquipamento: MaquinaEquipamento) => {     

          
        if(maquinaEquipamento.maeCodigo){
           
            service.atualizar(maquinaEquipamento).then(response => {
                setMessages([{
                    tipo: "success", texto: "Maquina-Equipamento atualizado com sucesso!"
                }])
                    
            })
        }  else {
            
            service.salvar(maquinaEquipamento)
            
                    .then(maquinaEquipamentoSalvo => {                       
                        setMaquinaEquipamento(maquinaEquipamentoSalvo); 
                                           
                        setMessages([{
                            tipo: "success", texto: "Maquina-Equipamento salvo com sucesso!"
                        }])
                        
                                        
                    })
            } 
    }    

    
    return (
        //<Layout titulo="Empresa">
        <React.Fragment>
            <Menu/>        
            <MaquinaEquipamentoForm   onSubmit={handleSubmit}/>  
        </React.Fragment>

       //</Layout>
    )
}