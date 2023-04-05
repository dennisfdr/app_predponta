import React from 'react';
import Image from 'next/image'
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import Router from 'next/router';


export const Menu: React.FC = () => {
  return (

    <Menubar model={items} start={start} 
    />

  )
}

const items = [
   {
      label:'Cadastro',
      icon:'pi pi-fw pi-file',
      items:[
      
         {
            label:'Empresa',
            icon:'pi pi-fw pi-home',
            items:[

                     {
                        label:'Geral',
                        icon:'pi pi-fw pi-home',
                        command:() => (Router.push("/cadastros/empresas")),
                     },

                     {
                        label:'Email',
                        icon:'pi pi-fw pi-home',
                        command:() => (Router.push("/cadastros/empresaEmail")),
                     },

                     {
                        label:'Imagens',
                        icon:'pi pi-fw pi-home',
                        command:() => (Router.push("/cadastros/arquivoUpload")),
                     },

                     {
                        label:'Setor',
                        icon:'pi pi-fw pi-home',
                        command:() => (Router.push("/cadastros/setor")),
                     },
                  ]
         },         

         {
            label:'Usuário',
            icon:'pi pi-fw pi-trash',
            
            
         },
         /*{
            separator:true
         },*/
         {
            label:'Técnico',
            icon:'pi pi-fw pi-briefcase'
         },

         {
            label:'Categoria',
            icon:'pi pi-fw pi-briefcase',
            command:() => (Router.push("/cadastros/categoria"))

         },

         {
            label:'SubComponente',
            icon:'pi pi-fw pi-briefcase',
            command:() => (Router.push("/cadastros/sub_componente"))

         },

         {
            label:'Falha',
            icon:'pi pi-sitemap pi-align-right',
            command:() => (Router.push("/cadastros/falha"))
         },

         {
            label:'Equipamento',
            icon:'pi pi-sitemap pi-align-right',
            command:() => (Router.push("/cadastros/equipamento"))
         },



         
        /* {
            label:'Categoria',
            icon:'pi pi-fw pi-home',
            command:() => (Router.push("/cadastros/categoria")),
         },*/
         
         
       {
            label:'Máquina',
            icon:'pi pi-fw pi-bars',
            items:[
               {
                  label:'Geral',
                  icon:'pi pi-fw pi-align-left',
                  command:() => (Router.push("/cadastros/maquinas")),
               },

               {
                  label:'Máquina-Equipamento',
                  icon:'pi pi-fw pi-align-left',
                  command:() => (Router.push("/cadastros/maquina_equipamento")),
               },

               {
                  label:'Componente',
                  icon:'pi pi-fw pi-align-left',
                  items: [
                        {
                           label:'Geral',
                           icon:'pi pi-fw pi-align-left',
                           command:() => (Router.push("/cadastros/componente")),  

                        },

                        

                        {
                           label:'Componente Peça',
                           icon:'pi pi-cog pi-align-right',
                           command:() => (Router.push("/cadastros/componente_peca")),
                        }, 
         
                        /*{
                           label:'SubComponente',
                           icon:'pi pi-clone pi-align-right',
                           command:() => (Router.push("/cadastros/sub_componente")),
                        },*/
         
                        {
                           label:'CompSubComp',
                           icon:'pi pi-sitemap pi-align-right',
                           command:() => (Router.push("/cadastros/componente_subcomponente")),
                        },

                        {
                           label:'Histórico Componentes',
                           icon:'pi pi-book pi-align-right',
                           command:() => (Router.push("/cadastros/historico_componente")),
                        }, 

                        /*{
                           label:'Status Sub Componente',
                           icon:'pi pi-check pi-align-right',
                           command:() => (Router.push("/cadastros/status_sub_componente")),
                        },*/


                  ]
               }                 

               

            ]
         },
         
         
        
      ]
   },
   {
      label:'Análise de Vibração - RI',
      icon:'pi pi-fw pi-calendar',
      items:[
         
            {
               label:'Abrir Medição',
               icon:'pi pi-sitemap pi-align-right',
               command:() => (Router.push("/cadastros/medicao"))
            },

            

           /* {
               label:'Inspecao Acústica Local',
               icon:'pi pi-sitemap pi-align-right',
               command:() => (Router.push("/cadastros/inspecao_acustica_local"))
            },*/

            {
               label:'Relatório de Intervenção',
               icon:'pi pi-sitemap pi-align-right',
               command:() => (Router.push("/cadastros/relatorio_intervencao"))
            },

          /*  {
               label:'Falha',
               icon:'pi pi-sitemap pi-align-right',
               command:() => (Router.push("/cadastros/falha"))
            },*/
         
      ]
   },

   {
      label:'Termográfica',
      icon:'pi pi-fw pi-pencil',
      items:[
         {
            label:'Inspeção Termográfica',
            icon:'pi pi-fw pi-user-plus',
            command:() => (Router.push("/cadastros/inspecao_termografica"))

         },
         {
            label:'Inspeção Termográfica Peca',
            icon:'pi pi-fw pi-user-plus',
            command:() => (Router.push("/cadastros/inspecao_termografica_peca"))
         },
         {
            label:'Condições Ambiente',
            icon:'pi pi-fw pi-user-plus',
            command:() => (Router.push("/cadastros/condicoes_ambiente"))
         },
         {
            label:'Especificação Falha',
            icon:'pi pi-fw pi-user-plus',
            command:() => (Router.push("/cadastros/especificacao_falha"))
         },

      ]
   },
   {
      label:'Vibração',
      icon:'pi pi-fw pi-user',
      items:[
         {
            label:'Analise Vibração',
            icon:'pi pi-fw pi-user-plus',
            command:() => (Router.push("/cadastros/medicao_analise_vibracao"))

         },
         {
            label:'Status Componente',
            icon:'pi pi-fw pi-user-minus',
            command:() => (Router.push("/cadastros/status_componente_vibracao"))

         },

         {
            label:'Historico Componente',
            icon:'pi pi-fw pi-user-minus',
            command:() => (Router.push("/cadastros/historico_componente_vibracao"))

         },


         
      ]
   },
   

   {
      label:'Análise de óleos',
      icon:'pi pi-fw pi-calendar',
      items:[
         {
            label:'Geral',
            icon:'pi pi-fw pi-pencil',
            command:() => (Router.push("/cadastros/analise_oleo"))
            
         },

         {
            label:'Medição Análise Oleo',
            icon:'pi pi-fw pi-pencil',
            command:() => (Router.push("/cadastros/medicao_analise_oleo"))
            
         },
        
         {
            label:'Status Análise Oleo',
            icon:'pi pi-fw pi-pencil',
            command:() => (Router.push("/cadastros/status_analise_oleo"))
            
         }, 
         
      ]
   },

   {
      label:'MCA',
      icon:'pi pi-fw pi-calendar',
      items:[
         {
            label:'MCA Medição',
            icon:'pi pi-fw pi-pencil',
            command:() => (Router.push("/cadastros/mca_medicao"))
            
         },

         {
            label:'MCA Relatório',
            icon:'pi pi-fw pi-pencil',
            command:() => (Router.push("/cadastros/mca_relatorio"))
            
         },
        
         {
            label:'MCA Circuito',
            icon:'pi pi-fw pi-pencil',
            command:() => (Router.push("/cadastros/mca_circuito"))
            
         }, 

         {
            label:'MCA Status Relatório',
            icon:'pi pi-fw pi-pencil',
            command:() => (Router.push("/cadastros/mca_status_relatorio"))
            
         }, 

         {
            label:'MCA Status',
            icon:'pi pi-fw pi-pencil',
            command:() => (Router.push("/cadastros/mca_status"))
            
         }, 
         
      ]
   },

   {
      label:'Sair',
      icon:'pi pi-fw pi-power-off',
      command:() => (Router.push("http://predponta.com.br/"))
      
   }
];





const start = <Image alt="logo" src="/imagens/logo.png" width="100" height="100" className="p-mr-2"></Image>;



