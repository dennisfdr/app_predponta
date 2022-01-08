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

import com.br.predponta.app.dto.MaquinaDTO;
import com.br.predponta.app.entities.Maquina;
import com.br.predponta.app.entities.Setor;
import com.br.predponta.app.repositories.MaquinaRepository;
import com.br.predponta.app.repositories.SetorRepository;
import com.br.predponta.app.servicies.exceptions.DataBaseException;
import com.br.predponta.app.servicies.exceptions.ResourceNotFoundException;


@Service
public class MaquinaService {
	
	
	@Autowired
	private  MaquinaRepository repository;
	@Autowired
    private SetorRepository setorRepository;
	
	@Transactional (readOnly= true)
	public List <MaquinaDTO> findAll(){
		List<Maquina> list =repository.findAll();
		return list.stream().map(x -> new  MaquinaDTO(x)).collect(Collectors.toList());
	}
	
		
	@Transactional (readOnly = true)
    public Page<MaquinaDTO> findAllPaged(Pageable pageable){
        Page <Maquina> list=repository.findAll(pageable);
        return list.map(x -> new  MaquinaDTO(x));
    }
	
	@Transactional (readOnly = true)
	public  MaquinaDTO findById(Integer maqCodigo) {
		Optional< Maquina> obj = repository.findById(maqCodigo);
		 Maquina entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new  MaquinaDTO(entity);
	}
	
	@Transactional
	public  MaquinaDTO insert( MaquinaDTO dto) {
		 Maquina entity = new  Maquina();
        
         entity.setMaqCodigo(dto.getMaqCodigo());
         entity.setMaqNome(dto.getMaqNome());
         entity.setMaqAndar(dto.getMaqAndar());   
         entity.setMaqStatus(dto.getMaqStatus());
        
         Setor setor = setorRepository.getOne(dto.getSetorsetCodigo());
         entity.setSetor(setor);

         
		entity = repository.save(entity);
		return new  MaquinaDTO(entity);	
	}
	
	@Transactional
	public  MaquinaDTO update(Integer maqCodigo,  MaquinaDTO dto) {
		try {
			 Maquina entity = repository.getOne(maqCodigo);
			 
	         entity.setMaqCodigo(dto.getMaqCodigo());
	         entity.setMaqNome(dto.getMaqNome());
	         entity.setMaqAndar(dto.getMaqAndar());   
	         entity.setMaqStatus(dto.getMaqStatus());
	        
	         Setor setor = setorRepository.getOne(dto.getSetorsetCodigo());
	         entity.setSetor(setor);
			
			entity = repository.save(entity);
						return new  MaquinaDTO(entity);
		}
		catch(EntityNotFoundException e) {
		throw new  ResourceNotFoundException("Id not Found" + maqCodigo);
		}
	}

	public void delete(Integer maqCodigo) {
		try {
		repository.deleteById(maqCodigo);
		}
		catch(EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException ("Id Not Found Exception");
		}
		catch (DataIntegrityViolationException e) {
			throw new DataBaseException("Integity Violation");
		}
	}
}

