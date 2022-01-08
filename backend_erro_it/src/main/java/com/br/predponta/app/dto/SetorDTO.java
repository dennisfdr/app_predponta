package com.br.predponta.app.dto;

import java.io.Serializable;


import com.br.predponta.app.entities.Setor;



public class SetorDTO implements Serializable{
	private static final long serialVersionUID = 1L;


    private Integer setCodigo;
    private String setNome;
    private int setStatus;
    private Integer empresaempCodigo;
			
		public SetorDTO () {
			
		}

		public SetorDTO(Integer setCodigo, String setNome, int setStatus,Integer empresaempCodigo) {
	       
	        this.setCodigo = setCodigo;
	        this.setNome = setNome;
	        this.setStatus = setStatus;
			this.empresaempCodigo = empresaempCodigo;
		}
		
		public SetorDTO (Setor entity) {
								
			this.setCodigo = entity.getSetCodigo();
	        this.setNome = entity.getSetNome();
	        this.setStatus = entity.getSetStatus();
	        this.empresaempCodigo = entity.getEmpresa().getEmpCodigo();

		}
		
//Generate Getters and Setters;


		public Integer getSetCodigo() {
			return setCodigo;
		}

		public void setSetCodigo(Integer setCodigo) {
			this.setCodigo = setCodigo;
		}

		public String getSetNome() {
			return setNome;
		}

		public void setSetNome(String setNome) {
			this.setNome = setNome;
		}

		public int getSetStatus() {
			return setStatus;
		}

		public void setSetStatus(int setStatus) {
			this.setStatus = setStatus;
		}

		public static long getSerialversionuid() {
			return serialVersionUID;
		}
		
		public void setEmpresaempCodigo(Integer empresaempCodigo) {
			this.empresaempCodigo = empresaempCodigo;
		}

		public Integer getEmpresaempCodigo() {
			return empresaempCodigo;
		}

}
