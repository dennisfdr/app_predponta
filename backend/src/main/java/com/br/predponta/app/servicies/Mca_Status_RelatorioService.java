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

import com.br.predponta.app.dto.Mca_Status_RelatorioDTO;
import com.br.predponta.app.entities.Mca_Status_Relatorio;

import com.br.predponta.app.repositories.Mca_Status_RelatorioRepository;
import com.br.predponta.app.servicies.exceptions.DataBaseException;
import com.br.predponta.app.servicies.exceptions.ResourceNotFoundException;


@Service
public class Mca_Status_RelatorioService {
	
	
	@Autowired
	private Mca_Status_RelatorioRepository repository;
	
	@Transactional (readOnly= true)
	public List <Mca_Status_RelatorioDTO> findAll(){
		List<Mca_Status_Relatorio> list =repository.findAll();
		return list.stream().map(x -> new Mca_Status_RelatorioDTO(x)).collect(Collectors.toList());
	}
	
	
	
	@Transactional (readOnly = true)
    public Page<Mca_Status_RelatorioDTO> findAllPaged(Pageable pageable){
        Page <Mca_Status_Relatorio> list=repository.findAll(pageable);
        return list.map(x -> new Mca_Status_RelatorioDTO(x));
    }

	
	@Transactional (readOnly = true)
	public Mca_Status_RelatorioDTO findById(Long mcasr_codigo) {
		Optional<Mca_Status_Relatorio> obj = repository.findById(mcasr_codigo);
		Mca_Status_Relatorio entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new Mca_Status_RelatorioDTO(entity);
	}
	
	@Transactional
	public Mca_Status_RelatorioDTO insert(Mca_Status_RelatorioDTO dto) {
		Mca_Status_Relatorio entity = new Mca_Status_Relatorio();
		entity.setMcasr_descricao(dto.getMcasr_descricao());
		entity.setMcasr_cor(dto.getMcasr_cor());
		entity.setFal_codigo(dto.getFal_codigo());
		entity.setFal_descricao(dto.getFal_descricao());
		entity = repository.save(entity);
		return new Mca_Status_RelatorioDTO(entity);	
	}
	
	@Transactional
	public Mca_Status_RelatorioDTO update(Long mcasr_codigo, Mca_Status_RelatorioDTO dto) {
		try {
			Mca_Status_Relatorio entity = repository.getOne(mcasr_codigo);
			entity.setMcasr_descricao(dto.getMcasr_descricao());
			entity.setMcasr_cor(dto.getMcasr_cor());
			entity.setFal_codigo(dto.getFal_codigo());
			entity.setFal_descricao(dto.getFal_descricao());
			entity = repository.save(entity);
			return new Mca_Status_RelatorioDTO(entity);
		}
		catch(EntityNotFoundException e) {
		throw new  ResourceNotFoundException("Id not Found" + mcasr_codigo);
		}
	}

	public void delete(Long mcasr_codigo) {
		try {
		repository.deleteById(mcasr_codigo);
		}
		catch(EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException ("Id Not Found Exception");
		}
		catch (DataIntegrityViolationException e) {
			throw new DataBaseException("Integity Violation");
		}
	}

}

