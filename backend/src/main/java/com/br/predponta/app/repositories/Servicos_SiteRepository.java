package com.br.predponta.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.br.predponta.app.entities.Servicos_Site;


@Repository
public interface Servicos_SiteRepository  extends JpaRepository <Servicos_Site, Long>{

}
