package com.br.predponta.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.br.predponta.app.entities.Falha;


@Repository
public interface FalhaRepository  extends JpaRepository <Falha, Integer>{

}
