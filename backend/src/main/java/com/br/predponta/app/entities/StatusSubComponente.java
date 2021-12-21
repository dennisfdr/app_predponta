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
@Table(name = "status_sub_componente")
public class StatusSubComponente implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	
	@Basic(optional = false)
    @Column(name = "ssc_codigo")
    private Integer sscCodigo;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 30)
    @Column(name = "ssc_descricao")
    private String sscDescricao;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 7)
    @Column(name = "ssc_cor")
    private String sscCor;

//### Relacionamentos ###
    
    @JoinColumn(name = "componente_com_codigo", referencedColumnName = "com_codigo")
    @ManyToOne(optional = false)
    private Componente componente;
    
//      
      
    public StatusSubComponente() {
    }
    
	public StatusSubComponente(@NotNull Integer sscCodigo, @NotNull @Size(min = 1, max = 30) String sscDescricao, @NotNull @Size(min = 1, max = 7) String sscCor, Componente componente){
		super();
		
        this.sscCodigo = sscCodigo;
        this.sscDescricao = sscDescricao;
        this.sscCor = sscCor;

		this.componente = componente;		
	}
	
//Generate Getters and Setters;

	public Integer getSscCodigo() {
		return sscCodigo;
	}

	public void setSscCodigo(Integer sscCodigo) {
		this.sscCodigo = sscCodigo;
	}

	public String getSscDescricao() {
		return sscDescricao;
	}

	public void setSscDescricao(String sscDescricao) {
		this.sscDescricao = sscDescricao;
	}

	public String getSscCor() {
		return sscCor;
	}

	public void setSscCor(String sscCor) {
		this.sscCor = sscCor;
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
		result = prime * result + ((sscCodigo == null) ? 0 : sscCodigo.hashCode());
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
		StatusSubComponente other = (StatusSubComponente) obj;
		if (sscCodigo == null) {
			if (other.sscCodigo != null)
				return false;
		} else if (!sscCodigo.equals(other.sscCodigo))
			return false;
		return true;
	}

}
