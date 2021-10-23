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

import com.br.predponta.app.dto.Condicoes_AmbienteDTO;
import com.br.predponta.app.entities.Condicoes_Ambiente;

import com.br.predponta.app.repositories.Condicoes_AmbienteRepository;
import com.br.predponta.app.servicies.exceptions.DataBaseException;
import com.br.predponta.app.servicies.exceptions.ResourceNotFoundException;


@Service
public class Condicoes_AmbienteService {
	
	
	@Autowired
	private Condicoes_AmbienteRepository repository;
	
	@Transactional (readOnly= true)
	public List <Condicoes_AmbienteDTO> findAll(){
		List<Condicoes_Ambiente> list =repository.findAll();
		return list.stream().map(x -> new Condicoes_AmbienteDTO(x)).collect(Collectors.toList());
	}
	
	
	
	@Transactional (readOnly = true)
    public Page<Condicoes_AmbienteDTO> findAllPaged(Pageable pageable){
        Page <Condicoes_Ambiente> list=repository.findAll(pageable);
        return list.map(x -> new Condicoes_AmbienteDTO(x));
    }

	
	@Transactional (readOnly = true)
	public Condicoes_AmbienteDTO findById(Long cam_codigo) {
		Optional<Condicoes_Ambiente> obj = repository.findById(cam_codigo);
		Condicoes_Ambiente entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new Condicoes_AmbienteDTO(entity);
	}
	
	@Transactional
	public Condicoes_AmbienteDTO insert(Condicoes_AmbienteDTO dto) {
		Condicoes_Ambiente entity = new Condicoes_Ambiente();
		entity.setCam_fk_ite_codigo(dto.getCam_fk_ite_codigo());
		entity.setCam_fk_ite_codigo(dto.getCam_fk_ite_codigo());
		entity.setCam_temperatura(dto.getCam_temperatura());
		entity.setCam_carga(dto.getCam_carga());
		entity.setCam_ponto_termograma(dto.getCam_ponto_termograma());
		entity.setCam_emissividade(dto.getCam_emissividade());	
		entity = repository.save(entity);
		return new Condicoes_AmbienteDTO(entity);	
	}
	
	@Transactional
	public Condicoes_AmbienteDTO update(Long cam_codigo, Condicoes_AmbienteDTO dto) {
		try {
			Condicoes_Ambiente entity = repository.getOne(cam_codigo);
			entity.setCam_fk_ite_codigo(dto.getCam_fk_ite_codigo());
			entity.setCam_fk_ite_codigo(dto.getCam_fk_ite_codigo());
			entity.setCam_temperatura(dto.getCam_temperatura());
			entity.setCam_carga(dto.getCam_carga());
			entity.setCam_ponto_termograma(dto.getCam_ponto_termograma());
			entity.setCam_emissividade(dto.getCam_emissividade());	
			entity = repository.save(entity);
			return new Condicoes_AmbienteDTO(entity);
		}
		catch(EntityNotFoundException e) {
		throw new  ResourceNotFoundException("Id not Found" + cam_codigo);
		}
	}

	public void delete(Long cam_codigo) {
		try {
		repository.deleteById(cam_codigo);
		}
		catch(EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException ("Id Not Found Exception");
		}
		catch (DataIntegrityViolationException e) {
			throw new DataBaseException("Integity Violation");
		}
	}

}

