import { InspecaoAcusticaLocal } from "app/model/inspecao_acustica_local";
import { useInspecaoAcusticaLocalService } from "app/services";
import { Alert } from "components/common/message";
import { Menu } from "components/layout/menu";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { InspecaoAcusticaLocalForm } from "./form";



export const CadastroInspecaoAcusticaLocal: React.FC = () => {

    const service = useInspecaoAcusticaLocalService();
    const [ messages, setMessages ] = useState<Alert[]>([])
    const [ vendaRealizada, setVendaRealizada ] = useState<boolean>(false)
    const [ inspecaoAcusticaLocal, setInspecaoAcusticaLocal ] = useState<InspecaoAcusticaLocal>();
    
   

    const router = useRouter();
    const { ialCodigo } = router.query;

   

    

    
    const handleSubmit = (inspecaoAcusticaLocal: InspecaoAcusticaLocal) => {     

       
        if(inspecaoAcusticaLocal.ialCodigo){
           
            service.atualizar(inspecaoAcusticaLocal).then(response => {
                setMessages([{
                    tipo: "success", texto: "InspecaoAcusticaLocal atualizado com sucesso!"
                }])
                    
            })
        }  else {
            
            service.salvar(inspecaoAcusticaLocal)
            
                    .then(InspecaoAcusticaLocalSalvo => {                       
                        setInspecaoAcusticaLocal(InspecaoAcusticaLocalSalvo);                     
                        setMessages([{
                            tipo: "success", texto: "InspecaoAcusticaLocal salvo com sucesso!"
                        }])
                        
                                        
                    })
            } 
    }    

    
    return (
        //<Layout titulo="Empresa">
        <React.Fragment>
            <Menu/>        
            <InspecaoAcusticaLocalForm   onSubmit={handleSubmit}/>  
        </React.Fragment>

       //</Layout>
    )
}