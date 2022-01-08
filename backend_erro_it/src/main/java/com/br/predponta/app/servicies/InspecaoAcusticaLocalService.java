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

import com.br.predponta.app.dto.InspecaoAcusticaLocalDTO;
import com.br.predponta.app.entities.Medicao;
import com.br.predponta.app.entities.InspecaoAcusticaLocal;
import com.br.predponta.app.repositories.InspecaoAcusticaLocalRepository;
import com.br.predponta.app.repositories.MedicaoRepository;
import com.br.predponta.app.servicies.exceptions.DataBaseException;
import com.br.predponta.app.servicies.exceptions.ResourceNotFoundException;

@Service
public class InspecaoAcusticaLocalService {

	@Autowired
	private InspecaoAcusticaLocalRepository repository;
	@Autowired
	private MedicaoRepository medicaoRepository;

	@Transactional(readOnly = true)
	public List<InspecaoAcusticaLocalDTO> findAll() {
		List<InspecaoAcusticaLocal> list = repository.findAll();
		return list.stream().map(x -> new InspecaoAcusticaLocalDTO(x)).collect(Collectors.toList());
	}

	@Transactional(readOnly = true)
	public Page<InspecaoAcusticaLocalDTO> findAllPaged(Pageable pageable) {
		Page<InspecaoAcusticaLocal> list = repository.findAll(pageable);
		return list.map(x -> new InspecaoAcusticaLocalDTO(x));
	}

	@Transactional(readOnly = true)
	public InspecaoAcusticaLocalDTO findById(Integer ialCodigo) {
		Optional<InspecaoAcusticaLocal> obj = repository.findById(ialCodigo);
		InspecaoAcusticaLocal entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new InspecaoAcusticaLocalDTO(entity);
	}

	@Transactional
	public InspecaoAcusticaLocalDTO insert(InspecaoAcusticaLocalDTO dto) {
		InspecaoAcusticaLocal entity = new InspecaoAcusticaLocal();

		entity.setIalCodigo(dto.getIalCodigo());
		entity.setIalDescricao(dto.getIalDescricao());
		entity.setIalStatus(dto.getIalStatus());

		Medicao medicao = medicaoRepository.getOne(dto.getMedicaomedCodigo());
		entity.setMedicao(medicao);

		entity = repository.save(entity);
		return new InspecaoAcusticaLocalDTO(entity);
	}

	@Transactional
	public InspecaoAcusticaLocalDTO update(Integer ialCodigo, InspecaoAcusticaLocalDTO dto) {
		try {
			InspecaoAcusticaLocal entity = repository.getOne(ialCodigo);

			entity.setIalCodigo(dto.getIalCodigo());
			entity.setIalDescricao(dto.getIalDescricao());
			entity.setIalStatus(dto.getIalStatus());

			Medicao medicao = medicaoRepository.getOne(dto.getMedicaomedCodigo());
			entity.setMedicao(medicao);

			entity = repository.save(entity);
			return new InspecaoAcusticaLocalDTO(entity);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not Found" + ialCodigo);
		}
	}

	public void delete(Integer ialCodigo) {
		try {
			repository.deleteById(ialCodigo);
		} catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Id Not Found Exception");
		} catch (DataIntegrityViolationException e) {
			throw new DataBaseException("Integity Violation");
		}
	}
}
