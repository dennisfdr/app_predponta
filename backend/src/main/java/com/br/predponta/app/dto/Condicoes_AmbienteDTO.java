package com.br.predponta.app.dto;

import java.io.Serializable;

import com.br.predponta.app.entities.Condicoes_Ambiente;

public class Condicoes_AmbienteDTO implements Serializable{
	private static final long serialVersionUID = 1L;

	private Long cam_codigo;
	private Long cam_fk_ite_codigo;
	private Long cam_temperatura;
	private Long cam_carga;
	private Long cam_ponto_termograma;
	private Long cam_emissividade;
		
		public Condicoes_AmbienteDTO () {
			
		}

		public Condicoes_AmbienteDTO(Long cam_codigo, Long cam_fk_ite_codigo, Long cam_temperatura, Long cam_carga, Long cam_ponto_termograma, Long cam_emissividade) {
			this.cam_codigo = cam_codigo;
			this.cam_fk_ite_codigo = cam_fk_ite_codigo;
			this.cam_temperatura = cam_temperatura;
			this.cam_carga = cam_carga;
			this.cam_ponto_termograma = cam_ponto_termograma;
			this.cam_emissividade = cam_emissividade;
		}
		
		public Condicoes_AmbienteDTO (Condicoes_Ambiente entity) {
			this.cam_codigo = entity.getCam_codigo();
			this.cam_fk_ite_codigo = entity.getCam_fk_ite_codigo();
			this.cam_temperatura = entity.getCam_temperatura();
			this.cam_carga = entity.getCam_carga();
			this.cam_ponto_termograma = entity.getCam_ponto_termograma();
			this.cam_emissividade = entity.getCam_emissividade();
			
			
			
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

		
		
}
