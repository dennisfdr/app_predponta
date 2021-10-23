package com.br.predponta.app.dto;

import java.io.Serializable;

import com.br.predponta.app.entities.Categoria;

public class CategoriaDTO implements Serializable{
	private static final long serialVersionUID = 1L;

	private Long cat_codigo;
	private String cat_descricao;
		
		public CategoriaDTO () {
			
		}

		public CategoriaDTO(Long cat_codigo, String cat_descricao) {
			this.cat_codigo = cat_codigo;
			this.cat_descricao = cat_descricao;
		}
		
		public CategoriaDTO (Categoria entity) {
			this.cat_codigo = entity.getCat_codigo();
			this.cat_descricao = entity.getCat_descricao();
		}

		public Long getCat_codigo() {
			return cat_codigo;
		}

		public void setCat_codigo(Long cat_codigo) {
			this.cat_codigo = cat_codigo;
		}

		public String getCat_descricao() {
			return cat_descricao;
		}

		public void setCat_descricao(String cat_descricao) {
			this.cat_descricao = cat_descricao;
		}
	
}
