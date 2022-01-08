package com.br.predponta.app.dto;

import java.io.Serializable;

import com.br.predponta.app.entities.Falha;



public class FalhaDTO implements Serializable{
	private static final long serialVersionUID = 1L;


    private Integer falCodigo;
    private String falDescricao;
    private Integer relatorioIntervencaoriCodigo;
			
		public FalhaDTO () {
			
		}

		public FalhaDTO(Integer falCodigo, String falDescricao, Integer relatorioIntervencaoriCodigo) {
	       
	        this.falCodigo = falCodigo;
	        this.falDescricao = falDescricao;

	        this.relatorioIntervencaoriCodigo = relatorioIntervencaoriCodigo;
		}
		
		public FalhaDTO (Falha entity) {
								

	        this.falCodigo = entity.getFalCodigo();
	        this.falDescricao = entity.getFalDescricao();
			
	        this.relatorioIntervencaoriCodigo = entity.getRelatorioIntervencao().getRiCodigo();

		}
		
//Generate Getters and Setters;

		public Integer getFalCodigo() {
			return falCodigo;
		}

		public void setFalCodigo(Integer falCodigo) {
			this.falCodigo = falCodigo;
		}

		public String getFalDescricao() {
			return falDescricao;
		}

		public void setFalDescricao(String falDescricao) {
			this.falDescricao = falDescricao;
		}

		public Integer getRelatorioIntervencaoriCodigo() {
			return relatorioIntervencaoriCodigo;
		}

		public void setRelatorioIntervencaoriCodigo(Integer relatorioIntervencaoriCodigo) {
			this.relatorioIntervencaoriCodigo = relatorioIntervencaoriCodigo;
		}

}
