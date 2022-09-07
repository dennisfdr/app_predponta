import { InspecaoTermograficaPeca } from "app/model/inspecao_termografica_peca";
import { useInspecaoTermograficaPecaService } from "app/services";
import { Alert } from "components/common/message";
import { Menu } from "components/layout/menu";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { InspecaoTermograficaPecaForm } from "./form";



export const CadastroInspecaoTermograficaPeca: React.FC = () => {

    const service = useInspecaoTermograficaPecaService();
    const [ messages, setMessages ] = useState<Alert[]>([])
    const [ vendaRealizada, setVendaRealizada ] = useState<boolean>(false)
    const [ inspecaoTermograficaPeca, setInspecaoTermograficaPeca ] = useState<InspecaoTermograficaPeca>();
    
   

    const router = useRouter();
    const { itpCodigo } = router.query;

   

    

    
    const handleSubmit = (inspecaoTermograficaPeca: InspecaoTermograficaPeca) => {     

       
        if(inspecaoTermograficaPeca.itpCodigo){
           
            service.atualizar(inspecaoTermograficaPeca).then(response => {
                setMessages([{
                    tipo: "success", texto: "InspecaoTermograficaPeca atualizado com sucesso!"
                }])
                    
            })
        }  else {
            
            service.salvar(inspecaoTermograficaPeca)
            
                    .then(InspecaoTermograficaPecaSalvo => {                       
                        setInspecaoTermograficaPeca(InspecaoTermograficaPecaSalvo);                     
                        setMessages([{
                            tipo: "success", texto: "InspecaoTermograficaPeca salvo com sucesso!"
                        }])
                        
                                        
                    })
            } 
    }    

    
    return (
        //<Layout titulo="Empresa">
        <React.Fragment>
            <Menu/>        
            <InspecaoTermograficaPecaForm   onSubmit={handleSubmit}/>  
        </React.Fragment>

       //</Layout>
    )
}