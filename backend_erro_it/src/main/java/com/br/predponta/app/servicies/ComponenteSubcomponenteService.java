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

import com.br.predponta.app.dto.ComponenteSubcomponenteDTO;
import com.br.predponta.app.entities.SubComponente;
import com.br.predponta.app.entities.ComponenteSubcomponente;

import com.br.predponta.app.repositories.SubComponenteRepository;
import com.br.predponta.app.repositories.ComponenteSubcomponenteRepository;
import com.br.predponta.app.servicies.exceptions.DataBaseException;
import com.br.predponta.app.servicies.exceptions.ResourceNotFoundException;


@Service
public class ComponenteSubcomponenteService {
	
	
	@Autowired
	private  ComponenteSubcomponenteRepository repository;
	@Autowired
    private SubComponenteRepository subComponenteRepository;
	
	@Transactional (readOnly= true)
	public List <ComponenteSubcomponenteDTO> findAll(){
		List<ComponenteSubcomponente> list =repository.findAll();
		return list.stream().map(x -> new  ComponenteSubcomponenteDTO(x)).collect(Collectors.toList());
	}
	
		
	@Transactional (readOnly = true)
    public Page<ComponenteSubcomponenteDTO> findAllPaged(Pageable pageable){
        Page <ComponenteSubcomponente> list=repository.findAll(pageable);
        return list.map(x -> new  ComponenteSubcomponenteDTO(x));
    }
	
	@Transactional (readOnly = true)
	public  ComponenteSubcomponenteDTO findById(Integer cscCodigo) {
		Optional< ComponenteSubcomponente> obj = repository.findById(cscCodigo);
		 ComponenteSubcomponente entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new  ComponenteSubcomponenteDTO(entity);
	}
	
	@Transactional
	public  ComponenteSubcomponenteDTO insert( ComponenteSubcomponenteDTO dto) {
		 ComponenteSubcomponente entity = new  ComponenteSubcomponente();
   
         entity.setCscCodigo(dto.getCscCodigo());
         entity.setCscDescricao(dto.getCscDescricao());
  
		 SubComponente subComponente = subComponenteRepository.getOne(dto.getSubComponente());
         entity.setSubComponente(subComponente);
         
		 entity = repository.save(entity);
		 		return new  ComponenteSubcomponenteDTO(entity);	
	}
	
	@Transactional
	public  ComponenteSubcomponenteDTO update(Integer cscCodigo,  ComponenteSubcomponenteDTO dto) {
		try {
			 ComponenteSubcomponente entity = repository.getOne(cscCodigo);
			 
	         entity.setCscCodigo(dto.getCscCodigo());
	         entity.setCscDescricao(dto.getCscDescricao());
	  
			 SubComponente subComponente = subComponenteRepository.getOne(dto.getSubComponente());
	         entity.setSubComponente(subComponente);  
			 
			 entity = repository.save(entity);
					return new  ComponenteSubcomponenteDTO(entity);
		}
		catch(EntityNotFoundException e) {
		throw new  ResourceNotFoundException("Id not Found" + cscCodigo);
		}
	}

	public void delete(Integer cscCodigo) {
		try {
		repository.deleteById(cscCodigo);
		}
		catch(EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException ("Id Not Found Exception");
		}
		catch (DataIntegrityViolationException e) {
			throw new DataBaseException("Integity Violation");
		}
	}
}

