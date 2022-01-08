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

import com.br.predponta.app.dto.HistoricoComponenteDTO;
import com.br.predponta.app.entities.Componente;
import com.br.predponta.app.entities.HistoricoComponente;

import com.br.predponta.app.repositories.ComponenteRepository;
import com.br.predponta.app.repositories.HistoricoComponenteRepository;
import com.br.predponta.app.servicies.exceptions.DataBaseException;
import com.br.predponta.app.servicies.exceptions.ResourceNotFoundException;


@Service
public class HistoricoComponenteService {
	
	
	@Autowired
	private  HistoricoComponenteRepository repository;
	@Autowired
    private ComponenteRepository componenteRepository;
	
	@Transactional (readOnly= true)
	public List <HistoricoComponenteDTO> findAll(){
		List<HistoricoComponente> list =repository.findAll();
		return list.stream().map(x -> new  HistoricoComponenteDTO(x)).collect(Collectors.toList());
	}
	
		
	@Transactional (readOnly = true)
    public Page<HistoricoComponenteDTO> findAllPaged(Pageable pageable){
        Page <HistoricoComponente> list=repository.findAll(pageable);
        return list.map(x -> new  HistoricoComponenteDTO(x));
    }
	
	@Transactional (readOnly = true)
	public  HistoricoComponenteDTO findById(Integer hcoCodigo) {
		Optional< HistoricoComponente> obj = repository.findById(hcoCodigo);
		 HistoricoComponente entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new  HistoricoComponenteDTO(entity);
	}
	
	@Transactional
	public  HistoricoComponenteDTO insert( HistoricoComponenteDTO dto) {
		 HistoricoComponente entity = new  HistoricoComponente();
       
         entity.setHcoCodigo(dto.getHcoCodigo());
         entity.setHcoObservacao(dto.getHcoObservacao());
         entity.setHcoOrdemServico(dto.getHcoOrdemServico());
  
		 Componente componente = componenteRepository.getOne(dto.getComponente());
         entity.setComponente(componente); 
         
		 entity = repository.save(entity);
		 		return new  HistoricoComponenteDTO(entity);	
	}
	
	@Transactional
	public  HistoricoComponenteDTO update(Integer hcoCodigo,  HistoricoComponenteDTO dto) {
		try {
			 HistoricoComponente entity = repository.getOne(hcoCodigo);
			 
	         entity.setHcoCodigo(dto.getHcoCodigo());
	         entity.setHcoObservacao(dto.getHcoObservacao());
	         entity.setHcoOrdemServico(dto.getHcoOrdemServico());
	  
			 Componente componente = componenteRepository.getOne(dto.getComponente());
	         entity.setComponente(componente);  
			 
			 entity = repository.save(entity);
					return new  HistoricoComponenteDTO(entity);
		}
		catch(EntityNotFoundException e) {
		throw new  ResourceNotFoundException("Id not Found" + hcoCodigo);
		}
	}

	public void delete(Integer hcoCodigo) {
		try {
		repository.deleteById(hcoCodigo);
		}
		catch(EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException ("Id Not Found Exception");
		}
		catch (DataIntegrityViolationException e) {
			throw new DataBaseException("Integity Violation");
		}
	}
}

