package com.br.predponta.app.dto;

import java.io.Serializable;

import com.br.predponta.app.entities.SubComponente;



public class SubComponenteDTO implements Serializable{
	private static final long serialVersionUID = 1L;


    private Integer scoCodigo;
    private String scoNome;
    private int scoStatus;
    
    private Integer componentePeca;
			
		public SubComponenteDTO () {
			
		}

		public SubComponenteDTO(Integer scoCodigo, String scoNome, int scoStatus, Integer componentePeca) {

	        this.scoCodigo = scoCodigo;
	        this.scoNome = scoNome;
	        this.scoStatus = scoStatus;

			this.componentePeca = componentePeca;	
			
		}
		
		public SubComponenteDTO (SubComponente entity) {

		   ;
	        
	        this.scoCodigo = entity.getScoCodigo();
	        this.scoNome = entity.getScoNome();
	        this.scoStatus = entity.getScoStatus();

			this.componentePeca = entity.getComponentePeca().getCopCodigo();

		}
		
//Generate Getters and Setters;
		
		public Integer getScoCodigo() {
			return scoCodigo;
		}

		public void setScoCodigo(Integer scoCodigo) {
			this.scoCodigo = scoCodigo;
		}

		public String getScoNome() {
			return scoNome;
		}

		public void setScoNome(String scoNome) {
			this.scoNome = scoNome;
		}

		public int getScoStatus() {
			return scoStatus;
		}

		public void setScoStatus(int scoStatus) {
			this.scoStatus = scoStatus;
		}

		public Integer getComponentePeca() {
			return componentePeca;
		}

		public void setComponentePeca(Integer componentePeca) {
			this.componentePeca = componentePeca;
		}
			
}
