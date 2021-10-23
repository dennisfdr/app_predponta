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

import com.br.predponta.app.dto.UsuarioDTO;
import com.br.predponta.app.entities.Usuario;

import com.br.predponta.app.repositories.UsuarioRepository;
import com.br.predponta.app.servicies.exceptions.DataBaseException;
import com.br.predponta.app.servicies.exceptions.ResourceNotFoundException;


@Service
public class UsuarioService {
	
	
	@Autowired
	private UsuarioRepository repository;
	
	@Transactional (readOnly= true)
	public List <UsuarioDTO> findAll(){
		List<Usuario> list =repository.findAll();
		return list.stream().map(x -> new UsuarioDTO(x)).collect(Collectors.toList());
	}
	
	
	
	@Transactional (readOnly = true)
    public Page<UsuarioDTO> findAllPaged(Pageable pageable){
        Page <Usuario> list=repository.findAll(pageable);
        return list.map(x -> new UsuarioDTO(x));
    }

	
	@Transactional (readOnly = true)
	public UsuarioDTO findById(Long usu_codigo) {
		Optional<Usuario> obj = repository.findById(usu_codigo);
		Usuario entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new UsuarioDTO(entity);
	}
	
	@Transactional
	public UsuarioDTO insert(UsuarioDTO dto) {
		Usuario entity = new Usuario();
		entity.setUsu_nome(dto.getUsu_nome());
		entity.setUsu_login(dto.getUsu_login());
		entity.setUsu_senha(dto.getUsu_senha());
		entity.setUsu_fk_emp_codigo(dto.getUsu_fk_emp_codigo());
		entity.setUsu_status(dto.getUsu_status());
		entity.setUsu_assinatura(dto.getUsu_assinatura());
		entity.setFal_codigo(dto.getFal_codigo());
		entity.setFal_descricao(dto.getFal_descricao());
		entity = repository.save(entity);
		return new UsuarioDTO(entity);	
	}
	
	@Transactional
	public UsuarioDTO update(Long usu_codigo, UsuarioDTO dto) {
		try {
			Usuario entity = repository.getOne(usu_codigo);
			entity.setUsu_nome(dto.getUsu_nome());
			entity.setUsu_login(dto.getUsu_login());
			entity.setUsu_senha(dto.getUsu_senha());
			entity.setUsu_fk_emp_codigo(dto.getUsu_fk_emp_codigo());
			entity.setUsu_status(dto.getUsu_status());
			entity.setUsu_assinatura(dto.getUsu_assinatura());
			entity.setFal_codigo(dto.getFal_codigo());
			entity.setFal_descricao(dto.getFal_descricao());
			entity = repository.save(entity);
			return new UsuarioDTO(entity);
		}
		catch(EntityNotFoundException e) {
		throw new  ResourceNotFoundException("Id not Found" + usu_codigo);
		}
	}

	public void delete(Long usu_codigo) {
		try {
		repository.deleteById(usu_codigo);
		}
		catch(EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException ("Id Not Found Exception");
		}
		catch (DataIntegrityViolationException e) {
			throw new DataBaseException("Integity Violation");
		}
	}

}

