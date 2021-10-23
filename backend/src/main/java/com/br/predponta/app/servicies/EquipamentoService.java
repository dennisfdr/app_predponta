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

import com.br.predponta.app.dto.EquipamentoDTO;
import com.br.predponta.app.entities.Equipamento;

import com.br.predponta.app.repositories.EquipamentoRepository;
import com.br.predponta.app.servicies.exceptions.DataBaseException;
import com.br.predponta.app.servicies.exceptions.ResourceNotFoundException;


@Service
public class EquipamentoService {
	
	
	@Autowired
	private EquipamentoRepository repository;
	
	@Transactional (readOnly= true)
	public List <EquipamentoDTO> findAll(){
		List<Equipamento> list =repository.findAll();
		return list.stream().map(x -> new EquipamentoDTO(x)).collect(Collectors.toList());
	}
	
	
	
	@Transactional (readOnly = true)
    public Page<EquipamentoDTO> findAllPaged(Pageable pageable){
        Page <Equipamento> list=repository.findAll(pageable);
        return list.map(x -> new EquipamentoDTO(x));
    }

	
	@Transactional (readOnly = true)
	public EquipamentoDTO findById(Long equ_codigo) {
		Optional<Equipamento> obj = repository.findById(equ_codigo);
		Equipamento entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new EquipamentoDTO(entity);
	}
	
	@Transactional
	public EquipamentoDTO insert(EquipamentoDTO dto) {
		Equipamento entity = new Equipamento();
		entity.setEqu_descricao(dto.getEqu_descricao());
		entity.setEqu_arquivo_html(dto.getEqu_arquivo_html());
		entity.setEqu_ri(dto.getEqu_ri());
		entity.setEqu_it(dto.getEqu_it());
		entity.setEqu_laboratorio(dto.getEqu_laboratorio());
		entity.setEqu_numero_certificado(dto.getEqu_numero_certificado());
		entity.setEqu_data_calibracao(dto.getEqu_data_calibracao());
		entity.setEqu_proxima_calibracao(dto.getEqu_proxima_calibracao());
		entity = repository.save(entity);
		return new EquipamentoDTO(entity);	
	}
	
	@Transactional
	public EquipamentoDTO update(Long equ_codigo, EquipamentoDTO dto) {
		try {
			Equipamento entity = repository.getOne(equ_codigo);
			entity.setEqu_descricao(dto.getEqu_descricao());
			entity.setEqu_descricao(dto.getEqu_descricao());
			entity.setEqu_arquivo_html(dto.getEqu_arquivo_html());
			entity.setEqu_ri(dto.getEqu_ri());
			entity.setEqu_it(dto.getEqu_it());
			entity.setEqu_laboratorio(dto.getEqu_laboratorio());
			entity.setEqu_numero_certificado(dto.getEqu_numero_certificado());
			entity.setEqu_data_calibracao(dto.getEqu_data_calibracao());
			entity.setEqu_proxima_calibracao(dto.getEqu_proxima_calibracao());
			entity = repository.save(entity);
			return new EquipamentoDTO(entity);
		}
		catch(EntityNotFoundException e) {
		throw new  ResourceNotFoundException("Id not Found" + equ_codigo);
		}
	}

	public void delete(Long equ_codigo) {
		try {
		repository.deleteById(equ_codigo);
		}
		catch(EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException ("Id Not Found Exception");
		}
		catch (DataIntegrityViolationException e) {
			throw new DataBaseException("Integity Violation");
		}
	}

}

