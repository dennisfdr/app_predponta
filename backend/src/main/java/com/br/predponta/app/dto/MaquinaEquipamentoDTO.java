package com.br.predponta.app.dto;

import java.io.Serializable;

import com.br.predponta.app.entities.MaquinaEquipamento;



public class MaquinaEquipamentoDTO implements Serializable{
	private static final long serialVersionUID = 1L;

    private Integer maeCodigo;
    private String maeNome;
    private String maeTag;
    private int maeStatus;
    
    private Integer maquinamaqCodigo;
			
		public MaquinaEquipamentoDTO () {
			
		}

		public MaquinaEquipamentoDTO(Integer maeCodigo, String maeNome, String maeTag, int maeStatus, Integer maquinamaqCodigo) {
			
			this.maeCodigo = maeCodigo;
	        this.maeNome = maeNome;
	        this.maeTag = maeTag;
	        this.maeStatus = maeStatus;
			
	        this.maquinamaqCodigo = maquinamaqCodigo;
		}

//Generate Getters and Setters;

		public MaquinaEquipamentoDTO (MaquinaEquipamento entity) {

		    this.maeCodigo = entity.getMaeCodigo();
	        this.maeNome = entity.getMaeNome();
	        this.maeTag = entity.getMaeTag();
	        this.maeStatus = entity.getMaeStatus();

	        this.maquinamaqCodigo = entity.getMaquina().getMaqCodigo();

		}

		public Integer getMaeCodigo() {
			return maeCodigo;
		}

		public void setMaeCodigo(Integer maeCodigo) {
			this.maeCodigo = maeCodigo;
		}

		public String getMaeNome() {
			return maeNome;
		}

		public void setMaeNome(String maeNome) {
			this.maeNome = maeNome;
		}

		public String getMaeTag() {
			return maeTag;
		}

		public void setMaeTag(String maeTag) {
			this.maeTag = maeTag;
		}

		public int getMaeStatus() {
			return maeStatus;
		}

		public void setMaeStatus(int maeStatus) {
			this.maeStatus = maeStatus;
		}

		public Integer getMaquinamaqCodigo() {
			return maquinamaqCodigo;
		}

		public void setMaquinamaqCodigo(Integer maquinamaqCodigo) {
			this.maquinamaqCodigo = maquinamaqCodigo;
		}

}
