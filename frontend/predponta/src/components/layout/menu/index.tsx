import React from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import Router from 'next/router';


export const Menu: React.FC = () => {
  return (

    <Menubar model={items} start={start} end={end}
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
            command:() => (Router.push("/cadastros/emp")),
         },
         {
            label:'Usuário',
            icon:'pi pi-fw pi-trash'
         },
         {
            separator:true
         },
         {
            label:'Técnico',
            icon:'pi pi-fw pi-briefcase'
         }
      ]
   },
   {
      label:'Termográfica',
      icon:'pi pi-fw pi-pencil',
      items:[
         {
            label:'Left',
            icon:'pi pi-fw pi-align-left'
         },
         {
            label:'Right',
            icon:'pi pi-fw pi-align-right'
         },
         {
            label:'Center',
            icon:'pi pi-fw pi-align-center'
         },
         {
            label:'Justify',
            icon:'pi pi-fw pi-align-justify'
         },

      ]
   },
   {
      label:'Vibração',
      icon:'pi pi-fw pi-user',
      items:[
         {
            label:'New',
            icon:'pi pi-fw pi-user-plus',

         },
         {
            label:'Delete',
            icon:'pi pi-fw pi-user-minus',

         },
         {
            label:'Search',
            icon:'pi pi-fw pi-users',
            items:[
               {
                  label:'Filter',
                  icon:'pi pi-fw pi-filter',
                  items:[
                     {
                        label:'Print',
                        icon:'pi pi-fw pi-print'
                     }
                  ]
               },
               {
                  icon:'pi pi-fw pi-bars',
                  label:'List'
               }
            ]
         }
      ]
   },
   {
      label:'Medições',
      icon:'pi pi-fw pi-calendar',
      items:[
         {
            label:'Edit',
            icon:'pi pi-fw pi-pencil',
            items:[
               {
                  label:'Save',
                  icon:'pi pi-fw pi-calendar-plus'
               },
               {
                  label:'Delete',
                  icon:'pi pi-fw pi-calendar-minus'
               },

            ]
         },
         {
            label:'Archieve',
            icon:'pi pi-fw pi-calendar-times',
            items:[
               {
                  label:'Remove',
                  icon:'pi pi-fw pi-calendar-minus'
               }
            ]
         }
      ]
   },

   {
      label:'Análise de óleos',
      icon:'pi pi-fw pi-calendar',
      items:[
         {
            label:'Edit',
            icon:'pi pi-fw pi-pencil',
            items:[
               {
                  label:'Save',
                  icon:'pi pi-fw pi-calendar-plus'
               },
               {
                  label:'Delete',
                  icon:'pi pi-fw pi-calendar-minus'
               },

            ]
         },
         {
            label:'Archieve',
            icon:'pi pi-fw pi-calendar-times',
            items:[
               {
                  label:'Remove',
                  icon:'pi pi-fw pi-calendar-minus'
               }
            ]
         },      
      ]
   },

   {
      label:'Quit',
      icon:'pi pi-fw pi-power-off',
      command:() => (Router.push("http://predponta.com.br/"))
      
   }
];

const start = <img alt="logo" src="/imagens/logo.png" width="200" height="600" className="p-mr-2"></img>;
const end = <InputText placeholder="Search" type="text" />;


