package com.br.predponta.app.entities;

import java.io.Serializable;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


@Entity
@Table(name = "empresa_email")
public class ExemploNewEntities implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
		
	@Basic(optional = false)
    @Column(name = "eme_codigo")
    private Integer emeCodigo;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 250)
    @Column(name = "eme_email")
    private String emeEmail;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 80)
    @Column(name = "eme_responsavel")
    private String emeResponsavel;
  
    public ExemploNewEntities(Integer emeCodigo) {
    
    this.emeCodigo = emeCodigo;
    }
    
	public ExemploNewEntities(Integer emeCodigo, @NotNull @Size(min = 1, max = 250) String emeEmail, @NotNull @Size(min = 1, max = 80) String emeResponsavel){
		super();
		
	    this.emeCodigo = emeCodigo;
        this.emeEmail = emeEmail;
        this.emeResponsavel = emeResponsavel;	
				
	}
	
//Generate Getters and Setters;

	public Integer getEmeCodigo() {
		return emeCodigo;
	}

	public void setEmeCodigo(Integer emeCodigo) {
		this.emeCodigo = emeCodigo;
	}

	public String getEmeEmail() {
		return emeEmail;
	}

	public void setEmeEmail(String emeEmail) {
		this.emeEmail = emeEmail;
	}

	public String getEmeResponsavel() {
		return emeResponsavel;
	}

	public void setEmeResponsavel(String emeResponsavel) {
		this.emeResponsavel = emeResponsavel;
	}
	
//Generate hadsCode() and  equals()  somente do id;

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((emeCodigo == null) ? 0 : emeCodigo.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ExemploNewEntities other = (ExemploNewEntities) obj;
		if (emeCodigo == null) {
			if (other.emeCodigo != null)
				return false;
		} else if (!emeCodigo.equals(other.emeCodigo))
			return false;
		return true;
	}

}
