package com.br.predponta.app.resources;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.br.predponta.app.dto.FalhaDTO;
import com.br.predponta.app.servicies.FalhaService;

@RestController
@RequestMapping(value= "/falhas")
public class FalhaResources {
	
	@Autowired
	private FalhaService service;
	
	@GetMapping
	public ResponseEntity<Page<FalhaDTO>> findAll(
			@RequestParam(value = "page", defaultValue = "0") Integer page,
			@RequestParam(value = "linesPerPage", defaultValue = "12") Integer linesPerPage,
			@RequestParam(value = "direction", defaultValue = "ASC") String direction,
			@RequestParam(value = "orderBy", defaultValue = "fal_codigo") String orderBy
			
			){
		
		
		PageRequest pageRequest = PageRequest.of(page, linesPerPage,Direction.valueOf(direction),orderBy );
		
		
		
		Page <FalhaDTO> list = service.findAllPaged(pageRequest);	
		
		return ResponseEntity.ok().body(list);
		}
		
	@GetMapping(value = "/{fal_codigo}")
	public ResponseEntity<FalhaDTO> findById(@PathVariable Long fal_codigo){
		FalhaDTO dto = service.findById(fal_codigo);
			return ResponseEntity.ok().body(dto);	
	}
	
	@PostMapping
	public ResponseEntity<FalhaDTO> insert(@RequestBody FalhaDTO dto){
		dto = service.insert (dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{fal_codigo}")
				.buildAndExpand(dto.getFal_codigo()).toUri();
		
				return ResponseEntity.created(uri).body(dto);
	}
	
	@PutMapping(value = "/{fal_codigo}")
	public ResponseEntity<FalhaDTO> update(@PathVariable Long fal_codigo,@RequestBody FalhaDTO dto){
		dto = service.update (fal_codigo, dto);
		return ResponseEntity.ok().body(dto);
	}			
	
	@DeleteMapping(value = "/{fal_codigo}")
	public ResponseEntity<Void> delete(@PathVariable Long fal_codigo){
		service.delete (fal_codigo);
		return ResponseEntity.noContent().build();
	}
	
}
