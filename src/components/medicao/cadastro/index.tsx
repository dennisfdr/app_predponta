import { Medicao } from "app/model/medicao";
import { useMedicaoService } from "app/services";
import { Alert } from "components/common/message";
import { Menu } from "components/layout/menu";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { MedicaoForm } from "./form";



export const CadastroMedicao: React.FC = () => {

    const service = useMedicaoService();
    const [ messages, setMessages ] = useState<Alert[]>([])
    const [ vendaRealizada, setVendaRealizada ] = useState<boolean>(false)
    const [ medicao, setMedicao ] = useState<Medicao>();
    
   

    const router = useRouter();
    const { medCodigo } = router.query;

   

    

    
    const handleSubmit = (medicao: Medicao) => {     

          
        if(medicao.medCodigo){
           
            service.atualizar(medicao).then(response => {
                setMessages([{
                    tipo: "success", texto: "Medicao atualizado com sucesso!"
                }])
                    
            })
        }  else {
            
            service.salvar(medicao)
            
                    .then(MedicaoSalvo => {                       
                        setMedicao(MedicaoSalvo);                     
                        setMessages([{
                            tipo: "success", texto: "Medicao salvo com sucesso!"
                        }])
                        
                                        
                    })
            } 
    }    

    
    return (
        //<Layout titulo="Empresa">
        <React.Fragment>
            <Menu/>        
            <MedicaoForm   onSubmit={handleSubmit}/>  
        </React.Fragment>

       //</Layout>
    )
}