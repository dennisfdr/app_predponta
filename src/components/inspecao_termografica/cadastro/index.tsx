import { InspecaoTermografica } from "app/model/inspecao_termografica";
import { useInspecaoTermograficaService } from "app/services";
import { Alert } from "components/common/message";
import { Menu } from "components/layout/menu";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { InspecaoTermograficaForm } from "./form";



export const CadastroInspecaoTermografica: React.FC = () => {

    const service = useInspecaoTermograficaService();
    const [ messages, setMessages ] = useState<Alert[]>([])
    const [ vendaRealizada, setVendaRealizada ] = useState<boolean>(false)
    const [ inspecaoTermografica, setInspecaoTermografica ] = useState<InspecaoTermografica>();
    
   

    const router = useRouter();
    const { iteCodigo } = router.query;

   

    

    
    const handleSubmit = (inspecaoTermografica: InspecaoTermografica) => {     

       
        if(inspecaoTermografica.iteCodigo){
           
            service.atualizar(inspecaoTermografica).then(response => {
                setMessages([{
                    tipo: "success", texto: "InspecaoTermografica atualizado com sucesso!"
                }])
                    
            })
        }  else {
            
            service.salvar(inspecaoTermografica)
            
                    .then(InspecaoTermograficaSalvo => {                       
                        setInspecaoTermografica(InspecaoTermograficaSalvo);                     
                        setMessages([{
                            tipo: "success", texto: "InspecaoTermografica salvo com sucesso!"
                        }])
                        
                                        
                    })
            } 
    }    

    
    return (
        //<Layout titulo="Empresa">
        <React.Fragment>
            <Menu/>        
            <InspecaoTermograficaForm   onSubmit={handleSubmit}/>  
        </React.Fragment>

       //</Layout>
    )
}