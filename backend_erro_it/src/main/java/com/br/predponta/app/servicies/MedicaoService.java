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

import com.br.predponta.app.dto.MedicaoDTO;
import com.br.predponta.app.entities.Componente;
import com.br.predponta.app.entities.Medicao;

import com.br.predponta.app.repositories.ComponenteRepository;
import com.br.predponta.app.repositories.MedicaoRepository;
import com.br.predponta.app.servicies.exceptions.DataBaseException;
import com.br.predponta.app.servicies.exceptions.ResourceNotFoundException;


@Service
public class MedicaoService {
	
	
	@Autowired
	private  MedicaoRepository repository;
	@Autowired
    private ComponenteRepository componenteRepository;
	
	@Transactional (readOnly= true)
	public List <MedicaoDTO> findAll(){
		List<Medicao> list =repository.findAll();
		return list.stream().map(x -> new  MedicaoDTO(x)).collect(Collectors.toList());
	}
	
		
	@Transactional (readOnly = true)
    public Page<MedicaoDTO> findAllPaged(Pageable pageable){
        Page <Medicao> list=repository.findAll(pageable);
        return list.map(x -> new  MedicaoDTO(x));
    }
	
	@Transactional (readOnly = true)
	public  MedicaoDTO findById(Integer medCodigo) {
		Optional< Medicao> obj = repository.findById(medCodigo);
		 Medicao entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new  MedicaoDTO(entity);
	}
	
	@Transactional
	public  MedicaoDTO insert( MedicaoDTO dto) {
		 Medicao entity = new  Medicao();
   
         entity.setMedCodigo(dto.getMedCodigo());
         entity.setMedData(dto.getMedData());

		 Componente componente = componenteRepository.getOne(dto.getComponente());
         entity.setComponente(componente); 
         
		 entity = repository.save(entity);
		 		return new  MedicaoDTO(entity);	
	}
	
	@Transactional
	public  MedicaoDTO update(Integer medCodigo,  MedicaoDTO dto) {
		try {
			 Medicao entity = repository.getOne(medCodigo);
			 
	         entity.setMedCodigo(dto.getMedCodigo());
	         entity.setMedData(dto.getMedData());

			 Componente componente = componenteRepository.getOne(dto.getComponente());
	         entity.setComponente(componente); 
			 
			 entity = repository.save(entity);
					return new  MedicaoDTO(entity);
		}
		catch(EntityNotFoundException e) {
		throw new  ResourceNotFoundException("Id not Found" + medCodigo);
		}
	}

	public void delete(Integer medCodigo) {
		try {
		repository.deleteById(medCodigo);
		}
		catch(EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException ("Id Not Found Exception");
		}
		catch (DataIntegrityViolationException e) {
			throw new DataBaseException("Integity Violation");
		}
	}
}

