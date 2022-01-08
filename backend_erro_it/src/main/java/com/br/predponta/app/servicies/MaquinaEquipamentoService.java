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

import com.br.predponta.app.dto.MaquinaEquipamentoDTO;
import com.br.predponta.app.entities.Maquina;
import com.br.predponta.app.entities.MaquinaEquipamento;
import com.br.predponta.app.repositories.MaquinaEquipamentoRepository;
import com.br.predponta.app.repositories.MaquinaRepository;
import com.br.predponta.app.servicies.exceptions.DataBaseException;
import com.br.predponta.app.servicies.exceptions.ResourceNotFoundException;


@Service
public class MaquinaEquipamentoService {
	
	
	@Autowired
	private  MaquinaEquipamentoRepository repository;
	@Autowired
    private MaquinaRepository maquinaRepository;
	
	@Transactional (readOnly= true)
	public List <MaquinaEquipamentoDTO> findAll(){
		List<MaquinaEquipamento> list =repository.findAll();
		return list.stream().map(x -> new  MaquinaEquipamentoDTO(x)).collect(Collectors.toList());
	}
	
		
	@Transactional (readOnly = true)
    public Page<MaquinaEquipamentoDTO> findAllPaged(Pageable pageable){
        Page <MaquinaEquipamento> list=repository.findAll(pageable);
        return list.map(x -> new  MaquinaEquipamentoDTO(x));
    }
	
	@Transactional (readOnly = true)
	public  MaquinaEquipamentoDTO findById(Integer maeCodigo) {
		Optional< MaquinaEquipamento> obj = repository.findById(maeCodigo);
		 MaquinaEquipamento entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new  MaquinaEquipamentoDTO(entity);
	}
	
	@Transactional
	public  MaquinaEquipamentoDTO insert( MaquinaEquipamentoDTO dto) {
		 MaquinaEquipamento entity = new  MaquinaEquipamento();
        
         entity.setMaeCodigo(dto.getMaeCodigo());
         entity.setMaeNome(dto.getMaeNome());
         entity.setMaeTag(dto.getMaeTag());
         entity.setMaeStatus(dto.getMaeStatus());
         
         Maquina maquina = maquinaRepository.getOne(dto.getMaquinamaqCodigo());
         entity.setMaquina(maquina);
   
       
		entity = repository.save(entity);
		return new  MaquinaEquipamentoDTO(entity);	
	}
	
	@Transactional
	public  MaquinaEquipamentoDTO update(Integer maeCodigo,  MaquinaEquipamentoDTO dto) {
		try {
			 MaquinaEquipamento entity = repository.getOne(maeCodigo);
			 
	         entity.setMaeCodigo(dto.getMaeCodigo());
	         entity.setMaeCodigo(dto.getMaeCodigo());
	         entity.setMaeNome(dto.getMaeNome());
	         entity.setMaeTag(dto.getMaeTag());
	         entity.setMaeStatus(dto.getMaeStatus());
	        
	         Maquina maquina = maquinaRepository.getOne(dto.getMaquinamaqCodigo());
	         entity.setMaquina(maquina);
	   
			
			entity = repository.save(entity);
						return new  MaquinaEquipamentoDTO(entity);
		}
		catch(EntityNotFoundException e) {
		throw new  ResourceNotFoundException("Id not Found" + maeCodigo);
		}
	}

	public void delete(Integer maeCodigo) {
		try {
		repository.deleteById(maeCodigo);
		}
		catch(EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException ("Id Not Found Exception");
		}
		catch (DataIntegrityViolationException e) {
			throw new DataBaseException("Integity Violation");
		}
	}
}

