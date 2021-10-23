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

import com.br.predponta.app.dto.Inspecao_Acustica_LocalDTO;
import com.br.predponta.app.entities.Inspecao_Acustica_Local;

import com.br.predponta.app.repositories.Inspecao_Acustica_LocalRepository;
import com.br.predponta.app.servicies.exceptions.DataBaseException;
import com.br.predponta.app.servicies.exceptions.ResourceNotFoundException;


@Service
public class Inspecao_Acustica_LocalService {
	
	
	@Autowired
	private Inspecao_Acustica_LocalRepository repository;
	
	@Transactional (readOnly= true)
	public List <Inspecao_Acustica_LocalDTO> findAll(){
		List<Inspecao_Acustica_Local> list =repository.findAll();
		return list.stream().map(x -> new Inspecao_Acustica_LocalDTO(x)).collect(Collectors.toList());
	}
	
	
	
	@Transactional (readOnly = true)
    public Page<Inspecao_Acustica_LocalDTO> findAllPaged(Pageable pageable){
        Page <Inspecao_Acustica_Local> list=repository.findAll(pageable);
        return list.map(x -> new Inspecao_Acustica_LocalDTO(x));
    }

	
	@Transactional (readOnly = true)
	public Inspecao_Acustica_LocalDTO findById(Long ial_codigo) {
		Optional<Inspecao_Acustica_Local> obj = repository.findById(ial_codigo);
		Inspecao_Acustica_Local entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new Inspecao_Acustica_LocalDTO(entity);
	}
	
	@Transactional
	public Inspecao_Acustica_LocalDTO insert(Inspecao_Acustica_LocalDTO dto) {
		Inspecao_Acustica_Local entity = new Inspecao_Acustica_Local();
		entity.setIal_descricao(dto.getIal_descricao());
		entity.setIal_status(dto.getIal_status());
		entity.setIal_fk_set_codigo(dto.getIal_fk_set_codigo());
		entity = repository.save(entity);
		return new Inspecao_Acustica_LocalDTO(entity);	
	}
	
	@Transactional
	public Inspecao_Acustica_LocalDTO update(Long ial_codigo, Inspecao_Acustica_LocalDTO dto) {
		try {
			Inspecao_Acustica_Local entity = repository.getOne(ial_codigo);
			entity.setIal_descricao(dto.getIal_descricao());
			entity.setIal_status(dto.getIal_status());
			entity.setIal_fk_set_codigo(dto.getIal_fk_set_codigo());
			entity = repository.save(entity);
			return new Inspecao_Acustica_LocalDTO(entity);
		}
		catch(EntityNotFoundException e) {
		throw new  ResourceNotFoundException("Id not Found" + ial_codigo);
		}
	}

	public void delete(Long ial_codigo) {
		try {
		repository.deleteById(ial_codigo);
		}
		catch(EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException ("Id Not Found Exception");
		}
		catch (DataIntegrityViolationException e) {
			throw new DataBaseException("Integity Violation");
		}
	}

}

