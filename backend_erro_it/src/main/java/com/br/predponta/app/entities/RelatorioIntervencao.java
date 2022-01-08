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
@Table(name = "relatorio_intervencao")
public class RelatorioIntervencao implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	
	@Basic(optional = false)
    @Column(name = "ri_codigo")
    private Integer riCodigo;
	
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 400)
    @Column(name = "ri_falha")
    private String riFalha;
    
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 400)
    @Column(name = "ri_especificacao_falha")
    private String riEspecificacaoFalha;
    
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 400)
    @Column(name = "ri_posicao")
    private String riPosicao;
    
    @Basic(optional = false)
    @NotNull
    @Lob
    @Size(min = 1, max = 2147483647)
    @Column(name = "ri_acao_proposta")
    private String riAcaoProposta;
    
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 80)
    @Column(name = "ri_espectro")
    private String riEspectro;
    
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 80)
    @Column(name = "ri_curva_tendencia")
    private String riCurvaTendencia;
    
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 80)
    @Column(name = "ri_video")
    private String riVideo;
    @Basic(optional = false)
    @NotNull
    @Column(name = "ri_status")
    private int riStatus;  
   
    @Basic(optional = false)
    @NotNull
    @Column(name = "ri_data_abertura")
    @Temporal(TemporalType.TIMESTAMP)
    private Date riDataAbertura;
    
    @Column(name = "ri_data_coleta")
    @Temporal(TemporalType.DATE)
    private Date riDataColeta;
    
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 60)
    @Column(name = "ri_foto_componente")
    private String riFotoComponente;
    
    @Basic(optional = false)
    @NotNull
    @Column(name = "ri_havia_falha")
    private int riHaviaFalha;
    
    @Basic(optional = false)
    @NotNull
    @Lob
    @Size(min = 1, max = 65535)
    @Column(name = "ri_havia_falha_obs")
    private String riHaviaFalhaObs;
    
    @Basic(optional = false)
    @NotNull
    @Column(name = "ri_diagnostico_falha")
    private int riDiagnosticoFalha;
    
    @Basic(optional = false)
    @NotNull
    @Lob
    @Size(min = 1, max = 65535)
    @Column(name = "ri_diagnostico_falha_obs")
    private String riDiagnosticoFalhaObs;
    
    @Basic(optional = false)
    @NotNull
    @Column(name = "ri_trabalho_alem")
    private int riTrabalhoAlem;
    
    @Basic(optional = false)
    @NotNull
    @Lob
    @Size(min = 1, max = 65535)
    @Column(name = "ri_trabalho_alem_obs")
    private String riTrabalhoAlemObs;
    
    @Basic(optional = false)
    @NotNull
    @Column(name = "ri_data_intervencao")
    @Temporal(TemporalType.DATE)
    private Date riDataIntervencao;
    
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 10)
    @Column(name = "ri_tempo_execucao")
    private String riTempoExecucao;
    
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 30)
    @Column(name = "ri_responsavel")
    private String riResponsavel;
    
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 30)
    @Column(name = "ri_num_os")
    private String riNumOs;
    
    @Basic(optional = false)
    @NotNull
    @Column(name = "ri_status_avaliacao")
    private int riStatusAvaliacao;
    
    @Column(name = "ri_avaliado")
    @Temporal(TemporalType.TIMESTAMP)
    private Date riAvaliado;
    
    @Column(name = "ri_baixada")
    @Temporal(TemporalType.DATE)
    private Date riBaixada;
    
    @Lob
    @Size(max = 65535)
    @Column(name = "ri_baixada_obs")
    private String riBaixadaObs;
    
    @Size(max = 40)
    @Column(name = "ri_prazo_execucao")
    private String riPrazoExecucao;

    @Column(name = "ri_criticidade")
    private Integer riCriticidade;
    
    @Size(max = 200)
    @Column(name = "ri_equipamentos")
    private String riEquipamentos;
    
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 30)
    @Column(name = "ri_categoria")
    private String riCategoria;
    
    @Size(max = 60)
    @Column(name = "ri_numero_os")
    private String riNumeroOs;
    
    @Basic(optional = false)
    @NotNull
    @Column(name = "ri_custo_preditiva")
    private double riCustoPreditiva;
    
    @Basic(optional = false)
    @NotNull
    @Column(name = "ri_custo_corretiva")
    private double riCustoCorretiva;
    
    @Basic(optional = false)
    @NotNull
    @Column(name = "ri_quebra_equipamento")
    private int riQuebraEquipamento;
    
  //### Relacionamentos ###
    
    @JoinColumn(name = "inspecao_acustica_local_ial_codigo", referencedColumnName = "ial_codigo")
    @ManyToOne(optional = false)
    private InspecaoAcusticaLocal inspecaoAcusticaLocal; 
     
//      
      
    public RelatorioIntervencao() {
    }
    
	public RelatorioIntervencao(Integer riCodigo, @NotNull @Size(min = 1, max = 400) String riFalha, @NotNull @Size(min = 1, max = 400) String riEspecificacaoFalha, @NotNull @Size(min = 1, max = 400) String riPosicao, @NotNull @Size(min = 1, max = 2147483647) String riAcaoProposta, @NotNull @Size(min = 1, max = 80) String riEspectro, @NotNull @Size(min = 1, max = 80) String riCurvaTendencia, @NotNull @Size(min = 1, max = 80) String riVideo, @NotNull int riStatus, @NotNull Date riDataAbertura, @NotNull @Size(min = 1, max = 60) String riFotoComponente, @NotNull int riHaviaFalha, @NotNull @Size(min = 1, max = 65535) String riHaviaFalhaObs, @NotNull int riDiagnosticoFalha, @NotNull @Size(min = 1, max = 65535) String riDiagnosticoFalhaObs, @NotNull int riTrabalhoAlem, @NotNull @Size(min = 1, max = 65535) String riTrabalhoAlemObs, @NotNull Date riDataIntervencao, @NotNull @Size(min = 1, max = 10) String riTempoExecucao, @NotNull @Size(min = 1, max = 30) String riResponsavel, @NotNull @Size(min = 1, max = 30) String riNumOs, @NotNull int riStatusAvaliacao, @NotNull @Size(min = 1, max = 30) String riCategoria, @NotNull double riCustoPreditiva, @NotNull double riCustoCorretiva, @NotNull int riQuebraEquipamento, InspecaoAcusticaLocal inspecaoAcusticaLocal){
		super();
		
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
	
	public InspecaoAcusticaLocal getInspecaoAcusticaLocal() {
		return inspecaoAcusticaLocal;
	}

	public void setInspecaoAcusticaLocal(InspecaoAcusticaLocal inspecaoAcusticaLocal) {
		this.inspecaoAcusticaLocal = inspecaoAcusticaLocal;
	}
	
//Generate hadsCode() and  equals()  somente do id;

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((riCodigo == null) ? 0 : riCodigo.hashCode());
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
		RelatorioIntervencao other = (RelatorioIntervencao) obj;
		if (riCodigo == null) {
			if (other.riCodigo != null)
				return false;
		} else if (!riCodigo.equals(other.riCodigo))
			return false;
		return true;
	}
}
