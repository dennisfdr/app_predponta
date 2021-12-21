package com.br.predponta.app.dto;

import java.io.Serializable;
import java.util.Date;

import com.br.predponta.app.entities.Medicao;



public class MedicaoDTO implements Serializable{
	private static final long serialVersionUID = 1L;


    private Integer medCodigo;
    private Date medData;  
    
    private Integer componente;
			
		public MedicaoDTO () {
			
		}

		public MedicaoDTO(Integer medCodigo, Date medData, Integer componente) {

	    this.medCodigo = medCodigo;
	    this.medData = medData;	
	    
		this.componente = componente;
		
		}
		
		public MedicaoDTO (Medicao entity) {
     
		    this.medCodigo = entity.getMedCodigo();
		    this.medData = entity.getMedData();
	        
			this.componente = entity.getComponente().getComCodigo();

		}

//Generate Getters and Setters;
		
		public Integer getMedCodigo() {
			return medCodigo;
		}

		public void setMedCodigo(Integer medCodigo) {
			this.medCodigo = medCodigo;
		}

		public Date getMedData() {
			return medData;
		}

		public void setMedData(Date medData) {
			this.medData = medData;
		}

		public Integer getComponente() {
			return componente;
		}

		public void setComponente(Integer componente) {
			this.componente = componente;
		}
}
