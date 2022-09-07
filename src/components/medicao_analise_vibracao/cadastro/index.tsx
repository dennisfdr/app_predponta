import { MedicaoAnaliseVibracao } from "app/model/medicao_analise_vibracao";
import { useMedicaoAnaliseVibracaoService } from "app/services";
import { Alert } from "components/common/message";
import { Menu } from "components/layout/menu";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { MedicaoAnaliseVibracaoForm } from "./form";



export const CadastroMedicaoAnaliseVibracao: React.FC = () => {

    const service = useMedicaoAnaliseVibracaoService();
    const [ messages, setMessages ] = useState<Alert[]>([])
    const [ vendaRealizada, setVendaRealizada ] = useState<boolean>(false)
    const [ medicaoAnaliseVibracao, setMedicaoAnaliseVibracao ] = useState<MedicaoAnaliseVibracao>();
    
   

    const router = useRouter();
    const { mavCodigo } = router.query;

   

    

    
    const handleSubmit = (equipamento: MedicaoAnaliseVibracao) => {     

          
        if(equipamento.mavCodigo){
           
            service.atualizar(equipamento).then(response => {
                setMessages([{
                    tipo: "success", texto: "MedicaoAnaliseVibracao atualizado com sucesso!"
                }])
                    
            })
        }  else {
            
            service.salvar(equipamento)
            
                    .then(MedicaoAnaliseVibracaoSalvo => {                       
                        setMedicaoAnaliseVibracao(MedicaoAnaliseVibracaoSalvo);                     
                        setMessages([{
                            tipo: "success", texto: "MedicaoAnaliseVibracao salvo com sucesso!"
                        }])
                        
                                        
                    })
            } 
    }    

    
    return (
        //<Layout titulo="Empresa">
        <React.Fragment>
            <Menu/>        
            <MedicaoAnaliseVibracaoForm   onSubmit={handleSubmit}/>  
        </React.Fragment>

       //</Layout>
    )
}