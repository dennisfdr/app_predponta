package com.br.predponta.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.br.predponta.app.entities.StatusSubComponente;

@Repository
public interface StatusSubComponenteRepository  extends JpaRepository <StatusSubComponente, Integer>{

}
