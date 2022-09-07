import { MedicaoAnaliseOleo } from "app/model/medicao_analise_oleo";
import { useMedicaoAnaliseOleoService } from "app/services";
import { Alert } from "components/common/message";
import { Menu } from "components/layout/menu";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { MedicaoAnaliseOleoForm } from "./form";



export const CadastroMedicaoAnaliseOleo: React.FC = () => {

    const service = useMedicaoAnaliseOleoService();
    const [ messages, setMessages ] = useState<Alert[]>([])
    const [ vendaRealizada, setVendaRealizada ] = useState<boolean>(false)
    const [ medicaoAnaliseOleo, setMedicaoAnaliseOleo ] = useState<MedicaoAnaliseOleo>();
    
   

    const router = useRouter();
    const { maoCodigo } = router.query;

   

    

    
    const handleSubmit = (medicaoAnaliseOleo: MedicaoAnaliseOleo) => {     

        
        if(medicaoAnaliseOleo.maoCodigo){
           
            service.atualizar(medicaoAnaliseOleo).then(response => {
                setMessages([{
                    tipo: "success", texto: "MedicaoAnaliseOleo atualizado com sucesso!"
                }])
                    
            })
        }  else {

            
            
            service.salvar(medicaoAnaliseOleo)
            
                    .then(MedicaoAnaliseOleoSalvo => {                       
                        setMedicaoAnaliseOleo(MedicaoAnaliseOleoSalvo);                     
                        setMessages([{
                            tipo: "success", texto: "MedicaoAnaliseOleo salvo com sucesso!"
                        }])
                        
                                        
                    })
            } 
    }    

    
    return (
        //<Layout titulo="Empresa">
        <React.Fragment>
            <Menu/>        
            <MedicaoAnaliseOleoForm   onSubmit={handleSubmit}/>  
        </React.Fragment>

       //</Layout>
    )
}