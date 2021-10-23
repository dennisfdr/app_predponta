package com.br.predponta.app.dto;

import java.io.Serializable;

import com.br.predponta.app.entities.Mca_Status_Relatorio;

public class Mca_Status_RelatorioDTO implements Serializable{
	private static final long serialVersionUID = 1L;

	private Long mcasr_codigo;
	private String mcasr_descricao;
	private String mcasr_cor;
	private Long fal_codigo;
	private String fal_descricao;
	
		public Mca_Status_RelatorioDTO () {
			
		}

		public Mca_Status_RelatorioDTO(Long mcasr_codigo, String mcasr_descricao,String mcasr_cor) {
			this.mcasr_codigo = mcasr_codigo;
			this.mcasr_descricao = mcasr_descricao;
			this.mcasr_descricao = mcasr_cor;
		}
		
		public Mca_Status_RelatorioDTO (Mca_Status_Relatorio entity) {
			this.mcasr_codigo = entity.getMcasr_codigo();
			this.mcasr_descricao = entity.getMcasr_descricao();
			this.mcasr_cor = entity.getMcasr_cor();
			this.fal_codigo = entity.getFal_codigo();
			this.fal_descricao = entity.getFal_descricao();
		}

		public Long getMcasr_codigo() {
			return mcasr_codigo;
		}

		public void setMcasr_codigo(Long mcasr_codigo) {
			this.mcasr_codigo = mcasr_codigo;
		}

		public String getMcasr_descricao() {
			return mcasr_descricao;
		}

		public void setMcasr_descricao(String mcasr_descricao) {
			this.mcasr_descricao = mcasr_descricao;
		}
		
		public String getMcasr_cor() {
			return mcasr_cor;
		}

		public void setMcasr_cor(String mcasr_cor) {
			this.mcasr_cor = mcasr_cor;
		}
		
		public Long getFal_codigo() {
			return fal_codigo;
		}

		public void setFal_codigo(Long fal_codigo) {
			this.fal_codigo = fal_codigo;
		}

		public String getFal_descricao() {
			return fal_descricao;
		}

		public void setFal_descricao(String fal_descricao) {
			this.fal_descricao = fal_descricao;
		}
	
}
