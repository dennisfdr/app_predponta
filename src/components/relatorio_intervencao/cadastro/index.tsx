import { RelatorioIntervencao } from "app/model/relatorio_intervencao";
import { useRelatorioIntervencaoService } from "app/services";
import { Alert } from "components/common/message";
import { Menu } from "components/layout/menu";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { RelatorioIntervencaoForm } from "./form";



export const CadastroRelatorioIntervencao: React.FC = () => {

    const service = useRelatorioIntervencaoService();
    const [ messages, setMessages ] = useState<Alert[]>([])
    const [ vendaRealizada, setVendaRealizada ] = useState<boolean>(false)
    const [ relatorioIntervencao, setMedicao ] = useState<RelatorioIntervencao>();
    
   

    const router = useRouter();
    const { riCodigo } = router.query;

   

    

    
    const handleSubmit = (relatorioIntervencao: RelatorioIntervencao) => {     

          
        if(relatorioIntervencao.riCodigo){
           
            service.atualizar(relatorioIntervencao).then(response => {
                setMessages([{
                    tipo: "success", texto: "RelatorioIntervencao atualizado com sucesso!"
                }])
                    
            })
        }  else {
            
            service.salvar(relatorioIntervencao)
            
                    .then(RelatorioIntervencaoSalvo => {                       
                        setMedicao(RelatorioIntervencaoSalvo);                     
                        setMessages([{
                            tipo: "success", texto: "RelatorioIntervencao salvo com sucesso!"
                        }])
                        
                                        
                    })
            } 
    }    

    
    return (
        //<Layout titulo="Empresa">
        <React.Fragment>
            <Menu/>        
            <RelatorioIntervencaoForm   onSubmit={handleSubmit}/>  
        </React.Fragment>

       //</Layout>
    )
}