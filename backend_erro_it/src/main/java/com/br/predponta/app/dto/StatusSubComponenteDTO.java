package com.br.predponta.app.dto;

import java.io.Serializable;

import com.br.predponta.app.entities.StatusSubComponente;



public class StatusSubComponenteDTO implements Serializable{
	private static final long serialVersionUID = 1L;

    private Integer sscCodigo;
    private String sscDescricao;
    private String sscCor;
    
    private Integer componente;
			
		public StatusSubComponenteDTO () {
			
		}

		public StatusSubComponenteDTO(Integer sscCodigo, String sscDescricao, String sscCor, Integer componente) {

	        this.sscCodigo = sscCodigo;
	        this.sscDescricao = sscDescricao;
	        this.sscCor = sscCor;

			this.componente = componente;	
			
		}
		
		public StatusSubComponenteDTO (StatusSubComponente entity) {

		   ;
		    
	        this.sscCodigo = entity.getSscCodigo();
	        this.sscDescricao = entity.getSscDescricao();
	        this.sscCor = entity.getSscCor();

			this.componente = entity.getComponente().getComCodigo();

		}
			
//Generate Getters and Setters;
	
		public Integer getSscCodigo() {
			return sscCodigo;
		}

		public void setSscCodigo(Integer sscCodigo) {
			this.sscCodigo = sscCodigo;
		}

		public String getSscDescricao() {
			return sscDescricao;
		}

		public void setSscDescricao(String sscDescricao) {
			this.sscDescricao = sscDescricao;
		}

		public String getSscCor() {
			return sscCor;
		}

		public void setSscCor(String sscCor) {
			this.sscCor = sscCor;
		}

		public static long getSerialversionuid() {
			return serialVersionUID;
		}

		public Integer getComponente() {
			return componente;
		}

		public void setComponente(Integer componente) {
			this.componente = componente;
		}

}
