package com.br.predponta.app.entities;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "mca_status_relatorio")
public class Mca_Status_Relatorio implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long mcasr_codigo;
	private String mcasr_descricao;
	private String mcasr_cor;
	private Long fal_codigo;
	private String fal_descricao;
	
	
	public Mca_Status_Relatorio () {
			}

	public Mca_Status_Relatorio(Long mcasr_codigo, String mcasr_descricao, String mcasr_cor, Long fal_codigo, String fal_descricao) {
		super();
		this.mcasr_codigo = mcasr_codigo;
		this.mcasr_descricao = mcasr_descricao;
		this.mcasr_cor = mcasr_cor;
		this.fal_codigo = fal_codigo;
		this.fal_descricao = fal_descricao;
	}

	public Long getMcasr_codigo() {
		return mcasr_codigo;
	}

	public void setMcasr_codigo(Long mcasr_codigo) {
		this.mcasr_codigo = mcasr_codigo;
	}

	public String getMcasr_descricao() {
		return mcasr_descricao;
	}

	public void setMcasr_descricao(String mcasr_descricao) {
		this.mcasr_descricao = mcasr_descricao;
	}
	
	public String getMcasr_cor() {
		return mcasr_cor;
	}

	public void setMcasr_cor(String mcasr_cor) {
		this.mcasr_cor = mcasr_cor;
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
		result = prime * result + ((mcasr_codigo == null) ? 0 : mcasr_codigo.hashCode());
		return result;
	}

	public static long getSerialversionumcasr_codigo() {
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
		Mca_Status_Relatorio other = (Mca_Status_Relatorio) obj;
		if (mcasr_codigo == null) {
			if (other.mcasr_codigo != null)
				return false;
		} else if (!mcasr_codigo.equals(other.mcasr_codigo))
			return false;
		return true;
	}
}
