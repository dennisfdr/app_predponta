package com.br.predponta.app.servicies;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.br.predponta.app.dto.FalhaDTO;
import com.br.predponta.app.entities.Falha;
import com.br.predponta.app.repositories.FalhaRepository;
import com.br.predponta.app.servicies.exceptions.DataBaseException;
import com.br.predponta.app.servicies.exceptions.ResourceNotFoundException;


@Service
public class FalhaService {
	
	
	@Autowired
	private FalhaRepository repository;
	
	
	@Transactional (readOnly = true)
	public Page<FalhaDTO> findAllPaged(PageRequest pageRequest){
		Page <Falha> list=repository.findAll(pageRequest);
		return list.map(x -> new FalhaDTO(x));	
	}

	
	@Transactional (readOnly = true)
	public FalhaDTO findById(Long fal_codigo) {
		Optional<Falha> obj = repository.findById(fal_codigo);
		Falha entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new FalhaDTO(entity);
	}
	
	@Transactional
	public FalhaDTO insert(FalhaDTO dto) {
		Falha entity = new Falha();
		entity.setFal_descricao(dto.getFal_descricao());
		entity = repository.save(entity);
		return new FalhaDTO(entity);	
	}
	
	@Transactional
	public FalhaDTO update(Long fal_codigo, FalhaDTO dto) {
		try {
			Falha entity = repository.getOne(fal_codigo);
			entity.setFal_descricao(dto.getFal_descricao());
			entity = repository.save(entity);
			return new FalhaDTO(entity);
		}
		catch(EntityNotFoundException e) {
		throw new  ResourceNotFoundException("Id not Found" + fal_codigo);
		}
	}

	public void delete(Long fal_codigo) {
		try {
		repository.deleteById(fal_codigo);
		}
		catch(EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException ("Id Not Found Exception");
		}
		catch (DataIntegrityViolationException e) {
			throw new DataBaseException("Integity Violation");
		}
	}

}

