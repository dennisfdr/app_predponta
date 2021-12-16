package com.br.predponta.app.dto;

import java.io.Serializable;
import java.util.Date;

import com.br.predponta.app.entities.ArquivoUpload;
import com.br.predponta.app.entities.Empresa;

public class ArquivoUploadDTO implements Serializable{
	private static final long serialVersionUID = 1L;

    private Integer aruCodigo;
    private String aruDescricao;
    private byte[] aruArquivo;
    private String aruNomeOriginalArquivo;
    private Date aruData;
    private Empresa empresaEmpCodigo;
   
		public ArquivoUploadDTO () {
			
		}

		public ArquivoUploadDTO(byte[] aruArquivo, Integer aruCodigo, String aruDescricao, String aruNomeOriginalArquivo, Date aruData,Empresa empresaEmpCodigo) {
			
			this.aruArquivo = aruArquivo;
			this.aruCodigo = aruCodigo;
			this.aruDescricao = aruDescricao;
			this.aruNomeOriginalArquivo = aruNomeOriginalArquivo;
			this.aruData = aruData;	
			this.empresaEmpCodigo = empresaEmpCodigo;
			
		}
		
		public ArquivoUploadDTO (ArquivoUpload entity) {
			
			this.aruArquivo = entity.getAruArquivo();
			this.aruCodigo = entity.getAruCodigo();
			this.aruDescricao = entity.getAruDescricao();
			this.aruNomeOriginalArquivo = entity.getAruNomeOriginalArquivo();
			this.aruData = entity.getAruData();	
			this.empresaEmpCodigo = entity.getEmpresaEmpCodigo();
			
			//this.empresaEmpCodigo = entity.getEmpresaEmpCodigo().getEmpCodigo();
						
		}

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

		public Empresa getEmpresaEmpCodigo() {
			return empresaEmpCodigo;
		}

		public void setEmpresaEmpCodigo(Empresa empresaEmpCodigo) {
			this.empresaEmpCodigo = empresaEmpCodigo;
		}

}
