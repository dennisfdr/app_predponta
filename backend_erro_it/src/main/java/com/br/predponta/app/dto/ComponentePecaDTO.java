package com.br.predponta.app.dto;

import java.io.Serializable;


import com.br.predponta.app.entities.ComponentePeca;



public class ComponentePecaDTO implements Serializable{
	private static final long serialVersionUID = 1L;

    private Integer copCodigo;
    private String copDescricao;
    private int copStatus;
	
    private Integer componente;
			
		public ComponentePecaDTO () {
			
		}

		public ComponentePecaDTO(Integer copCodigo, String copDescricao, int copStatus, Integer componente) {

	        this.copCodigo = copCodigo;
	        this.copDescricao = copDescricao;
	        this.copStatus = copStatus;	

			this.componente = componente;	
			
		}
		
		public ComponentePecaDTO (ComponentePeca entity) {

		   ;
	        
	        this.copCodigo = entity.getCopCodigo();
	        this.copDescricao = entity.getCopDescricao();
	        this.copStatus = entity.getCopStatus();

			this.componente = entity.getComponente().getComCodigo();

		}
		
//Generate Getters and Setters;	

		public Integer getCopCodigo() {
			return copCodigo;
		}

		public void setCopCodigo(Integer copCodigo) {
			this.copCodigo = copCodigo;
		}

		public String getCopDescricao() {
			return copDescricao;
		}

		public void setCopDescricao(String copDescricao) {
			this.copDescricao = copDescricao;
		}

		public int getCopStatus() {
			return copStatus;
		}

		public void setCopStatus(int copStatus) {
			this.copStatus = copStatus;
		}

		public Integer getComponente() {
			return componente;
		}

		public void setComponente(Integer componente) {
			this.componente = componente;
		}
		
}
