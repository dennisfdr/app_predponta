package com.br.predponta.app.entities;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "servicos_site")
public class Servicos_Site implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long ssi_codigo;
	private String ssi_descricao;
	private String ssi_arquivo;
	private Long fal_codigo;
	private String fal_descricao;
	
	public Servicos_Site () {
			}

	public Servicos_Site(Long ssi_codigo, String ssi_descricao, String ssi_arquivo) {
		super();
		this.ssi_codigo = ssi_codigo;
		this.ssi_descricao = ssi_descricao;
		this.ssi_arquivo = ssi_arquivo;
		this.fal_codigo = fal_codigo;
		this.fal_descricao = fal_descricao;
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

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((ssi_codigo == null) ? 0 : ssi_codigo.hashCode());
		return result;
	}

	public static long getSerialversionussi_codigo() {
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
		Servicos_Site other = (Servicos_Site) obj;
		if (ssi_codigo == null) {
			if (other.ssi_codigo != null)
				return false;
		} else if (!ssi_codigo.equals(other.ssi_codigo))
			return false;
		return true;
	}
}
