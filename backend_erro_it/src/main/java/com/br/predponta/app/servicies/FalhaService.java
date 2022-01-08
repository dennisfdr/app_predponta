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

import com.br.predponta.app.dto.FalhaDTO;
import com.br.predponta.app.entities.RelatorioIntervencao;
import com.br.predponta.app.entities.Falha;
import com.br.predponta.app.repositories.FalhaRepository;
import com.br.predponta.app.repositories.RelatorioIntervencaoRepository;
import com.br.predponta.app.servicies.exceptions.DataBaseException;
import com.br.predponta.app.servicies.exceptions.ResourceNotFoundException;

@Service
public class FalhaService {

	@Autowired
	private FalhaRepository repository;
	@Autowired
	private RelatorioIntervencaoRepository relatorioIntervencaoRepository;

	@Transactional(readOnly = true)
	public List<FalhaDTO> findAll() {
		List<Falha> list = repository.findAll();
		return list.stream().map(x -> new FalhaDTO(x)).collect(Collectors.toList());
	}

	@Transactional(readOnly = true)
	public Page<FalhaDTO> findAllPaged(Pageable pageable) {
		Page<Falha> list = repository.findAll(pageable);
		return list.map(x -> new FalhaDTO(x));
	}

	@Transactional(readOnly = true)
	public FalhaDTO findById(Integer falCodigo) {
		Optional<Falha> obj = repository.findById(falCodigo);
		Falha entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new FalhaDTO(entity);
	}

	@Transactional
	public FalhaDTO insert(FalhaDTO dto) {
		Falha entity = new Falha();

		entity.setFalCodigo(dto.getFalCodigo());
		entity.setFalDescricao(dto.getFalDescricao());

		RelatorioIntervencao relatorioIntervencao = relatorioIntervencaoRepository.getOne(dto.getRelatorioIntervencaoriCodigo());
		entity.setRelatorioIntervencao(relatorioIntervencao);

		entity = repository.save(entity);
		return new FalhaDTO(entity);
	}

	@Transactional
	public FalhaDTO update(Integer falCodigo, FalhaDTO dto) {
		try {
			Falha entity = repository.getOne(falCodigo);

			entity.setFalCodigo(dto.getFalCodigo());
			entity.setFalDescricao(dto.getFalDescricao());
			
			RelatorioIntervencao relatorioIntervencao = relatorioIntervencaoRepository.getOne(dto.getRelatorioIntervencaoriCodigo());
			entity.setRelatorioIntervencao(relatorioIntervencao);

			entity = repository.save(entity);
			return new FalhaDTO(entity);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not Found" + falCodigo);
		}
	}

	public void delete(Integer falCodigo) {
		try {
			repository.deleteById(falCodigo);
		} catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Id Not Found Exception");
		} catch (DataIntegrityViolationException e) {
			throw new DataBaseException("Integity Violation");
		}
	}
}
