package com.br.predponta.app.dto;

import java.io.Serializable;

import com.br.predponta.app.entities.HistoricoComponente;



public class HistoricoComponenteDTO implements Serializable{
	private static final long serialVersionUID = 1L;

    private long hcoCodigo;
    private String hcoObservacao;
    private String hcoOrdemServico;
    
    private Integer componente;
			
		public HistoricoComponenteDTO () {
			
		}

		public HistoricoComponenteDTO(long hcoCodigo, String hcoObservacao, String hcoOrdemServico, Integer componente) {

	        this.hcoCodigo = hcoCodigo;
	        this.hcoObservacao = hcoObservacao;
	        this.hcoOrdemServico = hcoOrdemServico;

			this.componente = componente;	
			
		}
		
		public HistoricoComponenteDTO (HistoricoComponente entity) {

		   ;
		    
	        this.hcoCodigo = entity.getHcoCodigo();
	        this.hcoObservacao = entity.getHcoObservacao();
	        this.hcoOrdemServico = entity.getHcoOrdemServico();

			this.componente = entity.getComponente().getComCodigo();

		}
				
//Generate Getters and Setters;
	
		public long getHcoCodigo() {
			return hcoCodigo;
		}

		public void setHcoCodigo(long hcoCodigo) {
			this.hcoCodigo = hcoCodigo;
		}

		public String getHcoObservacao() {
			return hcoObservacao;
		}

		public void setHcoObservacao(String hcoObservacao) {
			this.hcoObservacao = hcoObservacao;
		}

		public String getHcoOrdemServico() {
			return hcoOrdemServico;
		}

		public void setHcoOrdemServico(String hcoOrdemServico) {
			this.hcoOrdemServico = hcoOrdemServico;
		}

		public Integer getComponente() {
			return componente;
		}

		public void setComponente(Integer componente) {
			this.componente = componente;
		}
			
}
