package com.br.predponta.app.entities;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;


@Entity
@Table(name = "medicao")
public class Medicao implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	
    @Basic(optional = false)
    @Column(name = "med_codigo")
    private Integer medCodigo;
    @Basic(optional = false)
    @NotNull
    @Column(name = "med_data")
    @Temporal(TemporalType.DATE)
    private Date medData;  
    
  //### Relacionamentos ###

    @JoinColumn(name = "componente_com_codigo", referencedColumnName = "com_codigo")
    @ManyToOne(optional = false)
    private Componente componente;
 
//      
      
    public Medicao() {
    }
    
	public Medicao(Integer medCodigo, @NotNull Date medData, Componente componente){
		super();
		
        this.medCodigo = medCodigo;
        this.medData = medData;
        
		this.componente = componente;
	
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

	public Componente getComponente() {
		return componente;
	}

	public void setComponente(Componente componente) {
		this.componente = componente;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((medCodigo == null) ? 0 : medCodigo.hashCode());
		return result;
	}

//Generate hadsCode() and  equals()  somente do id;

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Medicao other = (Medicao) obj;
		if (medCodigo == null) {
			if (other.medCodigo != null)
				return false;
		} else if (!medCodigo.equals(other.medCodigo))
			return false;
		return true;
	}

}
