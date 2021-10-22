package com.br.predponta.app.entities;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "vibracao_falha")
public class Vibracao_Falha implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long fal_codigo;
	private String fal_descricao;
	
	public Vibracao_Falha () {
			}

	public Vibracao_Falha(Long fal_codigo, String fal_descricao) {
		super();
		this.fal_codigo = fal_codigo;
		this.fal_descricao = fal_descricao;
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

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((fal_codigo == null) ? 0 : fal_codigo.hashCode());
		return result;
	}

	public static long getSerialversionufal_codigo() {
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
		Vibracao_Falha other = (Vibracao_Falha) obj;
		if (fal_codigo == null) {
			if (other.fal_codigo != null)
				return false;
		} else if (!fal_codigo.equals(other.fal_codigo))
			return false;
		return true;
	}
}
