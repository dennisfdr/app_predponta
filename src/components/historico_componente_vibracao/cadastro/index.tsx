import { HistoricoComponenteVibracao } from "app/model/historico_componente_vibracao";
import { useHistoricoComponenteVibracaoService } from "app/services";
import { Alert } from "components/common/message";
import { Menu } from "components/layout/menu";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { HistoricoComponenteVibracaoForm } from "./form";



export const CadastroHistoricoComponenteVibracao: React.FC = () => {

    const service = useHistoricoComponenteVibracaoService();
    const [ messages, setMessages ] = useState<Alert[]>([])
    const [ vendaRealizada, setVendaRealizada ] = useState<boolean>(false)
    const [ historicoComponenteVibracao, setInspecaoAcusticaLocal ] = useState<HistoricoComponenteVibracao>();
    
   

    const router = useRouter();
    const { hcvCodigo } = router.query;

   

    

    
    const handleSubmit = (historicoComponenteVibracao: HistoricoComponenteVibracao) => {     

        
        if(historicoComponenteVibracao.hcvCodigo){
           
            service.atualizar(historicoComponenteVibracao).then(response => {
                setMessages([{
                    tipo: "success", texto: "HistoricoComponenteVibracao atualizado com sucesso!"
                }])
                    
            })
        }  else {
            
            service.salvar(historicoComponenteVibracao)
            
                    .then(HistoricoComponenteVibracaoSalvo => {                       
                        setInspecaoAcusticaLocal(HistoricoComponenteVibracaoSalvo);                     
                        setMessages([{
                            tipo: "success", texto: "HistoricoComponenteVibracao salvo com sucesso!"
                        }])
                        
                                        
                    })
            } 
    }    

    
    return (
        //<Layout titulo="Empresa">
        <React.Fragment>
            <Menu/>        
            <HistoricoComponenteVibracaoForm   onSubmit={handleSubmit}/>  
        </React.Fragment>

       //</Layout>
    )
}