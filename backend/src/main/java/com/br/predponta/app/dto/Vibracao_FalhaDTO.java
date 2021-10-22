package com.br.predponta.app.dto;

import java.io.Serializable;

import com.br.predponta.app.entities.Vibracao_Falha;



public class Vibracao_FalhaDTO implements Serializable{
	private static final long serialVersionUID = 1L;

	private Long fal_codigo;
	private String fal_descricao;
		
		public Vibracao_FalhaDTO () {
			
		}

		public Vibracao_FalhaDTO(Long fal_codigo, String fal_descricao) {
			this.fal_codigo = fal_codigo;
			this.fal_descricao = fal_descricao;
		}
		
		public Vibracao_FalhaDTO (Vibracao_Falha entity) {
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
	
}
