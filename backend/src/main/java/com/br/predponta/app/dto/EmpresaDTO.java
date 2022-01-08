package com.br.predponta.app.dto;

import java.io.Serializable;
import java.util.Date;


import com.br.predponta.app.entities.Empresa;



public class EmpresaDTO implements Serializable{
	private static final long serialVersionUID = 1L;

	
    private Integer empCodigo;
    private String empNome;
    private int empStatus;
    private String empLogo;
    private int empPeriodicidadeIt;
    private int empPeriodicidadeRi;
    private int empPeriodicidadeMca;
    private Date empProxMedicaoIt;
    private Date empProxMedicaoRi;
    private Date empProxMedicaoMca;
    private Date createdAt;
	
			
		public EmpresaDTO () {
			
		}

		public EmpresaDTO(Integer empCodigo, String empNome, int empStatus, String empLogo, int empPeriodicidadeIt, int empPeriodicidadeRi, int empPeriodicidadeMca, Date empProxMedicaoIt, Date empProxMedicaoRi, Date empProxMedicaoMca) {
			
						
			this.empCodigo = empCodigo;
			this.empNome = empNome;
			this.empStatus = empStatus;
			this.empLogo = empLogo;
			this.empPeriodicidadeIt = empPeriodicidadeIt;
			this.empPeriodicidadeRi = empPeriodicidadeRi;
			this.empPeriodicidadeMca = empPeriodicidadeMca;
			this.empProxMedicaoIt = empProxMedicaoIt;
			this.empProxMedicaoRi = empProxMedicaoRi;
			this.empProxMedicaoMca = empProxMedicaoMca;
			
			
					
			
		}
		
		public EmpresaDTO (Empresa entity) {
						
			this.empCodigo = entity.getEmpCodigo();
			this.empNome = entity.getEmpNome();
			this.empStatus = entity.getEmpStatus();
			this.empLogo = entity.getEmpLogo();
			this.empPeriodicidadeIt = entity.getEmpPeriodicidadeIt();
			this.empPeriodicidadeRi = entity.getEmpPeriodicidadeRi();
			this.empPeriodicidadeMca = entity.getEmpPeriodicidadeMca();
			this.empProxMedicaoIt = entity.getEmpProxMedicaoIt();
			this.empProxMedicaoRi = entity.getEmpProxMedicaoRi();
			this.empProxMedicaoMca = entity.getEmpProxMedicaoMca();
					
		}

		public Integer getEmpCodigo() {
			return empCodigo;
		}

		public void setEmpCodigo(Integer empCodigo) {
			this.empCodigo = empCodigo;
		}

		public String getEmpNome() {
			return empNome;
		}

		public void setEmpNome(String empNome) {
			this.empNome = empNome;
		}

		public int getEmpStatus() {
			return empStatus;
		}

		public void setEmpStatus(int empStatus) {
			this.empStatus = empStatus;
		}

		public String getEmpLogo() {
			return empLogo;
		}

		public void setEmpLogo(String empLogo) {
			this.empLogo = empLogo;
		}

		public int getEmpPeriodicidadeIt() {
			return empPeriodicidadeIt;
		}

		public void setEmpPeriodicidadeIt(int empPeriodicidadeIt) {
			this.empPeriodicidadeIt = empPeriodicidadeIt;
		}

		public int getEmpPeriodicidadeRi() {
			return empPeriodicidadeRi;
		}

		public void setEmpPeriodicidadeRi(int empPeriodicidadeRi) {
			this.empPeriodicidadeRi = empPeriodicidadeRi;
		}

		public int getEmpPeriodicidadeMca() {
			return empPeriodicidadeMca;
		}

		public void setEmpPeriodicidadeMca(int empPeriodicidadeMca) {
			this.empPeriodicidadeMca = empPeriodicidadeMca;
		}

		public Date getEmpProxMedicaoIt() {
			return empProxMedicaoIt;
		}

		public void setEmpProxMedicaoIt(Date empProxMedicaoIt) {
			this.empProxMedicaoIt = empProxMedicaoIt;
		}

		public Date getEmpProxMedicaoRi() {
			return empProxMedicaoRi;
		}

		public void setEmpProxMedicaoRi(Date empProxMedicaoRi) {
			this.empProxMedicaoRi = empProxMedicaoRi;
		}

		public Date getEmpProxMedicaoMca() {
			return empProxMedicaoMca;
		}

		public void setEmpProxMedicaoMca(Date empProxMedicaoMca) {
			this.empProxMedicaoMca = empProxMedicaoMca;
		}

		public Date getCreatedAt() {
			return createdAt;
		}
		
}
