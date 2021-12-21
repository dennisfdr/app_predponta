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

import com.br.predponta.app.dto.ComponentePecaDTO;
import com.br.predponta.app.entities.Componente;
import com.br.predponta.app.entities.ComponentePeca;

import com.br.predponta.app.repositories.ComponenteRepository;
import com.br.predponta.app.repositories.ComponentePecaRepository;
import com.br.predponta.app.servicies.exceptions.DataBaseException;
import com.br.predponta.app.servicies.exceptions.ResourceNotFoundException;


@Service
public class ComponentePecaService {
	
	
	@Autowired
	private  ComponentePecaRepository repository;
	@Autowired
    private ComponenteRepository componenteRepository;
	
	@Transactional (readOnly= true)
	public List <ComponentePecaDTO> findAll(){
		List<ComponentePeca> list =repository.findAll();
		return list.stream().map(x -> new  ComponentePecaDTO(x)).collect(Collectors.toList());
	}
	
		
	@Transactional (readOnly = true)
    public Page<ComponentePecaDTO> findAllPaged(Pageable pageable){
        Page <ComponentePeca> list=repository.findAll(pageable);
        return list.map(x -> new  ComponentePecaDTO(x));
    }
	
	@Transactional (readOnly = true)
	public  ComponentePecaDTO findById(Integer copCodigo) {
		Optional< ComponentePeca> obj = repository.findById(copCodigo);
		 ComponentePeca entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new  ComponentePecaDTO(entity);
	}
	
	@Transactional
	public  ComponentePecaDTO insert( ComponentePecaDTO dto) {
		 ComponentePeca entity = new  ComponentePeca();
            
         entity.setCopCodigo(dto.getCopCodigo());
         entity.setCopDescricao(dto.getCopDescricao());
         entity.setCopStatus(dto.getCopStatus());
  
		 Componente componente = componenteRepository.getOne(dto.getComponente());
         entity.setComponente(componente); 
         
		 entity = repository.save(entity);
		 		return new  ComponentePecaDTO(entity);	
	}
	
	@Transactional
	public  ComponentePecaDTO update(Integer copCodigo,  ComponentePecaDTO dto) {
		try {
			 ComponentePeca entity = repository.getOne(copCodigo);
			 
	         entity.setCopCodigo(dto.getCopCodigo());
	         entity.setCopDescricao(dto.getCopDescricao());
	         entity.setCopStatus(dto.getCopStatus());
	  
			 Componente componente = componenteRepository.getOne(dto.getComponente());
	         entity.setComponente(componente);  
			 
			 entity = repository.save(entity);
					return new  ComponentePecaDTO(entity);
		}
		catch(EntityNotFoundException e) {
		throw new  ResourceNotFoundException("Id not Found" + copCodigo);
		}
	}

	public void delete(Integer copCodigo) {
		try {
		repository.deleteById(copCodigo);
		}
		catch(EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException ("Id Not Found Exception");
		}
		catch (DataIntegrityViolationException e) {
			throw new DataBaseException("Integity Violation");
		}
	}
}

