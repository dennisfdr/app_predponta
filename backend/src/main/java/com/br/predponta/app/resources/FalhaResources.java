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

import com.br.predponta.app.dto.FalhaDTO;
import com.br.predponta.app.servicies.FalhaService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(value= "/api")
@Api(value="API REST Falhas")
@CrossOrigin(origins = "*")

public class FalhaResources {
	
	@Autowired
	private FalhaService service;
	
	@ApiOperation(value="Busca todas as falhas")
	@GetMapping
	public ResponseEntity<List<FalhaDTO>> findAll(){
		List <FalhaDTO> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	
	//@GetMapping
    //public ResponseEntity<Page<FalhaDTO>> findAll(Pageable pageable){

     //   Page <FalhaDTO> list = service.findAllPaged(pageable);
     //   return ResponseEntity.ok().body(list);
    //    }
	
	
	@ApiOperation(value="Busca Falha por ID")
	@GetMapping(value = "/{fal_codigo}")
	public ResponseEntity<FalhaDTO> findById(@PathVariable Long fal_codigo){
		FalhaDTO dto = service.findById(fal_codigo);
			return ResponseEntity.ok().body(dto);	
	}
	
	@ApiOperation(value="Salva Falha")
	@PostMapping
	public ResponseEntity<FalhaDTO> insert(@RequestBody FalhaDTO dto){
		dto = service.insert (dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{fal_codigo}")
				.buildAndExpand(dto.getFal_codigo()).toUri();
		
				return ResponseEntity.created(uri).body(dto);
	}
	
	@ApiOperation(value="Atualia falha")
	@PutMapping(value = "/{fal_codigo}")
	public ResponseEntity<FalhaDTO> update(@PathVariable Long fal_codigo,@RequestBody FalhaDTO dto){
		dto = service.update (fal_codigo, dto);
		return ResponseEntity.ok().body(dto);
	}			
	
	@ApiOperation(value="Deleta falha")
	@DeleteMapping(value = "/{fal_codigo}")
	public ResponseEntity<Void> delete(@PathVariable Long fal_codigo){
		service.delete (fal_codigo);
		return ResponseEntity.noContent().build();
	}
	
}
