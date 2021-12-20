package com.br.predponta.app.dto;

import java.io.Serializable;
import java.util.Date;

import com.br.predponta.app.entities.ArquivoUpload;



public class ArquivoUploadDTO implements Serializable{
	private static final long serialVersionUID = 1L;

    private Integer aruCodigo;
    private String aruDescricao;
    private byte[] aruArquivo;
    private String aruNomeOriginalArquivo;
    private Date aruData;
    
    private Integer empresaempCodigo;
			
		public ArquivoUploadDTO () {
			
		}

		public ArquivoUploadDTO(Integer aruCodigo, Integer empresaempCodigo, String aruDescricao, byte[] aruArquivo, String aruNomeOriginalArquivo, Date aruData) {
	       
			this.aruCodigo = aruCodigo;
	        this.aruDescricao = aruDescricao;
	        this.aruArquivo = aruArquivo;
	        this.aruNomeOriginalArquivo = aruNomeOriginalArquivo;
	        this.aruData = aruData;
				
			this.empresaempCodigo = empresaempCodigo;
		}
		
		public ArquivoUploadDTO (ArquivoUpload entity) {
								
			this.aruCodigo = entity.getAruCodigo();
			this.aruDescricao = entity.getAruDescricao();
			this.aruArquivo = entity.getAruArquivo();
			this.aruNomeOriginalArquivo = entity.getAruNomeOriginalArquivo();
			this.aruData = entity.getAruData();

	        this.empresaempCodigo = entity.getEmpresa().getEmpCodigo();

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

		public void setEmpresaempCodigo(Integer empresaempCodigo) {
			this.empresaempCodigo = empresaempCodigo;
		}

		public Integer getEmpresaempCodigo() {
			return empresaempCodigo;
		}
		
}
