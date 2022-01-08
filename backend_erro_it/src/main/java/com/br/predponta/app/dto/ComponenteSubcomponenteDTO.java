package com.br.predponta.app.dto;

import java.io.Serializable;

import com.br.predponta.app.entities.ComponenteSubcomponente;



public class ComponenteSubcomponenteDTO implements Serializable{
	private static final long serialVersionUID = 1L;

    private Integer cscCodigo;
    private String  cscDescricao;

    private Integer subComponente;

		public ComponenteSubcomponenteDTO () {
			
		}

		public ComponenteSubcomponenteDTO(Integer cscCodigo, String cscDescricao, Integer subComponente) {

	        this.cscCodigo = cscCodigo;
	        this.cscDescricao = cscDescricao;

			this.subComponente = subComponente;	
			
		}
		
		public ComponenteSubcomponenteDTO (ComponenteSubcomponente entity) {

		   ;
	        
	        this.cscCodigo = entity.getCscCodigo();
	        this.cscDescricao = entity.getCscDescricao();


			this.subComponente = entity.getSubComponente().getScoCodigo();

		}
		
//Generate Getters and Setters;
	
		public Integer getCscCodigo() {
			return cscCodigo;
		}

		public void setCscCodigo(Integer cscCodigo) {
			this.cscCodigo = cscCodigo;
		}

		public String getCscDescricao() {
			return cscDescricao;
		}

		public void setCscDescricao(String cscDescricao) {
			this.cscDescricao = cscDescricao;
		}

		public Integer getSubComponente() {
			return subComponente;
		}

		public void setSubComponente(Integer subComponente) {
			this.subComponente = subComponente;
		}
		
}
