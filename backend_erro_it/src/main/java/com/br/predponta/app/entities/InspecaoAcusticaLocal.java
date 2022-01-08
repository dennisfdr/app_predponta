package com.br.predponta.app.entities;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


@Entity
@Table(name = "inspecao_acustica_local")
public class InspecaoAcusticaLocal implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
		
	@Basic(optional = false)
    @Column(name = "ial_codigo")
    private Integer ialCodigo;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 80)
    @Column(name = "ial_descricao")
    private String ialDescricao;
    @Basic(optional = false)
    @NotNull
    @Column(name = "ial_status")
    private int ialStatus;

//### Relacionamentos ###
    
     @JoinColumn(name = "medicao_med_codigo", referencedColumnName = "med_codigo")
    @ManyToOne(optional = false)
    private Medicao medicao;  
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "inspecaoAcusticaLocal")
    private List<RelatorioIntervencao> relatorioIntervencao;  
    
//      
      
    public InspecaoAcusticaLocal() {
    }
    
	public InspecaoAcusticaLocal(Integer ialCodigo, @NotNull @Size(min = 1, max = 80) String ialDescricao, @NotNull int ialStatus, Medicao medicao){
		super();
		
        this.ialCodigo = ialCodigo;
        this.ialDescricao = ialDescricao;
        this.ialStatus = ialStatus;
		
		this.medicao = medicao;		
	}
	
//Generate Getters and Setters;	
	
	public Integer getIalCodigo() {
		return ialCodigo;
	}

	public void setIalCodigo(Integer ialCodigo) {
		this.ialCodigo = ialCodigo;
	}

	public String getIalDescricao() {
		return ialDescricao;
	}

	public void setIalDescricao(String ialDescricao) {
		this.ialDescricao = ialDescricao;
	}

	public int getIalStatus() {
		return ialStatus;
	}

	public void setIalStatus(int ialStatus) {
		this.ialStatus = ialStatus;
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
		result = prime * result + ((ialCodigo == null) ? 0 : ialCodigo.hashCode());
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
		InspecaoAcusticaLocal other = (InspecaoAcusticaLocal) obj;
		if (ialCodigo == null) {
			if (other.ialCodigo != null)
				return false;
		} else if (!ialCodigo.equals(other.ialCodigo))
			return false;
		return true;
	}

}
