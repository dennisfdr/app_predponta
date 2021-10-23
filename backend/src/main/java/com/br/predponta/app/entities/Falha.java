package com.br.predponta.app.entities;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "falha")
public class Falha implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long fal_codigo;
	private String fal_descricao;
	private Long hco_fk_ssc_codigo;
	private Long hco_codigo;
	private Long hco_fk_ite_codigo; 
	private Long hco_fk_med_codigo;
	private Long hco_fk_sco_codigo;
	private Long hco_observacao;
	private Long hco_ordem_servico;
	
	public Falha () {
			}

	public Falha(Long fal_codigo, String fal_descricao, Long hco_fk_ssc_codigo, Long hco_codigo, Long hco_fk_ite_codigo, Long hco_fk_med_codigo, Long hco_fk_sco_codigo, Long hco_observacao, Long hco_ordem_servico) {
		super();
		this.fal_codigo = fal_codigo;
		this.fal_descricao = fal_descricao;
		this.hco_fk_ssc_codigo = hco_fk_ssc_codigo;
		this.hco_codigo = hco_codigo;
		this.hco_fk_ite_codigo = hco_fk_ite_codigo; 
		this.hco_fk_med_codigo = hco_fk_med_codigo;
		this.hco_fk_sco_codigo = hco_fk_sco_codigo;
		this.hco_observacao = hco_observacao;
		this.hco_ordem_servico = hco_ordem_servico;
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
	
	public Long getHco_fk_ssc_codigo() {
		return hco_fk_ssc_codigo;
	}

	public void setHco_fk_ssc_codigo(Long hco_fk_ssc_codigo) {
		this.hco_fk_ssc_codigo = hco_fk_ssc_codigo;
	}

	public Long getHco_codigo() {
		return hco_codigo;
	}

	public void setHco_codigo(Long hco_codigo) {
		this.hco_codigo = hco_codigo;
	}

	public Long getHco_fk_ite_codigo() {
		return hco_fk_ite_codigo;
	}

	public void setHco_fk_ite_codigo(Long hco_fk_ite_codigo) {
		this.hco_fk_ite_codigo = hco_fk_ite_codigo;
	}

	public Long getHco_fk_med_codigo() {
		return hco_fk_med_codigo;
	}

	public void setHco_fk_med_codigo(Long hco_fk_med_codigo) {
		this.hco_fk_med_codigo = hco_fk_med_codigo;
	}

	public Long getHco_fk_sco_codigo() {
		return hco_fk_sco_codigo;
	}

	public void setHco_fk_sco_codigo(Long hco_fk_sco_codigo) {
		this.hco_fk_sco_codigo = hco_fk_sco_codigo;
	}

	public Long getHco_observacao() {
		return hco_observacao;
	}

	public void setHco_observacao(Long hco_observacao) {
		this.hco_observacao = hco_observacao;
	}

	public Long getHco_ordem_servico() {
		return hco_ordem_servico;
	}

	public void setHco_ordem_servico(Long hco_ordem_servico) {
		this.hco_ordem_servico = hco_ordem_servico;
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
		Falha other = (Falha) obj;
		if (fal_codigo == null) {
			if (other.fal_codigo != null)
				return false;
		} else if (!fal_codigo.equals(other.fal_codigo))
			return false;
		return true;
	}
}
