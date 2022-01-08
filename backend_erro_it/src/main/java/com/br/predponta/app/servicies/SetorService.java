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

import com.br.predponta.app.dto.SetorDTO;
import com.br.predponta.app.entities.Empresa;
import com.br.predponta.app.entities.Setor;
import com.br.predponta.app.repositories.SetorRepository;
import com.br.predponta.app.repositories.EmpresaRepository;
import com.br.predponta.app.servicies.exceptions.DataBaseException;
import com.br.predponta.app.servicies.exceptions.ResourceNotFoundException;

@Service
public class SetorService {

	@Autowired
	private SetorRepository repository;
	@Autowired
	private EmpresaRepository empresaRepository;

	@Transactional(readOnly = true)
	public List<SetorDTO> findAll() {
		List<Setor> list = repository.findAll();
		return list.stream().map(x -> new SetorDTO(x)).collect(Collectors.toList());
	}

	@Transactional(readOnly = true)
	public Page<SetorDTO> findAllPaged(Pageable pageable) {
		Page<Setor> list = repository.findAll(pageable);
		return list.map(x -> new SetorDTO(x));
	}

	@Transactional(readOnly = true)
	public SetorDTO findById(Integer setCodigo) {
		Optional<Setor> obj = repository.findById(setCodigo);
		Setor entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new SetorDTO(entity);
	}

	@Transactional
	public SetorDTO insert(SetorDTO dto) {
		Setor entity = new Setor();

		entity.setSetCodigo(dto.getSetCodigo());
		entity.setSetNome(dto.getSetNome());;
		entity.setSetStatus(dto.getSetStatus());

		Empresa empresa = empresaRepository.getOne(dto.getEmpresaempCodigo());
		entity.setEmpresa(empresa);

		entity = repository.save(entity);
		return new SetorDTO(entity);
	}

	@Transactional
	public SetorDTO update(Integer setCodigo, SetorDTO dto) {
		try {
			Setor entity = repository.getOne(setCodigo);

			entity.setSetCodigo(dto.getSetCodigo());
			entity.setSetNome(dto.getSetNome());;
			entity.setSetStatus(dto.getSetStatus());
			
			Empresa empresa = empresaRepository.getOne(dto.getEmpresaempCodigo());
			entity.setEmpresa(empresa);

			entity = repository.save(entity);
			return new SetorDTO(entity);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not Found" + setCodigo);
		}
	}

	public void delete(Integer setCodigo) {
		try {
			repository.deleteById(setCodigo);
		} catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Id Not Found Exception");
		} catch (DataIntegrityViolationException e) {
			throw new DataBaseException("Integity Violation");
		}
	}
}
