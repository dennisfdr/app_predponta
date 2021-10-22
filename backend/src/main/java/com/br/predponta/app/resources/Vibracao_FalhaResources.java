package com.br.predponta.app.resources;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;


import com.br.predponta.app.dto.Vibracao_FalhaDTO;
import com.br.predponta.app.servicies.Vibracao_FalhaService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(value= "/vibracao_falhas")
@Api(value="API REST Falhas")
@CrossOrigin(origins = "*")

public class Vibracao_FalhaResources {
	
	@Autowired
	private Vibracao_FalhaService service;
	
	@ApiOperation(value="Busca todas as vibrações falhas")
	@GetMapping
	public ResponseEntity<List<Vibracao_FalhaDTO>> findAll(){
		List <Vibracao_FalhaDTO> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	
	//@GetMapping
    //public ResponseEntity<Page<FalhaDTO>> findAll(Pageable pageable){

     //   Page <FalhaDTO> list = service.findAllPaged(pageable);
     //   return ResponseEntity.ok().body(list);
    //    }
	
	
	@ApiOperation(value="Busca vibração falha por ID")
	@GetMapping(value = "/{fal_codigo}")
	public ResponseEntity<Vibracao_FalhaDTO> findById(@PathVariable Long fal_codigo){
		Vibracao_FalhaDTO dto = service.findById(fal_codigo);
			return ResponseEntity.ok().body(dto);	
	}
	
	@ApiOperation(value="Salva vibração falha")
	@PostMapping
	public ResponseEntity<Vibracao_FalhaDTO> insert(@RequestBody Vibracao_FalhaDTO dto){
		dto = service.insert (dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{fal_codigo}")
				.buildAndExpand(dto.getFal_codigo()).toUri();
		
				return ResponseEntity.created(uri).body(dto);
	}
	
	@ApiOperation(value="Atualiza vibração falha")
	@PutMapping(value = "/{fal_codigo}")
	public ResponseEntity<Vibracao_FalhaDTO> update(@PathVariable Long fal_codigo,@RequestBody Vibracao_FalhaDTO dto){
		dto = service.update (fal_codigo, dto);
		return ResponseEntity.ok().body(dto);
	}			
	
	@ApiOperation(value="Deleta vibração falha")
	@DeleteMapping(value = "/{fal_codigo}")
	public ResponseEntity<Void> delete(@PathVariable Long fal_codigo){
		service.delete (fal_codigo);
		return ResponseEntity.noContent().build();
	}
	
}
