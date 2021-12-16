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

import com.br.predponta.app.dto.EmpresaEmailDTO;
import com.br.predponta.app.entities.Empresa;
import com.br.predponta.app.entities.EmpresaEmail;
import com.br.predponta.app.repositories.EmpresaEmailRepository;
import com.br.predponta.app.repositories.EmpresaRepository;
import com.br.predponta.app.servicies.exceptions.DataBaseException;
import com.br.predponta.app.servicies.exceptions.ResourceNotFoundException;


@Service
public class EmpresaEmailService {
	
	
	@Autowired
	private  EmpresaEmailRepository repository;
	@Autowired
    private EmpresaRepository empresaRepository;
	
	@Transactional (readOnly= true)
	public List <EmpresaEmailDTO> findAll(){
		List<EmpresaEmail> list =repository.findAll();
		return list.stream().map(x -> new  EmpresaEmailDTO(x)).collect(Collectors.toList());
	}
	
		
	@Transactional (readOnly = true)
    public Page<EmpresaEmailDTO> findAllPaged(Pageable pageable){
        Page <EmpresaEmail> list=repository.findAll(pageable);
        return list.map(x -> new  EmpresaEmailDTO(x));
    }
	
	@Transactional (readOnly = true)
	public  EmpresaEmailDTO findById(Integer emeCodigo) {
		Optional< EmpresaEmail> obj = repository.findById(emeCodigo);
		 EmpresaEmail entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new  EmpresaEmailDTO(entity);
	}
	
	@Transactional
	public  EmpresaEmailDTO insert( EmpresaEmailDTO dto) {
		 EmpresaEmail entity = new  EmpresaEmail();
        
         entity.setEmeCodigo(dto.getEmeCodigo());
         entity.setEmeEmail(dto.getEmeEmail());
         entity.setEmeResponsavel(dto.getEmeResponsavel());   
          
         Empresa empresaEmpCodigo = empresaRepository.getOne(dto.getEmpresaEmpCodigo());
         entity.setEmpresaEmpCodigo(empresaEmpCodigo);

				
		entity = repository.save(entity);
		return new  EmpresaEmailDTO(entity);	
	}
	
	@Transactional
	public  EmpresaEmailDTO update(Integer emeCodigo,  EmpresaEmailDTO dto) {
		try {
			 EmpresaEmail entity = repository.getOne(emeCodigo);
			 
	         entity.setEmeCodigo(dto.getEmeCodigo());
	         entity.setEmeEmail(dto.getEmeEmail());
	         entity.setEmeResponsavel(dto.getEmeResponsavel());
			 			 
			 // entity.setFalDescricao(dto.getFal_descricao());
			
			entity = repository.save(entity);
						return new  EmpresaEmailDTO(entity);
		}
		catch(EntityNotFoundException e) {
		throw new  ResourceNotFoundException("Id not Found" + emeCodigo);
		}
	}

	public void delete(Integer emeCodigo) {
		try {
		repository.deleteById(emeCodigo);
		}
		catch(EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException ("Id Not Found Exception");
		}
		catch (DataIntegrityViolationException e) {
			throw new DataBaseException("Integity Violation");
		}
	}
	


	public EmpresaRepository getEmpresaRepository() {
		return empresaRepository;
	}


	public void setEmpresaRepository(EmpresaRepository empresaRepository) {
		this.empresaRepository = empresaRepository;
	}

}

