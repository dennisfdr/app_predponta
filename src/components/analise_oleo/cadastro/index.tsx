import { AnaliseOleo } from "app/model/analise_oleo";
import { useAnaliseOleoService } from "app/services";
import { Alert } from "components/common/message";
import { Menu } from "components/layout/menu";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { AnaliseOleoForm } from "./form";



export const CadastroAnaliseOleo: React.FC = () => {

    const service = useAnaliseOleoService();
    const [ messages, setMessages ] = useState<Alert[]>([])
    const [ vendaRealizada, setVendaRealizada ] = useState<boolean>(false)
    const [ analiseOleo, setAnaliseOleo ] = useState<AnaliseOleo>();
    
   

    const router = useRouter();
    const { anoCodigo } = router.query;

   

    

    
    const handleSubmit = (analiseOleo: AnaliseOleo) => {     

        
        if(analiseOleo.anoCodigo){

            console.log("Entrou aqui!!!" + analiseOleo.anoCodigo)
           
            service.atualizar(analiseOleo).then(response => {
                setMessages([{
                    tipo: "success", texto: "AnaliseOleo atualizado com sucesso!"
                }])
                    
            })
        }  else {

            
            
            service.salvar(analiseOleo)
            
                    .then(AnaliseOleoSalvo => {                       
                        setAnaliseOleo(AnaliseOleoSalvo);                     
                        setMessages([{
                            tipo: "success", texto: "AnaliseOleo salvo com sucesso!"
                        }])
                        
                                        
                    })
            } 
    }    

    
    return (
        //<Layout titulo="Empresa">
        <React.Fragment>
            <Menu/>        
            <AnaliseOleoForm   onSubmit={handleSubmit}/>  
        </React.Fragment>

       //</Layout>
    )
}