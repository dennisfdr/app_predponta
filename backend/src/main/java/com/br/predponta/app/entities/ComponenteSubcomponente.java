package com.br.predponta.app.entities;

import java.io.Serializable;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


@Entity
@Table(name = "componente_subcomponente")
public class ComponenteSubcomponente implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    
	@Basic(optional = false)
    @Column(name = "csc_codigo")
    private Integer cscCodigo;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 40)
    @Column(name = "csc_descricao")
    private String cscDescricao;
    
//### Relacionamentos ###
    
    @JoinColumn(name = "sub_componente_sco_codigo", referencedColumnName = "sco_codigo")
    @ManyToOne(optional = false)
    private SubComponente subComponente;
    
//      
      
    public ComponenteSubcomponente() {
    }
    
	public ComponenteSubcomponente(Integer cscCodigo, @NotNull @Size(min = 1, max = 40) String cscDescricao, SubComponente subComponente){
		super();

        this.cscCodigo = cscCodigo;
        this.cscDescricao = cscDescricao;

		this.subComponente = subComponente;		
	}

//Generate Getters and Setters;

	public Integer getCscCodigo() {
		return cscCodigo;
	}

	public void setCscCodigo(Integer cscCodigo) {
		this.cscCodigo = cscCodigo;
	}

	public String getCscDescricao() {
		return cscDescricao;
	}

	public void setCscDescricao(String cscDescricao) {
		this.cscDescricao = cscDescricao;
	}

	public SubComponente getSubComponente() {
		return subComponente;
	}

	public void setSubComponente(SubComponente subComponente) {
		this.subComponente = subComponente;
	}

//Generate hadsCode() and  equals()  somente do id;
		
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((cscCodigo == null) ? 0 : cscCodigo.hashCode());
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
		ComponenteSubcomponente other = (ComponenteSubcomponente) obj;
		if (cscCodigo == null) {
			if (other.cscCodigo != null)
				return false;
		} else if (!cscCodigo.equals(other.cscCodigo))
			return false;
		return true;
	}

}
