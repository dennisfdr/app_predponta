package com.br.predponta.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.br.predponta.app.entities.Mca_Status;


@Repository
public interface Mca_StatusRepository  extends JpaRepository <Mca_Status, Long>{

}
