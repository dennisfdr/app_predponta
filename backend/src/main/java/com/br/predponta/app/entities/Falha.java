package com.br.predponta.app.entities;

import java.io.Serializable;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "falha")
public class Falha implements Serializable{
	private static final long serialVersionUID = 1L;
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Basic(optional = false)
    @Column(name = "fal_codigo")
    private Integer falCodigo;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 80)
    @Column(name = "fal_descricao")
    private String falDescricao;
    
//### Relacionamentos ### 
    
    @JoinColumn(name = "relatorio_intervencao_ri_codigo", referencedColumnName = "ri_codigo")
    @ManyToOne(optional = false)
    private RelatorioIntervencao relatorioIntervencao;
    
	public Falha () {
			}

	public Falha(Integer falCodigo, @NotNull @Size(min = 1, max = 80) String falDescricao, RelatorioIntervencao relatorioIntervencao) {
		super();

        this.falCodigo = falCodigo;
        this.falDescricao = falDescricao;
		
        this.relatorioIntervencao = relatorioIntervencao;
	}
	
//Generate Getters and Setters;

	public Integer getFalCodigo() {
		return falCodigo;
	}

	public void setFalCodigo(Integer falCodigo) {
		this.falCodigo = falCodigo;
	}

	public String getFalDescricao() {
		return falDescricao;
	}

	public void setFalDescricao(String falDescricao) {
		this.falDescricao = falDescricao;
	}

	public RelatorioIntervencao getRelatorioIntervencao() {
		return relatorioIntervencao;
	}

	public void setRelatorioIntervencao(RelatorioIntervencao relatorioIntervencao) {
		this.relatorioIntervencao = relatorioIntervencao;
	}
	
//Generate Getters and Setters;

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((falCodigo == null) ? 0 : falCodigo.hashCode());
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
		Falha other = (Falha) obj;
		if (falCodigo == null) {
			if (other.falCodigo != null)
				return false;
		} else if (!falCodigo.equals(other.falCodigo))
			return false;
		return true;
	}

}
