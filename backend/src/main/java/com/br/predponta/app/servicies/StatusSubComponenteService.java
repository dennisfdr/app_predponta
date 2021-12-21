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

import com.br.predponta.app.dto.StatusSubComponenteDTO;
import com.br.predponta.app.entities.Componente;
import com.br.predponta.app.entities.StatusSubComponente;

import com.br.predponta.app.repositories.ComponenteRepository;
import com.br.predponta.app.repositories.StatusSubComponenteRepository;
import com.br.predponta.app.servicies.exceptions.DataBaseException;
import com.br.predponta.app.servicies.exceptions.ResourceNotFoundException;


@Service
public class StatusSubComponenteService {
	
	
	@Autowired
	private  StatusSubComponenteRepository repository;
	@Autowired
    private ComponenteRepository componenteRepository;
	
	@Transactional (readOnly= true)
	public List <StatusSubComponenteDTO> findAll(){
		List<StatusSubComponente> list =repository.findAll();
		return list.stream().map(x -> new  StatusSubComponenteDTO(x)).collect(Collectors.toList());
	}
	
		
	@Transactional (readOnly = true)
    public Page<StatusSubComponenteDTO> findAllPaged(Pageable pageable){
        Page <StatusSubComponente> list=repository.findAll(pageable);
        return list.map(x -> new  StatusSubComponenteDTO(x));
    }
	
	@Transactional (readOnly = true)
	public  StatusSubComponenteDTO findById(Integer sscCodigo) {
		Optional< StatusSubComponente> obj = repository.findById(sscCodigo);
		 StatusSubComponente entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new  StatusSubComponenteDTO(entity);
	}
	
	@Transactional
	public  StatusSubComponenteDTO insert( StatusSubComponenteDTO dto) {
		 StatusSubComponente entity = new  StatusSubComponente();
   
         entity.setSscCodigo(dto.getSscCodigo());
         entity.setSscDescricao(dto.getSscDescricao());
         entity.setSscCor(dto.getSscCor());

		 Componente componente = componenteRepository.getOne(dto.getComponente());
         entity.setComponente(componente); 
         
		 entity = repository.save(entity);
		 		return new  StatusSubComponenteDTO(entity);	
	}
	
	@Transactional
	public  StatusSubComponenteDTO update(Integer sscCodigo,  StatusSubComponenteDTO dto) {
		try {
			 StatusSubComponente entity = repository.getOne(sscCodigo);
			 
	         entity.setSscCodigo(dto.getSscCodigo());
	         entity.setSscDescricao(dto.getSscDescricao());
	         entity.setSscCor(dto.getSscCor());
	  
			 Componente componente = componenteRepository.getOne(dto.getComponente());
	         entity.setComponente(componente);  
			 
			 entity = repository.save(entity);
					return new  StatusSubComponenteDTO(entity);
		}
		catch(EntityNotFoundException e) {
		throw new  ResourceNotFoundException("Id not Found" + sscCodigo);
		}
	}

	public void delete(Integer sscCodigo) {
		try {
		repository.deleteById(sscCodigo);
		}
		catch(EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException ("Id Not Found Exception");
		}
		catch (DataIntegrityViolationException e) {
			throw new DataBaseException("Integity Violation");
		}
	}
}

