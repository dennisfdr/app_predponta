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

import com.br.predponta.app.dto.Vibracao_FalhaDTO;
import com.br.predponta.app.entities.Vibracao_Falha;
import com.br.predponta.app.repositories.Vibracao_FalhaRepository;

import com.br.predponta.app.servicies.exceptions.DataBaseException;
import com.br.predponta.app.servicies.exceptions.ResourceNotFoundException;


@Service
public class Vibracao_FalhaService {
	
	
	@Autowired
	private  Vibracao_FalhaRepository repository;
	
	@Transactional (readOnly= true)
	public List < Vibracao_FalhaDTO> findAll(){
		List< Vibracao_Falha> list =repository.findAll();
		return list.stream().map(x -> new  Vibracao_FalhaDTO(x)).collect(Collectors.toList());
	}
	
	
	
	@Transactional (readOnly = true)
    public Page< Vibracao_FalhaDTO> findAllPaged(Pageable pageable){
        Page < Vibracao_Falha> list=repository.findAll(pageable);
        return list.map(x -> new  Vibracao_FalhaDTO(x));
    }

	
	@Transactional (readOnly = true)
	public  Vibracao_FalhaDTO findById(Long fal_codigo) {
		Optional< Vibracao_Falha> obj = repository.findById(fal_codigo);
		 Vibracao_Falha entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new  Vibracao_FalhaDTO(entity);
	}
	
	@Transactional
	public  Vibracao_FalhaDTO insert( Vibracao_FalhaDTO dto) {
		 Vibracao_Falha entity = new  Vibracao_Falha();
		entity.setFal_descricao(dto.getFal_descricao());
		entity = repository.save(entity);
		return new  Vibracao_FalhaDTO(entity);	
	}
	
	@Transactional
	public  Vibracao_FalhaDTO update(Long fal_codigo,  Vibracao_FalhaDTO dto) {
		try {
			 Vibracao_Falha entity = repository.getOne(fal_codigo);
			entity.setFal_descricao(dto.getFal_descricao());
			entity = repository.save(entity);
			return new  Vibracao_FalhaDTO(entity);
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

