package com.br.predponta.app.entities;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "mca_status")
public class Mca_Status implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long mcas_codigo;
	private String mcas_descricao;
	private String mcas_cor;

	
	
	public Mca_Status () {
			}

	public Mca_Status(Long mcas_codigo, String mcas_descricao, String mcas_cor) {
		super();
		this.mcas_codigo = mcas_codigo;
		this.mcas_descricao = mcas_descricao;
		this.mcas_cor = mcas_cor;

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

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((mcas_codigo == null) ? 0 : mcas_codigo.hashCode());
		return result;
	}

	public static long getSerialversionumcas_codigo() {
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
		Mca_Status other = (Mca_Status) obj;
		if (mcas_codigo == null) {
			if (other.mcas_codigo != null)
				return false;
		} else if (!mcas_codigo.equals(other.mcas_codigo))
			return false;
		return true;
	}
}
