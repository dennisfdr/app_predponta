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

import com.br.predponta.app.dto.EmpresaDTO;
import com.br.predponta.app.entities.Empresa;
import com.br.predponta.app.repositories.EmpresaRepository;

import com.br.predponta.app.servicies.exceptions.DataBaseException;
import com.br.predponta.app.servicies.exceptions.ResourceNotFoundException;


@Service
public class EmpresaService {
	
	
	@Autowired
	private  EmpresaRepository repository;
	
	@Transactional (readOnly= true)
	public List <EmpresaDTO> findAll(){
		List<Empresa> list =repository.findAll();
		return list.stream().map(x -> new  EmpresaDTO(x)).collect(Collectors.toList());
	}
	
		
	@Transactional (readOnly = true)
    public Page<EmpresaDTO> findAllPaged(Pageable pageable){
        Page <Empresa> list=repository.findAll(pageable);
        return list.map(x -> new  EmpresaDTO(x));
    }
	
	@Transactional (readOnly = true)
	public  EmpresaDTO findById(Integer empCodigo) {
		Optional< Empresa> obj = repository.findById(empCodigo);
		 Empresa entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new  EmpresaDTO(entity);
	}
	
	@Transactional
	public  EmpresaDTO insert( EmpresaDTO dto) {
		 Empresa entity = new  Empresa();
		 
		 
		 entity.setEmpCodigo(dto.getEmpCodigo());
		 entity.setEmpNome(dto.getEmpNome());
		 entity.setEmpStatus(dto.getEmpStatus());
		 entity.setEmpLogo(dto.getEmpLogo());
		 entity.setEmpPeriodicidadeIt(dto.getEmpPeriodicidadeIt());
		 entity.setEmpPeriodicidadeRi(dto.getEmpPeriodicidadeRi());
		 entity.setEmpPeriodicidadeMca(dto.getEmpPeriodicidadeMca());
		 entity.setEmpProxMedicaoIt(dto.getEmpProxMedicaoIt());
		 entity.setEmpProxMedicaoRi(dto.getEmpProxMedicaoRi());
		 entity.setEmpProxMedicaoMca(dto.getEmpProxMedicaoMca());
		 
		//entity.setFalDescricao(dto.getFal_descricao());
				
		entity = repository.save(entity);
		return new  EmpresaDTO(entity);	
	}
	
	@Transactional
	public  EmpresaDTO update(Integer empCodigo,  EmpresaDTO dto) {
		try {
			 Empresa entity = repository.getOne(empCodigo);
			 
			 entity.setEmpCodigo(dto.getEmpCodigo());
			 entity.setEmpNome(dto.getEmpNome());
			 entity.setEmpStatus(dto.getEmpStatus());
			 entity.setEmpLogo(dto.getEmpLogo());
			 entity.setEmpPeriodicidadeIt(dto.getEmpPeriodicidadeIt());
			 entity.setEmpPeriodicidadeRi(dto.getEmpPeriodicidadeRi());
			 entity.setEmpPeriodicidadeMca(dto.getEmpPeriodicidadeMca());
			 entity.setEmpProxMedicaoIt(dto.getEmpProxMedicaoIt());
			 entity.setEmpProxMedicaoRi(dto.getEmpProxMedicaoRi());
			 entity.setEmpProxMedicaoMca(dto.getEmpProxMedicaoMca());
			 			 
			 // entity.setFalDescricao(dto.getFal_descricao());
			
			entity = repository.save(entity);
						return new  EmpresaDTO(entity);
		}
		catch(EntityNotFoundException e) {
		throw new  ResourceNotFoundException("Id not Found" + empCodigo);
		}
	}

	public void delete(Integer empCodigo) {
		try {
		repository.deleteById(empCodigo);
		}
		catch(EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException ("Id Not Found Exception");
		}
		catch (DataIntegrityViolationException e) {
			throw new DataBaseException("Integity Violation");
		}
	}

}

