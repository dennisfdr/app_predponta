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

import com.br.predponta.app.dto.ComponenteDTO;
import com.br.predponta.app.entities.Componente;

import com.br.predponta.app.entities.MaquinaEquipamento;

import com.br.predponta.app.repositories.ComponenteRepository;
import com.br.predponta.app.repositories.MaquinaEquipamentoRepository;
import com.br.predponta.app.servicies.exceptions.DataBaseException;
import com.br.predponta.app.servicies.exceptions.ResourceNotFoundException;


@Service
public class ComponenteService {
	
	
	@Autowired
	private  ComponenteRepository repository;
	@Autowired
    private MaquinaEquipamentoRepository maquinaequipamentoMAECODIGORepository;
	
	@Transactional (readOnly= true)
	public List <ComponenteDTO> findAll(){
		List<Componente> list =repository.findAll();
		return list.stream().map(x -> new  ComponenteDTO(x)).collect(Collectors.toList());
	}
	
		
	@Transactional (readOnly = true)
    public Page<ComponenteDTO> findAllPaged(Pageable pageable){
        Page <Componente> list=repository.findAll(pageable);
        return list.map(x -> new  ComponenteDTO(x));
    }
	
	@Transactional (readOnly = true)
	public  ComponenteDTO findById(Integer comCodigo) {
		Optional< Componente> obj = repository.findById(comCodigo);
		 Componente entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new  ComponenteDTO(entity);
	}
	
	@Transactional
	public  ComponenteDTO insert( ComponenteDTO dto) {
		 Componente entity = new  Componente();
        
         entity.setComCodigo(dto.getComCodigo());
         entity.setComNome(dto.getComNome());
         entity.setComStatus(dto.getComStatus());
  
         MaquinaEquipamento maquinaequipamentoMAECODIGO = maquinaequipamentoMAECODIGORepository.getOne(dto.getMaquinaequipamentoMAECODIGO());
         entity.setMaquinaequipamentoMAECODIGO(maquinaequipamentoMAECODIGO); 
         
		entity = repository.save(entity);
		return new  ComponenteDTO(entity);	
	}
	
	@Transactional
	public  ComponenteDTO update(Integer comCodigo,  ComponenteDTO dto) {
		try {
			 Componente entity = repository.getOne(comCodigo);
			 
	         entity.setComCodigo(dto.getComCodigo());
	         entity.setComNome(dto.getComNome());
	         entity.setComStatus(dto.getComStatus());
	  
	         MaquinaEquipamento maquinaequipamentoMAECODIGO = maquinaequipamentoMAECODIGORepository.getOne(dto.getMaquinaequipamentoMAECODIGO());
	         entity.setMaquinaequipamentoMAECODIGO(maquinaequipamentoMAECODIGO); 
			 
			entity = repository.save(entity);
						return new  ComponenteDTO(entity);
		}
		catch(EntityNotFoundException e) {
		throw new  ResourceNotFoundException("Id not Found" + comCodigo);
		}
	}

	public void delete(Integer comCodigo) {
		try {
		repository.deleteById(comCodigo);
		}
		catch(EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException ("Id Not Found Exception");
		}
		catch (DataIntegrityViolationException e) {
			throw new DataBaseException("Integity Violation");
		}
	}
}

