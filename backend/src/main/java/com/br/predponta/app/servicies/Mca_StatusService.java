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

import com.br.predponta.app.dto.Mca_StatusDTO;
import com.br.predponta.app.entities.Mca_Status;

import com.br.predponta.app.repositories.Mca_StatusRepository;
import com.br.predponta.app.servicies.exceptions.DataBaseException;
import com.br.predponta.app.servicies.exceptions.ResourceNotFoundException;


@Service
public class Mca_StatusService {
	
	
	@Autowired
	private Mca_StatusRepository repository;
	
	@Transactional (readOnly= true)
	public List <Mca_StatusDTO> findAll(){
		List<Mca_Status> list =repository.findAll();
		return list.stream().map(x -> new Mca_StatusDTO(x)).collect(Collectors.toList());
	}
	
	
	
	@Transactional (readOnly = true)
    public Page<Mca_StatusDTO> findAllPaged(Pageable pageable){
        Page <Mca_Status> list=repository.findAll(pageable);
        return list.map(x -> new Mca_StatusDTO(x));
    }

	
	@Transactional (readOnly = true)
	public Mca_StatusDTO findById(Long mcas_codigo) {
		Optional<Mca_Status> obj = repository.findById(mcas_codigo);
		Mca_Status entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new Mca_StatusDTO(entity);
	}
	
	@Transactional
	public Mca_StatusDTO insert(Mca_StatusDTO dto) {
		Mca_Status entity = new Mca_Status();
		entity.setMcasr_descricao(dto.getMcasr_descricao());
		entity.setMcasr_cor(dto.getMcasr_cor());
		entity = repository.save(entity);
		return new Mca_StatusDTO(entity);	
	}
	
	@Transactional
	public Mca_StatusDTO update(Long mcas_codigo, Mca_StatusDTO dto) {
		try {
			Mca_Status entity = repository.getOne(mcas_codigo);
			entity.setMcasr_descricao(dto.getMcasr_descricao());
			entity.setMcasr_cor(dto.getMcasr_cor());
			entity = repository.save(entity);
			return new Mca_StatusDTO(entity);
		}
		catch(EntityNotFoundException e) {
		throw new  ResourceNotFoundException("Id not Found" + mcas_codigo);
		}
	}

	public void delete(Long mcas_codigo) {
		try {
		repository.deleteById(mcas_codigo);
		}
		catch(EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException ("Id Not Found Exception");
		}
		catch (DataIntegrityViolationException e) {
			throw new DataBaseException("Integity Violation");
		}
	}

}

