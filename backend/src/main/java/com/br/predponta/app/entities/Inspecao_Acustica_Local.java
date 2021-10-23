package com.br.predponta.app.entities;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "inspecao_acustica_local")
public class Inspecao_Acustica_Local implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long ial_codigo;
	private String ial_descricao;
	private Long ial_status;
	private String ial_fk_set_codigo;
	
	public Inspecao_Acustica_Local () {
			}

	public Inspecao_Acustica_Local(Long ial_codigo, String ial_descricao, Long ial_status, String ial_fk_set_codigo) {
		super();
		this.ial_codigo = ial_codigo;
		this.ial_descricao = ial_descricao;
		this.ial_status = ial_status;
		this.ial_fk_set_codigo = ial_fk_set_codigo;
	}

	public Long getIal_codigo() {
		return ial_codigo;
	}

	public void setIal_codigo(Long ial_codigo) {
		this.ial_codigo = ial_codigo;
	}

	public String getIal_descricao() {
		return ial_descricao;
	}

	public void setIal_descricao(String ial_descricao) {
		this.ial_descricao = ial_descricao;
	}
		
	public Long getIal_status() {
		return ial_status;
	}

	public void setIal_status(Long ial_status) {
		this.ial_status = ial_status;
	}

	public String getIal_fk_set_codigo() {
		return ial_fk_set_codigo;
	}

	public void setIal_fk_set_codigo(String ial_fk_set_codigo) {
		this.ial_fk_set_codigo = ial_fk_set_codigo;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((ial_codigo == null) ? 0 : ial_codigo.hashCode());
		return result;
	}

	public static long getSerialversionuial_codigo() {
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
		Inspecao_Acustica_Local other = (Inspecao_Acustica_Local) obj;
		if (ial_codigo == null) {
			if (other.ial_codigo != null)
				return false;
		} else if (!ial_codigo.equals(other.ial_codigo))
			return false;
		return true;
	}
}
