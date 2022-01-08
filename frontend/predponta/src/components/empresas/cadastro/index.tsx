import { useState } from 'react'
import { Layout, Input } from 'components'
import { useEmpresaService } from 'app/services'
import { Empresa } from 'app/dtos/empresas'
import { Button } from 'primereact/button';


export const CadastroEmpresas: React.FC = () => {

  const service = useEmpresaService()
  const [empCodigo, setEmpCodigo] = useState <string> ('')
  const [empNome, setEmpNome] = useState <string> ('')
  const [empStatus, setEmpStatus] = useState <string> ('')
  const [createdAt, setCreatedAt] = useState <string> ('')

  
  const submit = () => {
    const empresa: Empresa = {
      
      empCodigo,
      empNome,
      empStatus,
    
    }
    service
    .salvar(empresa)
    .then(empresaResposta => console.log(empresaResposta))
    
  }

  return (
    
    <Layout titulo="Cadastro de Empresas">
      <div>
                  
      </div>

      <div className="columns">
        <Input
                  label="Código"
                  columnClasses="is-one-half"
                  value={empCodigo}
                  id="inputEmpCod"
                  disabled={true}
                  />
          <Input
                  label="Data de Cadastro"
                  columnClasses="is-one-half"
                  value={createdAt}
                  id="inputCreateAt"
                  disabled={true}
                  />
      </div>     
             
      <div className="columns">
        <Input
                label="Nome"
                columnClasses="is-four-fifths"
                onChange={setEmpNome}
                value={empNome}
                id="inputEmpNome"
                placeholder="Digite o nome da Empresa"
                />                      
      </div>

      <div className="columns">
        <Input
                label="Status"
                columnClasses="is-one-fifth"
                onChange={setEmpStatus}
                value={empStatus}
                id="inputEmpStatus"
                placeholder="Digite o Status"
               />       
      </div>

      <div className="field is-grouped">
        <div className="control">

        <Button label="Salvar" onClick={submit} icon="pi pi-check" iconPos="right"/>

        </div>

        <div className="control">
          <button className="button">
            Voltar
          </button>
        </div>
      </div>
    </Layout>
  )
}


