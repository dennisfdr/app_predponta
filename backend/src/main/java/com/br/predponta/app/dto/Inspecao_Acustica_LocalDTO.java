package com.br.predponta.app.dto;

import java.io.Serializable;

import com.br.predponta.app.entities.Inspecao_Acustica_Local;

public class Inspecao_Acustica_LocalDTO implements Serializable{
	private static final long serialVersionUID = 1L;

	private Long ial_codigo;
	private String ial_descricao;
	private Long ial_status;
	private Long ial_fk_set_codigo;
		
		public Inspecao_Acustica_LocalDTO () {
			
		}

		public Inspecao_Acustica_LocalDTO(Long ial_codigo, String ial_descricao, Long ial_status, Long ial_fk_set_codigo) {
			this.ial_codigo = ial_codigo;
			this.ial_descricao = ial_descricao;
			this.ial_status = ial_status;
			this.ial_fk_set_codigo = ial_fk_set_codigo;
		}
		
		public Inspecao_Acustica_LocalDTO (Inspecao_Acustica_Local entity) {
			this.ial_codigo = entity.getIal_codigo();
			this.ial_descricao = entity.getIal_descricao();
			this.ial_status = entity.getIal_status();
			this.ial_fk_set_codigo = entity.getIal_fk_set_codigo();
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

		public Long getIal_fk_set_codigo() {
			return ial_fk_set_codigo;
		}

		public void setIal_fk_set_codigo(Long ial_fk_set_codigo) {
			this.ial_fk_set_codigo = ial_fk_set_codigo;
		}
	
		
}
