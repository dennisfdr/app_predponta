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
@Table(name = "maquina_equipamento")
public class MaquinaEquipamento implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	
    @Basic(optional = false)
    @Column(name = "MAE_CODIGO")
    private Integer maeCodigo;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 80)
    @Column(name = "MAE_NOME")
    private String maeNome;
    @Size(max = 10)
    @Column(name = "MAE_TAG")
    private String maeTag;
    @Basic(optional = false)
    @NotNull
    @Column(name = "MAE_STATUS")
    private int maeStatus;
    
//### Relacionamentos ###   
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "maquinaequipamentoMAECODIGO")
    private List<Componente> componente;
    
    @JoinColumn(name = "maquina_MAQ_CODIGO", referencedColumnName = "MAQ_CODIGO")
    @ManyToOne(optional = false)
    private Maquina maquina;
    
//      
      
    public MaquinaEquipamento() {
    }
    
	public MaquinaEquipamento(Integer maeCodigo, @NotNull @Size(min = 1, max = 80) String maeNome, @NotNull int maeStatus, Maquina maquina, @Size(max = 10) String maeTag ){
		super();
        
		this.maeCodigo = maeCodigo;
        this.maeNome = maeNome;
        this.maeStatus = maeStatus;
        this.maeTag = maeTag;
        
		this.maquina = maquina;		
	}
	
//Generate Getters and Setters;

	public Integer getMaeCodigo() {
		return maeCodigo;
	}

	public void setMaeCodigo(Integer maeCodigo) {
		this.maeCodigo = maeCodigo;
	}

	public String getMaeNome() {
		return maeNome;
	}

	public void setMaeNome(String maeNome) {
		this.maeNome = maeNome;
	}

	public String getMaeTag() {
		return maeTag;
	}

	public void setMaeTag(String maeTag) {
		this.maeTag = maeTag;
	}

	public int getMaeStatus() {
		return maeStatus;
	}

	public void setMaeStatus(int maeStatus) {
		this.maeStatus = maeStatus;
	}

	public Maquina getMaquina() {
		return maquina;
	}

	public void setMaquina(Maquina maquina) {
		this.maquina = maquina;
	}
	
//Generate Getters and Setters;

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((maeCodigo == null) ? 0 : maeCodigo.hashCode());
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
		MaquinaEquipamento other = (MaquinaEquipamento) obj;
		if (maeCodigo == null) {
			if (other.maeCodigo != null)
				return false;
		} else if (!maeCodigo.equals(other.maeCodigo))
			return false;
		return true;
	}

}
