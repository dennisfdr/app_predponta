package com.br.predponta.app.dto;

import java.io.Serializable;

import com.br.predponta.app.entities.Componente;



public class ComponenteDTO implements Serializable{
	private static final long serialVersionUID = 1L;

    private Integer comCodigo;
    private String comNome;
    private int comStatus;
    
    private Integer maquinaequipamentoMAECODIGO;
			
		public ComponenteDTO () {
			
		}

		public ComponenteDTO(Integer comCodigo, String comNome, int comStatus, Integer maquinaequipamentoMAECODIGO) {

			this.comCodigo = comCodigo;
			this.comNome = comNome;
			this.comStatus = comStatus;
			
			this.maquinaequipamentoMAECODIGO = maquinaequipamentoMAECODIGO;
		}
		
		public ComponenteDTO (Componente entity) {

		   ;
		    this.comCodigo = entity.getComCodigo();
		    this.comNome = entity.getComNome();
		    this.comStatus = entity.getComStatus();
		    
		    this.maquinaequipamentoMAECODIGO = entity.getMaquinaequipamentoMAECODIGO().getMaeCodigo();

		}

//Generate Getters and Setters;
				
		public Integer getComCodigo() {
			return comCodigo;
		}

		public void setComCodigo(Integer comCodigo) {
			this.comCodigo = comCodigo;
		}

		public String getComNome() {
			return comNome;
		}

		public void setComNome(String comNome) {
			this.comNome = comNome;
		}

		public int getComStatus() {
			return comStatus;
		}

		public void setComStatus(int comStatus) {
			this.comStatus = comStatus;
		}

		public Integer getMaquinaequipamentoMAECODIGO() {
			return maquinaequipamentoMAECODIGO;
		}

		public void setMaquinaequipamentoMAECODIGO(Integer maquinaequipamentoMAECODIGO) {
			this.maquinaequipamentoMAECODIGO = maquinaequipamentoMAECODIGO;
		}

}
