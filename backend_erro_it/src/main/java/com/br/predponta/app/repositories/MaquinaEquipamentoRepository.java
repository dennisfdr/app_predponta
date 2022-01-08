package com.br.predponta.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.br.predponta.app.entities.MaquinaEquipamento;

@Repository
public interface MaquinaEquipamentoRepository  extends JpaRepository <MaquinaEquipamento, Integer>{

}
