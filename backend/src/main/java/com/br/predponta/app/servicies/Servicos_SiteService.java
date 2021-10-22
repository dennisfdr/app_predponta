package com.br.predponta.app.servicies;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.br.predponta.app.dto.Servicos_SiteDTO;
import com.br.predponta.app.entities.Servicos_Site;

import com.br.predponta.app.repositories.Servicos_SiteRepository;
import com.br.predponta.app.servicies.exceptions.DataBaseException;
import com.br.predponta.app.servicies.exceptions.ResourceNotFoundException;


@Service
public class Servicos_SiteService {
	
	
	@Autowired
	private Servicos_SiteRepository repository;
	
	@Transactional (readOnly= true)
	public List <Servicos_SiteDTO> findAll(){
		List<Servicos_Site> list =repository.findAll();
		return list.stream().map(x -> new Servicos_SiteDTO(x)).collect(Collectors.toList());
	}
	
	
	
	@Transactional (readOnly = true)
    public Page<Servicos_SiteDTO> findAllPaged(Pageable pageable){
        Page <Servicos_Site> list=repository.findAll(pageable);
        return list.map(x -> new Servicos_SiteDTO(x));
    }

	
	@Transactional (readOnly = true)
	public Servicos_SiteDTO findById(Long ssi_codigo) {
		Optional<Servicos_Site> obj = repository.findById(ssi_codigo);
		Servicos_Site entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new Servicos_SiteDTO(entity);
	}
	
	@Transactional
	public Servicos_SiteDTO insert(Servicos_SiteDTO dto) {
		Servicos_Site entity = new Servicos_Site();
		entity.setSsi_descricao(dto.getSsi_descricao());
		entity.setSsi_arquivo(dto.getSsi_arquivo());
		entity.setFal_codigo(dto.getFal_codigo());
		entity.setFal_descricao(dto.getFal_descricao());
		entity = repository.save(entity);
		return new Servicos_SiteDTO(entity);	
	}
	
	@Transactional
	public Servicos_SiteDTO update(Long ssi_codigo, Servicos_SiteDTO dto) {
		try {
			Servicos_Site entity = repository.getOne(ssi_codigo);
			entity.setSsi_descricao(dto.getSsi_descricao());
			entity.setSsi_arquivo(dto.getSsi_arquivo());
			entity = repository.save(entity);
			return new Servicos_SiteDTO(entity);
		}
		catch(EntityNotFoundException e) {
		throw new  ResourceNotFoundException("Id not Found" + ssi_codigo);
		}
	}

	public void delete(Long ssi_codigo) {
		try {
		repository.deleteById(ssi_codigo);
		}
		catch(EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException ("Id Not Found Exception");
		}
		catch (DataIntegrityViolationException e) {
			throw new DataBaseException("Integity Violation");
		}
	}

}

