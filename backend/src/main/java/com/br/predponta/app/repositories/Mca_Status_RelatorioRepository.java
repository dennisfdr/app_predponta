package com.br.predponta.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.br.predponta.app.entities.Mca_Status_Relatorio;


@Repository
public interface Mca_Status_RelatorioRepository  extends JpaRepository <Mca_Status_Relatorio, Long>{

}
