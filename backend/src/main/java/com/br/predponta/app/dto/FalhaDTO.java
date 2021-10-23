package com.br.predponta.app.dto;

import java.io.Serializable;

import com.br.predponta.app.entities.Falha;

public class FalhaDTO implements Serializable{
	private static final long serialVersionUID = 1L;

	private Long fal_codigo;
	private String fal_descricao;
	private Long hco_fk_ssc_codigo;
	private Long hco_codigo;
	private Long hco_fk_ite_codigo; 
	private Long hco_fk_med_codigo;
	private Long hco_fk_sco_codigo;
	private Long hco_observacao;
	private Long hco_ordem_servico;
		
		public FalhaDTO () {
			
		}

		public FalhaDTO(Long fal_codigo, String fal_descricao, Long hco_fk_ssc_codigo, Long hco_codigo, Long hco_fk_ite_codigo, Long hco_fk_med_codigo, Long hco_fk_sco_codigo, Long hco_observacao, Long hco_ordem_servico) {
			this.fal_codigo = fal_codigo;
			this.fal_descricao = fal_descricao;
			this.hco_fk_ssc_codigo = hco_fk_ssc_codigo;
			this.hco_codigo = hco_codigo;
			this.hco_fk_ite_codigo = hco_fk_ite_codigo; 
			this.hco_fk_med_codigo = hco_fk_med_codigo;
			this.hco_fk_sco_codigo = hco_fk_sco_codigo;
			this.hco_observacao = hco_observacao;
			this.hco_ordem_servico = hco_ordem_servico;
		}
		
		public FalhaDTO (Falha entity) {
			this.fal_codigo = entity.getFal_codigo();
			this.fal_descricao = entity.getFal_descricao();
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

		public Long getHco_fk_ssc_codigo() {
			return hco_fk_ssc_codigo;
		}

		public void setHco_fk_ssc_codigo(Long hco_fk_ssc_codigo) {
			this.hco_fk_ssc_codigo = hco_fk_ssc_codigo;
		}

		public Long getHco_codigo() {
			return hco_codigo;
		}

		public void setHco_codigo(Long hco_codigo) {
			this.hco_codigo = hco_codigo;
		}

		public Long getHco_fk_ite_codigo() {
			return hco_fk_ite_codigo;
		}

		public void setHco_fk_ite_codigo(Long hco_fk_ite_codigo) {
			this.hco_fk_ite_codigo = hco_fk_ite_codigo;
		}

		public Long getHco_fk_med_codigo() {
			return hco_fk_med_codigo;
		}

		public void setHco_fk_med_codigo(Long hco_fk_med_codigo) {
			this.hco_fk_med_codigo = hco_fk_med_codigo;
		}

		public Long getHco_fk_sco_codigo() {
			return hco_fk_sco_codigo;
		}

		public void setHco_fk_sco_codigo(Long hco_fk_sco_codigo) {
			this.hco_fk_sco_codigo = hco_fk_sco_codigo;
		}

		public Long getHco_observacao() {
			return hco_observacao;
		}

		public void setHco_observacao(Long hco_observacao) {
			this.hco_observacao = hco_observacao;
		}

		public Long getHco_ordem_servico() {
			return hco_ordem_servico;
		}

		public void setHco_ordem_servico(Long hco_ordem_servico) {
			this.hco_ordem_servico = hco_ordem_servico;
		}
	
		
}
