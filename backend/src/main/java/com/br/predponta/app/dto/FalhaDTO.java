package com.br.predponta.app.dto;

import java.io.Serializable;

import com.br.predponta.app.entities.Falha;



public class FalhaDTO implements Serializable{
	private static final long serialVersionUID = 1L;

	private Integer fal_codigo;
	private String fal_descricao;
		
		public FalhaDTO () {
			
		}

		public FalhaDTO(Integer fal_codigo, String fal_descricao) {
			this.fal_codigo = fal_codigo;
			this.fal_descricao = fal_descricao;
		}
		
		public FalhaDTO (Falha entity) {
			this.fal_codigo = entity.getFalCodigo();
			this.fal_descricao = entity.getFalDescricao();
		}

		public Integer getFal_codigo() {
			return fal_codigo;
		}

		public void setFal_codigo(Integer fal_codigo) {
			this.fal_codigo = fal_codigo;
		}

		public String getFal_descricao() {
			return fal_descricao;
		}

		public void setFal_descricao(String fal_descricao) {
			this.fal_descricao = fal_descricao;
		}
	
}
