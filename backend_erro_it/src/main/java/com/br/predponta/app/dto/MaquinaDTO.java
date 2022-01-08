package com.br.predponta.app.dto;

import java.io.Serializable;

import com.br.predponta.app.entities.Maquina;



public class MaquinaDTO implements Serializable{
	private static final long serialVersionUID = 1L;

    private Integer maqCodigo;
    private String maqNome;
    private int maqAndar;
    private int maqStatus;
    
    private Integer setorsetCodigo;
			
		public MaquinaDTO () {
			
		}

		public MaquinaDTO(Integer maqCodigo,String maqNome, int maqAndar, int maqStatus, Integer setorsetCodigo) {
	        this.maqCodigo = maqCodigo;
	        this.maqNome = maqNome;
	        this.maqAndar = maqAndar;
	        this.maqStatus = maqStatus;
			
			this.setorsetCodigo = setorsetCodigo;
		}
		
		public MaquinaDTO (Maquina entity) {

		    this.maqCodigo = entity.getMaqCodigo();
	        this.maqNome = entity.getMaqNome();
	        this.maqAndar = entity.getMaqAndar();
	        this.maqStatus = entity.getMaqStatus();

	        this.setorsetCodigo = entity.getSetor().getSetCodigo();

		}

//Generate Getters and Setters;
		
		public Integer getMaqCodigo() {
			return maqCodigo;
		}

		public void setMaqCodigo(Integer maqCodigo) {
			this.maqCodigo = maqCodigo;
		}

		public String getMaqNome() {
			return maqNome;
		}

		public void setMaqNome(String maqNome) {
			this.maqNome = maqNome;
		}

		public int getMaqAndar() {
			return maqAndar;
		}

		public void setMaqAndar(int maqAndar) {
			this.maqAndar = maqAndar;
		}

		public int getMaqStatus() {
			return maqStatus;
		}

		public void setMaqStatus(int maqStatus) {
			this.maqStatus = maqStatus;
		}

		public Integer getSetorsetCodigo() {
			return setorsetCodigo;
		}

		public void setSetorsetCodigo(Integer setorsetCodigo) {
			this.setorsetCodigo = setorsetCodigo;
		}

}
