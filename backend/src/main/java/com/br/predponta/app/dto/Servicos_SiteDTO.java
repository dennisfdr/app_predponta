package com.br.predponta.app.dto;

import java.io.Serializable;

import com.br.predponta.app.entities.Servicos_Site;


public class Servicos_SiteDTO implements Serializable{
	private static final long serialVersionUID = 1L;

	private Long ssi_codigo;
	private String ssi_descricao;
	private String ssi_arquivo;
	private Long fal_codigo;
	private String fal_descricao;
		
	public Servicos_SiteDTO () {
			
		}

		public Servicos_SiteDTO(Long ssi_codigo, String ssi_descricao,String ssi_arquivo,Long fal_codigo, String fal_descricao) {
			this.ssi_codigo = ssi_codigo;
			this.ssi_descricao = ssi_descricao;
			this.ssi_arquivo = ssi_arquivo;
			this.fal_codigo = fal_codigo;
			this.fal_descricao = fal_descricao;
		}
		
		public Servicos_SiteDTO (Servicos_Site entity) {
			this.ssi_codigo = entity.getSsi_codigo();
			this.ssi_descricao = entity.getSsi_descricao();
			this.ssi_arquivo = entity.getSsi_arquivo();
			this.fal_codigo = entity.getFal_codigo();
			this.fal_descricao = entity.getFal_descricao();
	}

		public Long getSsi_codigo() {
			return ssi_codigo;
		}

		public void setSsi_codigo(Long ssi_codigo) {
			this.ssi_codigo = ssi_codigo;
		}

		public String getSsi_descricao() {
			return ssi_descricao;
		}

		public void setSsi_descricao(String ssi_descricao) {
			this.ssi_descricao = ssi_descricao;
		}

		public String getSsi_arquivo() {
			return ssi_arquivo;
		}

		public void setSsi_arquivo(String ssi_arquivo) {
			this.ssi_arquivo = ssi_arquivo;
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
