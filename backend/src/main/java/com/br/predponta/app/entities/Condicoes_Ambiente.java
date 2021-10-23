package com.br.predponta.app.entities;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "condicoes_ambiente")
public class Condicoes_Ambiente implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long cam_codigo;
	private Long cam_fk_ite_codigo;
	private Long cam_temperatura;
	private Long cam_carga;
	private Long cam_ponto_termograma;
	private Long cam_emissividade;
	
	public Condicoes_Ambiente () {
			}

	public Condicoes_Ambiente(Long cam_codigo, Long cam_fk_ite_codigo, Long cam_temperatura, Long cam_carga, Long cam_ponto_termograma, Long cam_emissividade) {
		super();
		this.cam_codigo = cam_codigo;
		this.cam_fk_ite_codigo = cam_fk_ite_codigo;
		this.cam_temperatura = cam_temperatura;
		this.cam_carga = cam_carga;
		this.cam_ponto_termograma = cam_ponto_termograma;
		this.cam_emissividade = cam_emissividade;
		
		
	}

	public Long getCam_codigo() {
		return cam_codigo;
	}

	public void setCam_codigo(Long cam_codigo) {
		this.cam_codigo = cam_codigo;
	}

	public Long getCam_fk_ite_codigo() {
		return cam_fk_ite_codigo;
	}

	public void setCam_fk_ite_codigo(Long cam_fk_ite_codigo) {
		this.cam_fk_ite_codigo = cam_fk_ite_codigo;
	}
	
	public Long getCam_temperatura() {
		return cam_temperatura;
	}

	public void setCam_temperatura(Long cam_temperatura) {
		this.cam_temperatura = cam_temperatura;
	}

	public Long getCam_carga() {
		return cam_carga;
	}

	public void setCam_carga(Long cam_carga) {
		this.cam_carga = cam_carga;
	}

	public Long getCam_ponto_termograma() {
		return cam_ponto_termograma;
	}

	public void setCam_ponto_termograma(Long cam_ponto_termograma) {
		this.cam_ponto_termograma = cam_ponto_termograma;
	}

	public Long getCam_emissividade() {
		return cam_emissividade;
	}

	public void setCam_emissividade(Long cam_emissividade) {
		this.cam_emissividade = cam_emissividade;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((cam_codigo == null) ? 0 : cam_codigo.hashCode());
		return result;
	}

	public static long getSerialversionucam_codigo() {
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
		Condicoes_Ambiente other = (Condicoes_Ambiente) obj;
		if (cam_codigo == null) {
			if (other.cam_codigo != null)
				return false;
		} else if (!cam_codigo.equals(other.cam_codigo))
			return false;
		return true;
	}
}
