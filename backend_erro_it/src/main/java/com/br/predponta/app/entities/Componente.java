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
@Table(name = "componente")
public class Componente implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	
    @Basic(optional = false)
    @Column(name = "com_codigo")
    private Integer comCodigo;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 80)
    @Column(name = "com_nome")
    private String comNome;
    @Basic(optional = false)
    @NotNull
    @Column(name = "com_status")
    private int comStatus;
    
//### Relacionamentos ###
    
    @JoinColumn(name = "maquina_equipamento_MAE_CODIGO", referencedColumnName = "MAE_CODIGO")
    @ManyToOne(optional = false)
    private MaquinaEquipamento maquinaequipamentoMAECODIGO;  
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "componente")
    private List<HistoricoComponente> historicoComponente;
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "componente")
    private List<StatusSubComponente> statusSubComponente;
    
//    
    
  
    public Componente() {
    }

	public Componente(Integer comCodigo, @NotNull @Size(min = 1, max = 80) String comNome, @NotNull int comStatus, MaquinaEquipamento maquinaequipamentoMAECODIGO){
		super();
		
        this.comCodigo = comCodigo;
        this.comNome = comNome;
        this.comStatus = comStatus;
        this.maquinaequipamentoMAECODIGO = maquinaequipamentoMAECODIGO;
		
	}
	
//Generate Getters and Setters;
		
	public Integer getComCodigo() {
		return comCodigo;
	}

	public void setComCodigo(Integer comCodigo) {
		this.comCodigo = comCodigo;
	}

	public String getComNome() {
		return comNome;
	}

	public void setComNome(String comNome) {
		this.comNome = comNome;
	}

	public int getComStatus() {
		return comStatus;
	}

	public void setComStatus(int comStatus) {
		this.comStatus = comStatus;
	}

	public MaquinaEquipamento getMaquinaequipamentoMAECODIGO() {
		return maquinaequipamentoMAECODIGO;
	}

	public void setMaquinaequipamentoMAECODIGO(MaquinaEquipamento maquinaequipamentoMAECODIGO) {
		this.maquinaequipamentoMAECODIGO = maquinaequipamentoMAECODIGO;
	}

//Generate hadsCode() and  equals()  somente do id;

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((comCodigo == null) ? 0 : comCodigo.hashCode());
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
		Componente other = (Componente) obj;
		if (comCodigo == null) {
			if (other.comCodigo != null)
				return false;
		} else if (!comCodigo.equals(other.comCodigo))
			return false;
		return true;
	}

}
