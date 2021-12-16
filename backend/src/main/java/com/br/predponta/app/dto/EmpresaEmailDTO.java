package com.br.predponta.app.dto;

import java.io.Serializable;

import com.br.predponta.app.entities.Empresa;
import com.br.predponta.app.entities.EmpresaEmail;



public class EmpresaEmailDTO implements Serializable{
	private static final long serialVersionUID = 1L;

    private Integer emeCodigo;
    private String emeEmail;
    private String emeResponsavel;
    private Empresa empresaEmpCodigo;
			
		public EmpresaEmailDTO () {
			
		}

		public EmpresaEmailDTO(Integer emeCodigo, String emeEmail, String emeResponsavel, Empresa empresaEmpCodigo) {
			
		    this.emeCodigo = emeCodigo;
	        this.emeEmail = emeEmail;
	        this.emeResponsavel = emeResponsavel;				
			this.empresaEmpCodigo = empresaEmpCodigo;
		}
		
		public EmpresaEmailDTO (EmpresaEmail entity) {

		    this.emeCodigo = entity.getEmeCodigo();
	        this.emeEmail = entity.getEmeEmail();
	        this.emeResponsavel = entity.getEmeResponsavel();
			this.empresaEmpCodigo = entity.getEmpresaEmpCodigo();
		
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

		public Empresa getEmpresaEmpCodigo() {
			return empresaEmpCodigo;
		}

		public void setEmpresaEmpCodigo(Empresa empresaEmpCodigo) {
			this.empresaEmpCodigo = empresaEmpCodigo;
		}
		
}
