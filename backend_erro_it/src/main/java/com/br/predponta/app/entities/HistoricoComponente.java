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
@Table(name = "historico_componente")
public class HistoricoComponente implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
		
    @Basic(optional = false)
    @Column(name = "hco_codigo")
    private long hcoCodigo;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 200)
    @Column(name = "hco_observacao")
    private String hcoObservacao;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 30)
    @Column(name = "hco_ordem_servico")
    private String hcoOrdemServico;

//### Relacionamentos ###
    
    @JoinColumn(name = "componente_com_codigo", referencedColumnName = "com_codigo")
    @ManyToOne(optional = false)
    private Componente componente;
    
//      
      
    public HistoricoComponente() {
    }
    
	public HistoricoComponente(@NotNull long hcoCodigo, @NotNull @Size(min = 1, max = 200) String hcoObservacao, @NotNull @Size(min = 1, max = 30) String hcoOrdemServico, Componente componente){
		super();
		
        this.hcoCodigo = hcoCodigo;
        this.hcoObservacao = hcoObservacao;
        this.hcoOrdemServico = hcoOrdemServico;

		this.componente = componente;		
	}
	
//Generate Getters and Setters;
	
	public long getHcoCodigo() {
		return hcoCodigo;
	}

	public void setHcoCodigo(long hcoCodigo) {
		this.hcoCodigo = hcoCodigo;
	}

	public String getHcoObservacao() {
		return hcoObservacao;
	}

	public void setHcoObservacao(String hcoObservacao) {
		this.hcoObservacao = hcoObservacao;
	}

	public String getHcoOrdemServico() {
		return hcoOrdemServico;
	}

	public void setHcoOrdemServico(String hcoOrdemServico) {
		this.hcoOrdemServico = hcoOrdemServico;
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
		result = prime * result + (int) (hcoCodigo ^ (hcoCodigo >>> 32));
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
		HistoricoComponente other = (HistoricoComponente) obj;
		if (hcoCodigo != other.hcoCodigo)
			return false;
		return true;
	}
	
}
