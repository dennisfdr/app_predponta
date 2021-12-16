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

import com.br.predponta.app.dto.ArquivoUploadDTO;
import com.br.predponta.app.entities.ArquivoUpload;
import com.br.predponta.app.repositories.ArquivoUploadRepository;

import com.br.predponta.app.servicies.exceptions.DataBaseException;
import com.br.predponta.app.servicies.exceptions.ResourceNotFoundException;


@Service
public class ArquivoUploadService {
	
	
	@Autowired
	private  ArquivoUploadRepository repository;
	
	@Transactional (readOnly= true)
	public List <ArquivoUploadDTO> findAll(){
		List<ArquivoUpload> list =repository.findAll();
		return list.stream().map(x -> new  ArquivoUploadDTO(x)).collect(Collectors.toList());
	}
	
		
	@Transactional (readOnly = true)
    public Page<ArquivoUploadDTO> findAllPaged(Pageable pageable){
        Page <ArquivoUpload> list=repository.findAll(pageable);
        return list.map(x -> new  ArquivoUploadDTO(x));
    }

	
	@Transactional (readOnly = true)
	public  ArquivoUploadDTO findById(Integer aruCodigo) {
		Optional<ArquivoUpload> obj = repository.findById(aruCodigo);
		 ArquivoUpload entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new  ArquivoUploadDTO(entity);
	}
	
	@Transactional
	public  ArquivoUploadDTO insert( ArquivoUploadDTO dto) {
		 ArquivoUpload entity = new  ArquivoUpload();
		 
		 entity.setAruArquivo(dto.getAruArquivo());
		 entity.setAruCodigo(dto.getAruCodigo());
		 entity.setAruDescricao(dto.getAruDescricao());
		 entity.setAruNomeOriginalArquivo(dto.getAruNomeOriginalArquivo());
		 entity.setAruData(dto.getAruData());
		 entity.setEmpresaEmpCodigo(dto.getEmpresaEmpCodigo());
				
		entity = repository.save(entity);
		return new  ArquivoUploadDTO(entity);	
	}
	
	@Transactional
	public  ArquivoUploadDTO update(Integer aruCodigo,  ArquivoUploadDTO dto) {
		try {
			 ArquivoUpload entity = repository.getOne(aruCodigo);
			 
			 entity.setAruArquivo(dto.getAruArquivo());
			 entity.setAruCodigo(dto.getAruCodigo());
			 entity.setAruDescricao(dto.getAruDescricao());
			 entity.setAruNomeOriginalArquivo(dto.getAruNomeOriginalArquivo());
			 entity.setAruData(dto.getAruData());
			 entity.setEmpresaEmpCodigo(dto.getEmpresaEmpCodigo());
			
			entity = repository.save(entity);
						return new  ArquivoUploadDTO(entity);
		}
		catch(EntityNotFoundException e) {
		throw new  ResourceNotFoundException("Id not Found" + aruCodigo);
		}
	}

	public void delete(Integer aruCodigo) {
		try {
		repository.deleteById(aruCodigo);
		}
		catch(EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException ("Id Not Found Exception");
		}
		catch (DataIntegrityViolationException e) {
			throw new DataBaseException("Integity Violation");
		}
	}

}

