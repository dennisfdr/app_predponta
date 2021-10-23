package com.br.predponta.app.entities;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "categoria")
public class Categoria implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long cat_codigo;
	private String cat_descricao;
	
	public Categoria () {
			}

	public Categoria(Long cat_codigo, String cat_descricao) {
		super();
		this.cat_codigo = cat_codigo;
		this.cat_descricao = cat_descricao;
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

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((cat_codigo == null) ? 0 : cat_codigo.hashCode());
		return result;
	}

	public static long getSerialversionucat_codigo() {
		return serialVersionUID;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Categoria other = (Categoria) obj;
		if (cat_codigo == null) {
			if (other.cat_codigo != null)
				return false;
		} else if (!cat_codigo.equals(other.cat_codigo))
			return false;
		return true;
	}
}
