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

import com.br.predponta.app.dto.CategoriaDTO;
import com.br.predponta.app.entities.Categoria;

import com.br.predponta.app.repositories.CategoriaRepository;
import com.br.predponta.app.servicies.exceptions.DataBaseException;
import com.br.predponta.app.servicies.exceptions.ResourceNotFoundException;


@Service
public class CategoriaService {
	
	
	@Autowired
	private CategoriaRepository repository;
	
	@Transactional (readOnly= true)
	public List <CategoriaDTO> findAll(){
		List<Categoria> list =repository.findAll();
		return list.stream().map(x -> new CategoriaDTO(x)).collect(Collectors.toList());
	}
	
	
	
	@Transactional (readOnly = true)
    public Page<CategoriaDTO> findAllPaged(Pageable pageable){
        Page <Categoria> list=repository.findAll(pageable);
        return list.map(x -> new CategoriaDTO(x));
    }

	
	@Transactional (readOnly = true)
	public CategoriaDTO findById(Long cat_codigo) {
		Optional<Categoria> obj = repository.findById(cat_codigo);
		Categoria entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new CategoriaDTO(entity);
	}
	
	@Transactional
	public CategoriaDTO insert(CategoriaDTO dto) {
		Categoria entity = new Categoria();
		entity.setCat_descricao(dto.getCat_descricao());
		entity = repository.save(entity);
		return new CategoriaDTO(entity);	
	}
	
	@Transactional
	public CategoriaDTO update(Long cat_codigo, CategoriaDTO dto) {
		try {
			Categoria entity = repository.getOne(cat_codigo);
			entity.setCat_descricao(dto.getCat_descricao());
			entity = repository.save(entity);
			return new CategoriaDTO(entity);
		}
		catch(EntityNotFoundException e) {
		throw new  ResourceNotFoundException("Id not Found" + cat_codigo);
		}
	}

	public void delete(Long cat_codigo) {
		try {
		repository.deleteById(cat_codigo);
		}
		catch(EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException ("Id Not Found Exception");
		}
		catch (DataIntegrityViolationException e) {
			throw new DataBaseException("Integity Violation");
		}
	}

}

