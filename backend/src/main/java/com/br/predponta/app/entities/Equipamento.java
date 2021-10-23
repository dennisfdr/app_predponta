package com.br.predponta.app.entities;

import java.io.Serializable;
import java.util.Date;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "equipamento")
public class Equipamento implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long equ_codigo;
	private String equ_descricao;
	private String equ_arquivo_html;
	private Long equ_ri;
	private Long equ_it;
	private String equ_laboratorio;
	private String equ_numero_certificado;
	private Date equ_data_calibracao;
	private Date equ_proxima_calibracao;
		
	
	public Equipamento () {
			}

	public Equipamento(Long equ_codigo, String equ_descricao, String equ_arquivo_html, Long equ_ri, Long equ_it, String equ_laboratorio, String equ_numero_certificado, Date equ_data_calibracao, Date equ_proxima_calibracao) {
		super();
		this.equ_codigo = equ_codigo;
		this.equ_descricao = equ_descricao;
		this.equ_arquivo_html = equ_arquivo_html;
		this.equ_ri = equ_ri;
		this.equ_it = equ_it;
		this.equ_laboratorio = equ_laboratorio;
		this.equ_numero_certificado = equ_numero_certificado;
		this.equ_data_calibracao = equ_data_calibracao;
		this.equ_proxima_calibracao = equ_proxima_calibracao;
	}

	public Long getEqu_codigo() {
		return equ_codigo;
	}

	public void setEqu_codigo(Long equ_codigo) {
		this.equ_codigo = equ_codigo;
	}

	public String getEqu_descricao() {
		return equ_descricao;
	}

	public void setEqu_descricao(String equ_descricao) {
		this.equ_descricao = equ_descricao;
	}
	
	public String getEqu_arquivo_html() {
		return equ_arquivo_html;
	}

	public void setEqu_arquivo_html(String equ_arquivo_html) {
		this.equ_arquivo_html = equ_arquivo_html;
	}

	public Long getEqu_ri() {
		return equ_ri;
	}

	public void setEqu_ri(Long equ_ri) {
		this.equ_ri = equ_ri;
	}

	public Long getEqu_it() {
		return equ_it;
	}

	public void setEqu_it(Long equ_it) {
		this.equ_it = equ_it;
	}

	public String getEqu_laboratorio() {
		return equ_laboratorio;
	}

	public void setEqu_laboratorio(String equ_laboratorio) {
		this.equ_laboratorio = equ_laboratorio;
	}

	public String getEqu_numero_certificado() {
		return equ_numero_certificado;
	}

	public void setEqu_numero_certificado(String equ_numero_certificado) {
		this.equ_numero_certificado = equ_numero_certificado;
	}

	public Date getEqu_data_calibracao() {
		return equ_data_calibracao;
	}

	public void setEqu_data_calibracao(Date equ_data_calibracao) {
		this.equ_data_calibracao = equ_data_calibracao;
	}

	public Date getEqu_proxima_calibracao() {
		return equ_proxima_calibracao;
	}

	public void setEqu_proxima_calibracao(Date equ_proxima_calibracao) {
		this.equ_proxima_calibracao = equ_proxima_calibracao;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((equ_codigo == null) ? 0 : equ_codigo.hashCode());
		return result;
	}

	public static long getSerialversionuequ_codigo() {
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
		Equipamento other = (Equipamento) obj;
		if (equ_codigo == null) {
			if (other.equ_codigo != null)
				return false;
		} else if (!equ_codigo.equals(other.equ_codigo))
			return false;
		return true;
	}
}
