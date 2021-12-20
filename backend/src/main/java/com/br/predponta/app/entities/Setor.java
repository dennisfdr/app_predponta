package com.br.predponta.app.entities;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


@Entity
@Table(name = "setor")
public class Setor implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
		
    @Basic(optional = false)
    @Column(name = "set_codigo")
    private Integer setCodigo;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 80)
    @Column(name = "set_nome")
    private String setNome;
    @Basic(optional = false)
    @NotNull
    @Column(name = "set_status")
    private int setStatus;
    
//### Relacionamentos ###
    
    @JoinColumn(name = "empresa_emp_codigo", referencedColumnName = "emp_codigo")
    @ManyToOne(optional = false)
    private Empresa empresa;   
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "setor")
    private List<Maquina> maquina;
        
//      
      
    public Setor() {
    }
    
	public Setor(Integer setCodigo, @NotNull @Size(min = 1, max = 80) String setNome, @NotNull int setStatus,Empresa empresa){
		super();
		
        this.setCodigo = setCodigo;
        this.setNome = setNome;
        this.setStatus = setStatus;
	
		this.empresa = empresa;		
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

	public Empresa getEmpresa() {
		return empresa;
	}

	public void setEmpresa(Empresa empresa) {
		this.empresa = empresa;
	}
	
//Generate hadsCode() and  equals()  somente do id;

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((setCodigo == null) ? 0 : setCodigo.hashCode());
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
		Setor other = (Setor) obj;
		if (setCodigo == null) {
			if (other.setCodigo != null)
				return false;
		} else if (!setCodigo.equals(other.setCodigo))
			return false;
		return true;
	}
	
}
