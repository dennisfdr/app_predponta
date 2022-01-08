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
@Table(name = "maquina")
public class Maquina implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	
    @Basic(optional = false)
    @Column(name = "MAQ_CODIGO")
    private Integer maqCodigo;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 60)
    @Column(name = "MAQ_NOME")
    private String maqNome;
    @Basic(optional = false)
    @NotNull
    @Column(name = "MAQ_ANDAR")
    private int maqAndar;
    @Basic(optional = false)
    @NotNull
    @Column(name = "MAQ_STATUS")
    private int maqStatus;
    
  //### Relacionamentos ###
    
    @JoinColumn(name = "setor_set_codigo", referencedColumnName = "set_codigo")
    @ManyToOne(optional = false)
    private Setor setor;
    
    
//      
      
    public Maquina() {
    }
    
	public Maquina(Integer maqCodigo, @NotNull @Size(min = 1, max = 60) String maqNome, @NotNull int maqAndar, @NotNull int maqStatus, Setor setor){
		super();
        this.maqCodigo = maqCodigo;
        this.maqNome = maqNome;
        this.maqAndar = maqAndar;
        this.maqStatus = maqStatus;
	
		this.setor = setor;		
	}
	
//Generate Getters and Setters;


	public Integer getMaqCodigo() {
		return maqCodigo;
	}

	public void setMaqCodigo(Integer maqCodigo) {
		this.maqCodigo = maqCodigo;
	}

	public String getMaqNome() {
		return maqNome;
	}

	public void setMaqNome(String maqNome) {
		this.maqNome = maqNome;
	}

	public int getMaqAndar() {
		return maqAndar;
	}

	public void setMaqAndar(int maqAndar) {
		this.maqAndar = maqAndar;
	}

	public int getMaqStatus() {
		return maqStatus;
	}

	public void setMaqStatus(int maqStatus) {
		this.maqStatus = maqStatus;
	}

	public void setSetor(Setor setor) {
		this.setor = setor;
	}

	public Setor getSetor() {
		return setor;
	}

//Generate hadsCode() and  equals()  somente do id;

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((maqCodigo == null) ? 0 : maqCodigo.hashCode());
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
		Maquina other = (Maquina) obj;
		if (maqCodigo == null) {
			if (other.maqCodigo != null)
				return false;
		} else if (!maqCodigo.equals(other.maqCodigo))
			return false;
		return true;
	}

}
