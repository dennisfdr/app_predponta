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
@Table(name = "componente_peca")
public class ComponentePeca implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	
    @Basic(optional = false)
    @Column(name = "cop_codigo")
    private Integer copCodigo;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "cop_descricao")
    private String copDescricao;
    @Basic(optional = false)
    @NotNull
    @Column(name = "cop_status")
    private int copStatus;

//### Relacionamentos ###
    
    @JoinColumn(name = "componente_com_codigo", referencedColumnName = "com_codigo")
    @ManyToOne(optional = false)
    private Componente componente;
    
//      
      
    public ComponentePeca() {
    }
    
	public ComponentePeca(Integer copCodigo, @NotNull @Size(min = 1, max = 50) String copDescricao, @NotNull int copStatus, Componente componente){
		super();
		
        this.copCodigo = copCodigo;
        this.copDescricao = copDescricao;
        this.copStatus = copStatus;	

		this.componente = componente;		
	}

//Generate Getters and Setters;
		
	public Integer getCopCodigo() {
		return copCodigo;
	}

	public void setCopCodigo(Integer copCodigo) {
		this.copCodigo = copCodigo;
	}

	public String getCopDescricao() {
		return copDescricao;
	}

	public void setCopDescricao(String copDescricao) {
		this.copDescricao = copDescricao;
	}

	public int getCopStatus() {
		return copStatus;
	}

	public void setCopStatus(int copStatus) {
		this.copStatus = copStatus;
	}

	public Componente getComponente() {
		return componente;
	}

	public void setComponente(Componente componente) {
		this.componente = componente;
	}

//Generate hadsCode() and  equals()  somente do id;

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((copCodigo == null) ? 0 : copCodigo.hashCode());
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
		ComponentePeca other = (ComponentePeca) obj;
		if (copCodigo == null) {
			if (other.copCodigo != null)
				return false;
		} else if (!copCodigo.equals(other.copCodigo))
			return false;
		return true;
	}

}
