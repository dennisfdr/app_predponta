package com.br.predponta.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.br.predponta.app.entities.Inspecao_Acustica_Local;


@Repository
public interface Inspecao_Acustica_LocalRepository  extends JpaRepository <Inspecao_Acustica_Local, Long>{

}
