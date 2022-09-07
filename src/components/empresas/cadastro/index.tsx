import { Empresa, EmpresaEmail } from 'app/model/empresas'
import { Layout} from 'components'
//import { EmpresaForm } from './form'
import { useEmpresaService } from 'app/services'
import { Alert } from 'components/common/message'
import React, { useState } from 'react' 
import { Menu } from '../../../components/layout/menu'
import { useRouter } from 'next/router'
import { useEffect } from 'react'


import { EmpresaForm } from './form2'
import { devNull } from 'os'



export const CadastroEmpresa: React.FC = () => {

    const service = useEmpresaService();
    const [ messages, setMessages ] = useState<Alert[]>([])
    const [ vendaRealizada, setVendaRealizada ] = useState<boolean>(false)
    const [ empresa, setEmpresa ] = useState<Empresa>();
    
    const [ empresasEmail ] = useState<EmpresaEmail[]>([]);
    const [ empresaEmail ] = useState<EmpresaEmail>();

    const router = useRouter();
    const { empCodigo } = router.query;

   

    

    
    const handleSubmit = (empresa: Empresa) => {     

          
        if(empresa.empCodigo){
           
            service.atualizar(empresa).then(response => {
                setMessages([{
                    tipo: "success", texto: "Empresa atualizado com sucesso!"
                }])
                    
            })
        }  else {
            
            service.salvar(empresa)
            
                    .then(empresaSalvo => {                       
                        setEmpresa(empresaSalvo);                     
                        setMessages([{
                            tipo: "success", texto: "Empresa salvo com sucesso!"
                        }])
                        
                                        
                    })
            } 
    }    

    
    return (
        //<Layout titulo="Empresa">
        <React.Fragment>
            <Menu/>        
            <EmpresaForm  empresaSalvo={empresa} mensagens={messages} onSubmit={handleSubmit}/>  
        </React.Fragment>

       //</Layout>
    )
}