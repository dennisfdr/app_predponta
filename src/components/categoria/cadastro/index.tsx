import { Categoria } from "app/model/categoria";
import { useCategoriaService } from "app/services";
import { Alert } from "components/common/message";
import { Menu } from "components/layout/menu";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import { CategoriaForm } from "./form";



export const CadastroCategoria: React.FC = () => {

    const service = useCategoriaService();
    const [ messages, setMessages ] = useState<Alert[]>([])
    const [ vendaRealizada, setVendaRealizada ] = useState<boolean>(false)
    const [ categoria, setCategoria ] = useState<Categoria>();
    const [ listaCategoria, setListaCategoria ] = useState<Categoria[]>([]);
   
    
    
   

    const router = useRouter();
    const { catCodigo } = router.query;


  
   

     

    
    const handleSubmit = (categoria: Categoria) => {     

        
        if(categoria.catCodigo){

            
           
            service.atualizar(categoria).then(response => {
                
                setMessages([{
                    tipo: "success", texto: "Categoria atualizado com sucesso!"
                }])
                    
            })
        }  else {

            
            
            service.salvar(categoria)
            
                    .then(categoriaSalvo => {                       
                        setCategoria(categoriaSalvo); 
                        setListaCategoria((state) => [...state, { ...categoriaSalvo }]);               
                        setMessages([{
                            tipo: "success", texto: "Categoria salvo com sucesso!"

                        }])

                        
                                        
                    })
            } 
    }    

    
    return (
        //<Layout titulo="Empresa">
        <React.Fragment>
            <Menu/>        
            <CategoriaForm  onSubmit={handleSubmit}/>  
        </React.Fragment>

        

       //</Layout>

      
    )
}