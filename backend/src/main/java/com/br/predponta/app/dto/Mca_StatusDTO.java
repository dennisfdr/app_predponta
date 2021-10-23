package com.br.predponta.app.dto;

import java.io.Serializable;

import com.br.predponta.app.entities.Mca_Status;

public class Mca_StatusDTO implements Serializable{
	private static final long serialVersionUID = 1L;

	private Long mcas_codigo;
	private String mcas_descricao;
	private String mcas_cor;

	
		public Mca_StatusDTO () {
			
		}

		public Mca_StatusDTO(Long mcas_codigo, String mcas_descricao,String mcas_cor) {
			this.mcas_codigo = mcas_codigo;
			this.mcas_descricao = mcas_descricao;
			this.mcas_descricao = mcas_cor;
		}
		
		public Mca_StatusDTO (Mca_Status entity) {
			this.mcas_codigo = entity.getMcasr_codigo();
			this.mcas_descricao = entity.getMcasr_descricao();
			this.mcas_cor = entity.getMcasr_cor();

		}

		public Long getMcasr_codigo() {
			return mcas_codigo;
		}

		public void setMcasr_codigo(Long mcas_codigo) {
			this.mcas_codigo = mcas_codigo;
		}

		public String getMcasr_descricao() {
			return mcas_descricao;
		}

		public void setMcasr_descricao(String mcas_descricao) {
			this.mcas_descricao = mcas_descricao;
		}
		
		public String getMcasr_cor() {
			return mcas_cor;
		}

		public void setMcasr_cor(String mcas_cor) {
			this.mcas_cor = mcas_cor;
		}

	
}
