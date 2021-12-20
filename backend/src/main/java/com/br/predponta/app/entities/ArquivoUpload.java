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
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


@Entity
@Table(name = "arquivo_upload")
public class ArquivoUpload implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
		
    @Basic(optional = false)
    @Column(name = "aru_codigo")
    private Integer aruCodigo;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 80)
    @Column(name = "aru_descricao")
    private String aruDescricao;
    @Basic(optional = false)
    @NotNull
    @Lob
    @Column(name = "aru_arquivo")
    private byte[] aruArquivo;
    @Basic(optional = false)
    @NotNull
    @Lob
    @Size(min = 1, max = 65535)
    @Column(name = "aru_nome_original_arquivo")
    private String aruNomeOriginalArquivo;
    @Basic(optional = false)
    @NotNull
    @Column(name = "aru_data")
    @Temporal(TemporalType.DATE)
    private Date aruData;
    
//### Relacionamentos ###
    
    @JoinColumn(name = "empresa_emp_codigo", referencedColumnName = "emp_codigo")
    @ManyToOne(optional = false)
    private Empresa empresa;   
    
//      
      
    public ArquivoUpload() {
    }
    
	public ArquivoUpload(Integer aruCodigo, Empresa empresa, @NotNull @Size(min = 1, max = 80) String aruDescricao, @NotNull byte[] aruArquivo, @NotNull @Size(min = 1, max = 65535) String aruNomeOriginalArquivo, @NotNull Date aruData){
		super();
		
        this.aruCodigo = aruCodigo;
        this.aruDescricao = aruDescricao;
        this.aruArquivo = aruArquivo;
        this.aruNomeOriginalArquivo = aruNomeOriginalArquivo;
        this.aruData = aruData;
	
		this.empresa = empresa;		
	}
	
//Generate Getters and Setters;

	public Integer getAruCodigo() {
		return aruCodigo;
	}

	public void setAruCodigo(Integer aruCodigo) {
		this.aruCodigo = aruCodigo;
	}

	public String getAruDescricao() {
		return aruDescricao;
	}

	public void setAruDescricao(String aruDescricao) {
		this.aruDescricao = aruDescricao;
	}

	public byte[] getAruArquivo() {
		return aruArquivo;
	}

	public void setAruArquivo(byte[] aruArquivo) {
		this.aruArquivo = aruArquivo;
	}

	public String getAruNomeOriginalArquivo() {
		return aruNomeOriginalArquivo;
	}

	public void setAruNomeOriginalArquivo(String aruNomeOriginalArquivo) {
		this.aruNomeOriginalArquivo = aruNomeOriginalArquivo;
	}

	public Date getAruData() {
		return aruData;
	}

	public void setAruData(Date aruData) {
		this.aruData = aruData;
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
		result = prime * result + ((aruCodigo == null) ? 0 : aruCodigo.hashCode());
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
		ArquivoUpload other = (ArquivoUpload) obj;
		if (aruCodigo == null) {
			if (other.aruCodigo != null)
				return false;
		} else if (!aruCodigo.equals(other.aruCodigo))
			return false;
		return true;
	}

}
