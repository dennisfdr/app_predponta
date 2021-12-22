package com.br.predponta.app.dto;

import java.io.Serializable;
import java.util.Date;

import com.br.predponta.app.entities.RelatorioIntervencao;



public class RelatorioIntervencaoDTO implements Serializable{
	private static final long serialVersionUID = 1L;

	private Integer riCodigo;
    private String riFalha;
    private String riEspecificacaoFalha;
    private String riPosicao;
    private String riAcaoProposta;
    private String riEspectro;
    private String riCurvaTendencia;
    private String riVideo;
    private int riStatus;  
    private Date riDataAbertura;
    private Date riDataColeta;
    private String riFotoComponente;
    private int riHaviaFalha;
    private String riHaviaFalhaObs;
    private int riDiagnosticoFalha;
    private String riDiagnosticoFalhaObs;
    private int riTrabalhoAlem;
    private String riTrabalhoAlemObs;
    private Date riDataIntervencao;
    private String riTempoExecucao;
    private String riResponsavel;
    private String riNumOs;
    private int riStatusAvaliacao;
    private Date riAvaliado;
    private Date riBaixada;
    private String riBaixadaObs;
    private String riPrazoExecucao;
    private Integer riCriticidade;
    private String riEquipamentos;
    private String riCategoria;
    private String riNumeroOs;
    private double riCustoPreditiva;
    private double riCustoCorretiva;
    private int riQuebraEquipamento;
    
    private Integer inspecaoAcusticaLocal;
	
			
		public RelatorioIntervencaoDTO () {
			
		}

		public RelatorioIntervencaoDTO(Integer riCodigo, String riFalha, String riEspecificacaoFalha, String riPosicao, String riAcaoProposta, String riEspectro, String riCurvaTendencia, String riVideo, int riStatus, Date riDataAbertura, String riFotoComponente, int riHaviaFalha, String riHaviaFalhaObs, int riDiagnosticoFalha, String riDiagnosticoFalhaObs, int riTrabalhoAlem, String riTrabalhoAlemObs, Date riDataIntervencao, String riTempoExecucao, String riResponsavel, String riNumOs, int riStatusAvaliacao, String riCategoria, double riCustoPreditiva, double riCustoCorretiva, int riQuebraEquipamento, Integer inspecaoAcusticaLocal) {

	        this.riCodigo = riCodigo;
	        this.riFalha = riFalha;
	        this.riEspecificacaoFalha = riEspecificacaoFalha;
	        this.riPosicao = riPosicao;
	        this.riAcaoProposta = riAcaoProposta;
	        this.riEspectro = riEspectro;
	        this.riCurvaTendencia = riCurvaTendencia;
	        this.riVideo = riVideo;
	        this.riStatus = riStatus;
	        this.riDataAbertura = riDataAbertura;
	        this.riFotoComponente = riFotoComponente;
	        this.riHaviaFalha = riHaviaFalha;
	        this.riHaviaFalhaObs = riHaviaFalhaObs;
	        this.riDiagnosticoFalha = riDiagnosticoFalha;
	        this.riDiagnosticoFalhaObs = riDiagnosticoFalhaObs;
	        this.riTrabalhoAlem = riTrabalhoAlem;
	        this.riTrabalhoAlemObs = riTrabalhoAlemObs;
	        this.riDataIntervencao = riDataIntervencao;
	        this.riTempoExecucao = riTempoExecucao;
	        this.riResponsavel = riResponsavel;
	        this.riNumOs = riNumOs;
	        this.riStatusAvaliacao = riStatusAvaliacao;
	        this.riCategoria = riCategoria;
	        this.riCustoPreditiva = riCustoPreditiva;
	        this.riCustoCorretiva = riCustoCorretiva;
	        this.riQuebraEquipamento = riQuebraEquipamento;
			
	        this.inspecaoAcusticaLocal = inspecaoAcusticaLocal;
		
		}
		
		public RelatorioIntervencaoDTO (RelatorioIntervencao entity) {
		    
	        this.riCodigo = entity.getRiCodigo();
	        this.riFalha = entity.getRiFalha();
	        this.riEspecificacaoFalha = entity.getRiEspecificacaoFalha();
	        this.riPosicao = entity.getRiPosicao();
	        this.riAcaoProposta = entity.getRiAcaoProposta();
	        this.riEspectro = entity.getRiEspectro();
	        this.riCurvaTendencia = entity.getRiCurvaTendencia();
	        this.riVideo = entity.getRiVideo();
	        this.riStatus = entity.getRiStatus();
	        this.riDataAbertura = entity.getRiDataAbertura();
	        this.riFotoComponente = entity.getRiFotoComponente();
	        this.riHaviaFalha = entity.getRiHaviaFalha();
	        this.riHaviaFalhaObs = entity.getRiHaviaFalhaObs();
	        this.riDiagnosticoFalha = entity.getRiDiagnosticoFalha();
	        this.riDiagnosticoFalhaObs = entity.getRiDiagnosticoFalhaObs();
	        this.riTrabalhoAlem = entity.getRiTrabalhoAlem();
	        this.riTrabalhoAlemObs = entity.getRiTrabalhoAlemObs();
	        this.riDataIntervencao = entity.getRiDataIntervencao();
	        this.riTempoExecucao = entity.getRiTempoExecucao();
	        this.riResponsavel = entity.getRiResponsavel();
	        this.riNumOs = entity.getRiNumOs();
	        this.riStatusAvaliacao = entity.getRiStatusAvaliacao();
	        this.riCategoria = entity.getRiCategoria();
	        this.riCustoPreditiva = entity.getRiCustoPreditiva();
	        this.riCustoCorretiva = entity.getRiCustoCorretiva();
	        this.riQuebraEquipamento = entity.getRiQuebraEquipamento();
	        
			this.inspecaoAcusticaLocal = entity.getInspecaoAcusticaLocal().getIalCodigo();
		}

//Generate Getters and Setters;
				
		public Integer getRiCodigo() {
			return riCodigo;
		}

		public void setRiCodigo(Integer riCodigo) {
			this.riCodigo = riCodigo;
		}

		public String getRiFalha() {
			return riFalha;
		}

		public void setRiFalha(String riFalha) {
			this.riFalha = riFalha;
		}

		public String getRiEspecificacaoFalha() {
			return riEspecificacaoFalha;
		}

		public void setRiEspecificacaoFalha(String riEspecificacaoFalha) {
			this.riEspecificacaoFalha = riEspecificacaoFalha;
		}

		public String getRiPosicao() {
			return riPosicao;
		}

		public void setRiPosicao(String riPosicao) {
			this.riPosicao = riPosicao;
		}

		public String getRiAcaoProposta() {
			return riAcaoProposta;
		}

		public void setRiAcaoProposta(String riAcaoProposta) {
			this.riAcaoProposta = riAcaoProposta;
		}

		public String getRiEspectro() {
			return riEspectro;
		}

		public void setRiEspectro(String riEspectro) {
			this.riEspectro = riEspectro;
		}

		public String getRiCurvaTendencia() {
			return riCurvaTendencia;
		}

		public void setRiCurvaTendencia(String riCurvaTendencia) {
			this.riCurvaTendencia = riCurvaTendencia;
		}

		public String getRiVideo() {
			return riVideo;
		}

		public void setRiVideo(String riVideo) {
			this.riVideo = riVideo;
		}

		public int getRiStatus() {
			return riStatus;
		}

		public void setRiStatus(int riStatus) {
			this.riStatus = riStatus;
		}

		public Date getRiDataAbertura() {
			return riDataAbertura;
		}

		public void setRiDataAbertura(Date riDataAbertura) {
			this.riDataAbertura = riDataAbertura;
		}

		public Date getRiDataColeta() {
			return riDataColeta;
		}

		public void setRiDataColeta(Date riDataColeta) {
			this.riDataColeta = riDataColeta;
		}

		public String getRiFotoComponente() {
			return riFotoComponente;
		}

		public void setRiFotoComponente(String riFotoComponente) {
			this.riFotoComponente = riFotoComponente;
		}

		public int getRiHaviaFalha() {
			return riHaviaFalha;
		}

		public void setRiHaviaFalha(int riHaviaFalha) {
			this.riHaviaFalha = riHaviaFalha;
		}

		public String getRiHaviaFalhaObs() {
			return riHaviaFalhaObs;
		}

		public void setRiHaviaFalhaObs(String riHaviaFalhaObs) {
			this.riHaviaFalhaObs = riHaviaFalhaObs;
		}

		public int getRiDiagnosticoFalha() {
			return riDiagnosticoFalha;
		}

		public void setRiDiagnosticoFalha(int riDiagnosticoFalha) {
			this.riDiagnosticoFalha = riDiagnosticoFalha;
		}

		public String getRiDiagnosticoFalhaObs() {
			return riDiagnosticoFalhaObs;
		}

		public void setRiDiagnosticoFalhaObs(String riDiagnosticoFalhaObs) {
			this.riDiagnosticoFalhaObs = riDiagnosticoFalhaObs;
		}

		public int getRiTrabalhoAlem() {
			return riTrabalhoAlem;
		}

		public void setRiTrabalhoAlem(int riTrabalhoAlem) {
			this.riTrabalhoAlem = riTrabalhoAlem;
		}

		public String getRiTrabalhoAlemObs() {
			return riTrabalhoAlemObs;
		}

		public void setRiTrabalhoAlemObs(String riTrabalhoAlemObs) {
			this.riTrabalhoAlemObs = riTrabalhoAlemObs;
		}

		public Date getRiDataIntervencao() {
			return riDataIntervencao;
		}

		public void setRiDataIntervencao(Date riDataIntervencao) {
			this.riDataIntervencao = riDataIntervencao;
		}

		public String getRiTempoExecucao() {
			return riTempoExecucao;
		}

		public void setRiTempoExecucao(String riTempoExecucao) {
			this.riTempoExecucao = riTempoExecucao;
		}

		public String getRiResponsavel() {
			return riResponsavel;
		}

		public void setRiResponsavel(String riResponsavel) {
			this.riResponsavel = riResponsavel;
		}

		public String getRiNumOs() {
			return riNumOs;
		}

		public void setRiNumOs(String riNumOs) {
			this.riNumOs = riNumOs;
		}

		public int getRiStatusAvaliacao() {
			return riStatusAvaliacao;
		}

		public void setRiStatusAvaliacao(int riStatusAvaliacao) {
			this.riStatusAvaliacao = riStatusAvaliacao;
		}

		public Date getRiAvaliado() {
			return riAvaliado;
		}

		public void setRiAvaliado(Date riAvaliado) {
			this.riAvaliado = riAvaliado;
		}

		public Date getRiBaixada() {
			return riBaixada;
		}

		public void setRiBaixada(Date riBaixada) {
			this.riBaixada = riBaixada;
		}

		public String getRiBaixadaObs() {
			return riBaixadaObs;
		}

		public void setRiBaixadaObs(String riBaixadaObs) {
			this.riBaixadaObs = riBaixadaObs;
		}

		public String getRiPrazoExecucao() {
			return riPrazoExecucao;
		}

		public void setRiPrazoExecucao(String riPrazoExecucao) {
			this.riPrazoExecucao = riPrazoExecucao;
		}

		public Integer getRiCriticidade() {
			return riCriticidade;
		}

		public void setRiCriticidade(Integer riCriticidade) {
			this.riCriticidade = riCriticidade;
		}

		public String getRiEquipamentos() {
			return riEquipamentos;
		}

		public void setRiEquipamentos(String riEquipamentos) {
			this.riEquipamentos = riEquipamentos;
		}

		public String getRiCategoria() {
			return riCategoria;
		}

		public void setRiCategoria(String riCategoria) {
			this.riCategoria = riCategoria;
		}

		public String getRiNumeroOs() {
			return riNumeroOs;
		}

		public void setRiNumeroOs(String riNumeroOs) {
			this.riNumeroOs = riNumeroOs;
		}

		public double getRiCustoPreditiva() {
			return riCustoPreditiva;
		}

		public void setRiCustoPreditiva(double riCustoPreditiva) {
			this.riCustoPreditiva = riCustoPreditiva;
		}

		public double getRiCustoCorretiva() {
			return riCustoCorretiva;
		}

		public void setRiCustoCorretiva(double riCustoCorretiva) {
			this.riCustoCorretiva = riCustoCorretiva;
		}

		public int getRiQuebraEquipamento() {
			return riQuebraEquipamento;
		}

		public void setRiQuebraEquipamento(int riQuebraEquipamento) {
			this.riQuebraEquipamento = riQuebraEquipamento;
		}

		public Integer getInspecaoAcusticaLocal() {
			return inspecaoAcusticaLocal;
		}

		public void setInspecaoAcusticaLocal(Integer inspecaoAcusticaLocal) {
			this.inspecaoAcusticaLocal = inspecaoAcusticaLocal;
		}
	
}
