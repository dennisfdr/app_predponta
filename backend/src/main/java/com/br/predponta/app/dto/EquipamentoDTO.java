package com.br.predponta.app.dto;

import java.io.Serializable;
import java.util.Date;

import com.br.predponta.app.entities.Equipamento;




public class EquipamentoDTO implements Serializable{
	private static final long serialVersionUID = 1L;

	private Long equCodigo;
    private String equDescricao;
    private String equArquivoHtml;
    private Integer equRi;
    private Integer equIt;
    private String equLaboratorio;
    private String equNumeroCertificado;
    private Date equDataCalibracao;
    private Date equProximaCalibracao;
   
    private Integer medicaomedCodigo;  
    
			
		public EquipamentoDTO () {
			
		}

		public EquipamentoDTO(Long equCodigo, String equDescricao, String equArquivoHtml, Integer equRi, Integer equIt, String equLaboratorio, String equNumeroCertificado, Date equDataCalibracao, Date equProximaCalibracao, Integer medicaomedCodigo) {
	       
			this.equCodigo = equCodigo;
			this.equDescricao = equDescricao;
		    this.equArquivoHtml = equArquivoHtml;
		    this.equRi = equRi;
		    this.equIt = equIt;
		    this.equLaboratorio = equLaboratorio;
		    this.equNumeroCertificado = equNumeroCertificado;
		    this.equDataCalibracao = equDataCalibracao;
		    this.equProximaCalibracao = equProximaCalibracao;
				
			this.medicaomedCodigo = medicaomedCodigo;
		}
		
		public EquipamentoDTO (Equipamento entity) {
								
			this.equCodigo = entity.getEquCodigo();
			this.equDescricao = entity.getEquDescricao();
		    this.equArquivoHtml = entity.getEquArquivoHtml();
		    this.equRi = entity.getEquRi();
		    this.equIt = entity.getEquIt();
		    this.equLaboratorio = entity.getEquLaboratorio();
		    this.equNumeroCertificado = entity.getEquNumeroCertificado();
		    this.equDataCalibracao = entity.getEquDataCalibracao();
		    this.equProximaCalibracao = entity.getEquProximaCalibracao();

	        this.medicaomedCodigo = entity.getMedicao().getMedCodigo();

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

		public Integer getMedicaomedCodigo() {
			return medicaomedCodigo;
		}

		public void setMedicaomedCodigo(Integer medicaomedCodigo) {
			this.medicaomedCodigo = medicaomedCodigo;
		}
	
}
