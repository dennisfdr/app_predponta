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
@Table(name = "sub_componente")
public class SubComponente implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	
    @Basic(optional = false)
    @Column(name = "sco_codigo")
    private Integer scoCodigo;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 80)
    @Column(name = "sco_nome")
    private String scoNome;
    @Basic(optional = false)
    @NotNull
    @Column(name = "sco_status")
    private int scoStatus;

//### Relacionamentos ###
    
    @JoinColumn(name = "componente_peca_cop_codigo", referencedColumnName = "cop_codigo")
    @ManyToOne(optional = false)
    private ComponentePeca componentePeca;
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "subComponente")
    private List<ComponenteSubcomponente> componenteSubcomponente;
    
//      
      
    public SubComponente() {
    }
    
	public SubComponente(Integer scoCodigo, @NotNull @Size(min = 1, max = 80) String scoNome, @NotNull int scoStatus, ComponentePeca componentePeca){
		super();
		
        this.scoCodigo = scoCodigo;
        this.scoNome = scoNome;
        this.scoStatus = scoStatus;

		this.componentePeca = componentePeca;		
	}

//Generate Getters and Setters;
		
	public Integer getScoCodigo() {
		return scoCodigo;
	}

	public void setScoCodigo(Integer scoCodigo) {
		this.scoCodigo = scoCodigo;
	}

	public String getScoNome() {
		return scoNome;
	}

	public void setScoNome(String scoNome) {
		this.scoNome = scoNome;
	}

	public int getScoStatus() {
		return scoStatus;
	}

	public void setScoStatus(int scoStatus) {
		this.scoStatus = scoStatus;
	}

	public ComponentePeca getComponentePeca() {
		return componentePeca;
	}

	public void setComponentePeca(ComponentePeca componentePeca) {
		this.componentePeca = componentePeca;
	}

//Generate hadsCode() and  equals()  somente do id;
			
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((scoCodigo == null) ? 0 : scoCodigo.hashCode());
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
		SubComponente other = (SubComponente) obj;
		if (scoCodigo == null) {
			if (other.scoCodigo != null)
				return false;
		} else if (!scoCodigo.equals(other.scoCodigo))
			return false;
		return true;
	}

}
