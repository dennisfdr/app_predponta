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

import com.br.predponta.app.dto.SubComponenteDTO;
import com.br.predponta.app.entities.ComponentePeca;
import com.br.predponta.app.entities.SubComponente;

import com.br.predponta.app.repositories.ComponentePecaRepository;
import com.br.predponta.app.repositories.SubComponenteRepository;
import com.br.predponta.app.servicies.exceptions.DataBaseException;
import com.br.predponta.app.servicies.exceptions.ResourceNotFoundException;


@Service
public class SubComponenteService {
	
	
	@Autowired
	private  SubComponenteRepository repository;
	@Autowired
    private ComponentePecaRepository componentePecaRepository;
	
	@Transactional (readOnly= true)
	public List <SubComponenteDTO> findAll(){
		List<SubComponente> list =repository.findAll();
		return list.stream().map(x -> new  SubComponenteDTO(x)).collect(Collectors.toList());
	}
	
		
	@Transactional (readOnly = true)
    public Page<SubComponenteDTO> findAllPaged(Pageable pageable){
        Page <SubComponente> list=repository.findAll(pageable);
        return list.map(x -> new  SubComponenteDTO(x));
    }
	
	@Transactional (readOnly = true)
	public  SubComponenteDTO findById(Integer scoCodigo) {
		Optional< SubComponente> obj = repository.findById(scoCodigo);
		 SubComponente entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new  SubComponenteDTO(entity);
	}
	
	@Transactional
	public  SubComponenteDTO insert( SubComponenteDTO dto) {
		 SubComponente entity = new  SubComponente();
   
         entity.setScoCodigo(dto.getScoCodigo());
         entity.setScoNome(dto.getScoNome());
         entity.setScoStatus(dto.getScoStatus());
  
		 ComponentePeca componentePeca = componentePecaRepository.getOne(dto.getComponentePeca());
         entity.setComponentePeca(componentePeca);  
         
		 entity = repository.save(entity);
		 		return new  SubComponenteDTO(entity);	
	}
	
	@Transactional
	public  SubComponenteDTO update(Integer scoCodigo,  SubComponenteDTO dto) {
		try {
			 SubComponente entity = repository.getOne(scoCodigo);
			 
	         entity.setScoCodigo(dto.getScoCodigo());
	         entity.setScoNome(dto.getScoNome());
	         entity.setScoStatus(dto.getScoStatus());
	  
			 ComponentePeca componentePeca = componentePecaRepository.getOne(dto.getComponentePeca());
	         entity.setComponentePeca(componentePeca);  
			 
			 entity = repository.save(entity);
					return new  SubComponenteDTO(entity);
		}
		catch(EntityNotFoundException e) {
		throw new  ResourceNotFoundException("Id not Found" + scoCodigo);
		}
	}

	public void delete(Integer scoCodigo) {
		try {
		repository.deleteById(scoCodigo);
		}
		catch(EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException ("Id Not Found Exception");
		}
		catch (DataIntegrityViolationException e) {
			throw new DataBaseException("Integity Violation");
		}
	}
}

