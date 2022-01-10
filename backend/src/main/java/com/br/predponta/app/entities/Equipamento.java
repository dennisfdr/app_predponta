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
import javax.validation.constraints.Size;


@Entity
@Table(name = "equipamento")
public class Equipamento implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
		
    @Basic(optional = false)
    @Column(name = "equ_codigo")
	private Long equCodigo;
	
    @Basic(optional = false)
    @Size(min = 1, max = 80)
    @Column(name = "equ_descricao")
    private String equDescricao;
    
    @Basic(optional = false)
    @Size(min = 1, max = 200)
    @Column(name = "equ_arquivo_html")
    private String equArquivoHtml;
    
    @Basic(optional = false)
    @Column(name = "equ_ri")
    private Integer equRi;
    
    @Basic(optional = false)
    @Column(name = "equ_it")
    private Integer equIt;
    
    @Basic(optional = false)
    @Size(min = 1, max = 120)
    @Column(name = "equ_laboratorio")
    private String equLaboratorio;
    
    @Basic(optional = false)
    @Size(min = 1, max = 45)
    @Column(name = "equ_numero_certificado")
    private String equNumeroCertificado;
        
    @Basic(optional = false)
    @NotNull
    @Column(name = "equ_data_calibracao")
    @Temporal(TemporalType.DATE)
    private Date equDataCalibracao;
    
    @Basic(optional = false)
    @NotNull
    @Column(name = "equ_proxima_calibracao")
    @Temporal(TemporalType.DATE)
    private Date equProximaCalibracao;
    
//### Relacionamentos ###
    
    @JoinColumn(name = "medicao_med_codigo", referencedColumnName = "med_codigo")
    @ManyToOne(optional = false)
    private Medicao medicao;   
    
//      
      
    public Equipamento() {
    }
    
	public Equipamento(Long equCodigo, @Size(min = 1, max = 80) String equDescricao, @Size(min = 1, max = 200) 
	String equArquivoHtml, Integer equRi, Integer equIt, @Size(min = 1, max = 120) String equLaboratorio, 
	@Size(min = 1, max = 45) String equNumeroCertificado, @NotNull Date equDataCalibracao, @NotNull 
	Date equProximaCalibracao, Medicao medicao){
		super();
		
		this.equCodigo = equCodigo;
		this.equDescricao = equDescricao;
		this.equArquivoHtml = equArquivoHtml;
		this.equRi = equRi;
		this.equIt = equIt;
		this.equLaboratorio = equLaboratorio;
		this.equNumeroCertificado = equNumeroCertificado;
		this.equDataCalibracao = equDataCalibracao;
		this.equProximaCalibracao = equProximaCalibracao;
		this.medicao = medicao;		
	}
	
//Generate Getters and Setters;

	public Long getEquCodigo() {
		return equCodigo;
	}

	public void setEquCodigo(Long equCodigo) {
		this.equCodigo = equCodigo;
	}

	public String getEquDescricao() {
		return equDescricao;
	}

	public void setEquDescricao(String equDescricao) {
		this.equDescricao = equDescricao;
	}

	public String getEquArquivoHtml() {
		return equArquivoHtml;
	}

	public void setEquArquivoHtml(String equArquivoHtml) {
		this.equArquivoHtml = equArquivoHtml;
	}

	public Integer getEquRi() {
		return equRi;
	}

	public void setEquRi(Integer equRi) {
		this.equRi = equRi;
	}

	public Integer getEquIt() {
		return equIt;
	}

	public void setEquIt(Integer equIt) {
		this.equIt = equIt;
	}

	public String getEquLaboratorio() {
		return equLaboratorio;
	}

	public void setEquLaboratorio(String equLaboratorio) {
		this.equLaboratorio = equLaboratorio;
	}

	public String getEquNumeroCertificado() {
		return equNumeroCertificado;
	}

	public void setEquNumeroCertificado(String equNumeroCertificado) {
		this.equNumeroCertificado = equNumeroCertificado;
	}

	public Date getEquDataCalibracao() {
		return equDataCalibracao;
	}

	public void setEquDataCalibracao(Date equDataCalibracao) {
		this.equDataCalibracao = equDataCalibracao;
	}

	public Date getEquProximaCalibracao() {
		return equProximaCalibracao;
	}

	public void setEquProximaCalibracao(Date equProximaCalibracao) {
		this.equProximaCalibracao = equProximaCalibracao;
	}

	public Medicao getMedicao() {
		return medicao;
	}

	public void setMedicao(Medicao medicao) {
		this.medicao = medicao;
	}

//Generate hadsCode() and  equals()  somente do id;

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((equCodigo == null) ? 0 : equCodigo.hashCode());
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
		Equipamento other = (Equipamento) obj;
		if (equCodigo == null) {
			if (other.equCodigo != null)
				return false;
		} else if (!equCodigo.equals(other.equCodigo))
			return false;
		return true;
	}

}
