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
import com.br.predponta.app.entities.Medicao;
import com.br.predponta.app.entities.Equipamento;
import com.br.predponta.app.repositories.EquipamentoRepository;
import com.br.predponta.app.repositories.MedicaoRepository;
import com.br.predponta.app.servicies.exceptions.DataBaseException;
import com.br.predponta.app.servicies.exceptions.ResourceNotFoundException;

@Service
public class EquipamentoService {

	@Autowired
	private EquipamentoRepository repository;
	@Autowired
	private MedicaoRepository medicaoRepository;

	@Transactional(readOnly = true)
	public List<EquipamentoDTO> findAll() {
		List<Equipamento> list = repository.findAll();
		return list.stream().map(x -> new EquipamentoDTO(x)).collect(Collectors.toList());
	}

	@Transactional(readOnly = true)
	public Page<EquipamentoDTO> findAllPaged(Pageable pageable) {
		Page<Equipamento> list = repository.findAll(pageable);
		return list.map(x -> new EquipamentoDTO(x));
	}

	@Transactional(readOnly = true)
	public EquipamentoDTO findById(Integer equCodigo) {
		Optional<Equipamento> obj = repository.findById(equCodigo);
		Equipamento entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new EquipamentoDTO(entity);
	}

	@Transactional
	public EquipamentoDTO insert(EquipamentoDTO dto) {
		Equipamento entity = new Equipamento();

		entity.setEquCodigo(dto.getEquCodigo());
		entity.setEquDescricao(dto.getEquDescricao());
		entity.setEquArquivoHtml(dto.getEquArquivoHtml());
		entity.setEquRi(dto.getEquRi());
		entity.setEquIt(dto.getEquIt());
		entity.setEquLaboratorio(dto.getEquLaboratorio());
		entity.setEquNumeroCertificado(dto.getEquNumeroCertificado());
		entity.setEquDataCalibracao(dto.getEquDataCalibracao());
		entity.setEquProximaCalibracao(dto.getEquProximaCalibracao());


		Medicao medicao = medicaoRepository.getOne(dto.getMedicaomedCodigo());
		entity.setMedicao(medicao);

		entity = repository.save(entity);
		return new EquipamentoDTO(entity);
	}

	@Transactional
	public EquipamentoDTO update(Integer equCodigo, EquipamentoDTO dto) {
		try {
			Equipamento entity = repository.getOne(equCodigo);

			entity.setEquCodigo(dto.getEquCodigo());
			entity.setEquDescricao(dto.getEquDescricao());
			entity.setEquArquivoHtml(dto.getEquArquivoHtml());
			entity.setEquRi(dto.getEquRi());
			entity.setEquIt(dto.getEquIt());
			entity.setEquLaboratorio(dto.getEquLaboratorio());
			entity.setEquNumeroCertificado(dto.getEquNumeroCertificado());
			entity.setEquDataCalibracao(dto.getEquDataCalibracao());
			entity.setEquProximaCalibracao(dto.getEquProximaCalibracao());


			Medicao medicao = medicaoRepository.getOne(dto.getMedicaomedCodigo());
			entity.setMedicao(medicao);

			entity = repository.save(entity);
			return new EquipamentoDTO(entity);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not Found" + equCodigo);
		}
	}

	public void delete(Integer equCodigo) {
		try {
			repository.deleteById(equCodigo);
		} catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Id Not Found Exception");
		} catch (DataIntegrityViolationException e) {
			throw new DataBaseException("Integity Violation");
		}
	}
}
