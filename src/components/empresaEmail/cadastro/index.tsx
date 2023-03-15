import { EmpresaEmail } from "app/model/empresaEmail";
import { useEmpresaEmailService } from "app/services";
import { Alert } from "components/common/message";
import { Menu } from "components/layout/menu";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { EmpresaEmailForm } from "./form";



export const CadastroEmpresaEmail: React.FC = () => {

    const service = useEmpresaEmailService();
    const [ messages, setMessages ] = useState<Alert[]>([])
    const [ vendaRealizada, setVendaRealizada ] = useState<boolean>(false)
    const [ empresaEmail, setEmpresaEmail ] = useState<EmpresaEmail>();
    
   

    const router = useRouter();
    const { emeCodigo } = router.query;

   

    

    
    const handleSubmit = (empresaEmail: EmpresaEmail) => {     

          
        if(empresaEmail.emeCodigo){
           
            service.atualizar(empresaEmail).then(response => {
                setMessages([{
                    tipo: "success", texto: "EmpresaEmail atualizado com sucesso!"
                }])
                    
            })
        }  else {
            
            service.salvar(empresaEmail)
            
                    .then(EmpresaEmailSalvo => {                       
                        setEmpresaEmail(EmpresaEmailSalvo);                     
                        setMessages([{
                            tipo: "success", texto: "EmpresaEmail salvo com sucesso!"
                        }])
                        
                                        
                    })
            } 
    }    

    
    return (
        //<Layout titulo="Empresa">
        <React.Fragment>
            <Menu/>        
            <EmpresaEmailForm   onSubmit={handleSubmit}/>  
        </React.Fragment>

       //</Layout>
    )
}