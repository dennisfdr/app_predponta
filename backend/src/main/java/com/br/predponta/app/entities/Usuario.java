package com.br.predponta.app.entities;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "usuario")
public class Usuario implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long usu_codigo;
	private String usu_nome;
	private String usu_login;
	private String usu_senha;
	private String usu_fk_emp_codigo;
	private String usu_status;
	private String usu_assinatura;
	private Long fal_codigo;
	private String fal_descricao;
	
	
	
	public Usuario () {
			}

	public Usuario(Long usu_codigo, String usu_nome, String usu_login, String usu_senha, String usu_fk_emp_codigo, String usu_status, String usu_assinatura, Long fal_codigo, String fal_descricao) {
		super();
		this.usu_codigo = usu_codigo;
		this.usu_nome = usu_nome;
		this.usu_login = usu_login;
		this.usu_senha = usu_senha;
		this.usu_fk_emp_codigo = usu_fk_emp_codigo;
		this.usu_status = usu_status;
		this.usu_assinatura = usu_assinatura;
		this.fal_codigo = fal_codigo;
		this.fal_descricao = fal_descricao;
	}

	public Long getUsu_codigo() {
		return usu_codigo;
	}

	public void setUsu_codigo(Long usu_codigo) {
		this.usu_codigo = usu_codigo;
	}

	public String getUsu_nome() {
		return usu_nome;
	}

	public void setUsu_nome(String usu_nome) {
		this.usu_nome = usu_nome;
	}
	
	public String getUsu_login() {
		return usu_login;
	}

	public void setUsu_login(String usu_login) {
		this.usu_login = usu_login;
	}

	public String getUsu_senha() {
		return usu_senha;
	}

	public void setUsu_senha(String usu_senha) {
		this.usu_senha = usu_senha;
	}

	public String getUsu_fk_emp_codigo() {
		return usu_fk_emp_codigo;
	}

	public void setUsu_fk_emp_codigo(String usu_fk_emp_codigo) {
		this.usu_fk_emp_codigo = usu_fk_emp_codigo;
	}

	public String getUsu_status() {
		return usu_status;
	}

	public void setUsu_status(String usu_status) {
		this.usu_status = usu_status;
	}

	public String getUsu_assinatura() {
		return usu_assinatura;
	}

	public void setUsu_assinatura(String usu_assinatura) {
		this.usu_assinatura = usu_assinatura;
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
		result = prime * result + ((usu_codigo == null) ? 0 : usu_codigo.hashCode());
		return result;
	}

	public static long getSerialversionuusu_codigo() {
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
		Usuario other = (Usuario) obj;
		if (usu_codigo == null) {
			if (other.usu_codigo != null)
				return false;
		} else if (!usu_codigo.equals(other.usu_codigo))
			return false;
		return true;
	}
}
