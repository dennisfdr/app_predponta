package com.br.predponta.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.br.predponta.app.entities.Vibracao_Falha;


@Repository
public interface Vibracao_FalhaRepository  extends JpaRepository <Vibracao_Falha, Long>{

}
