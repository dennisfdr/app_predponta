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
@RequestMapping(value= "/falhas")
@Api(value="API REST Falhas")
@CrossOrigin(origins = "*")

public class FalhaResources {
	
	@Autowired
	private FalhaService service;
	
	@ApiOperation(value="Busca todos os Falhas")
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
	@GetMapping(value = "/{falCodigo}")
	public ResponseEntity<FalhaDTO> findById(@PathVariable Integer falCodigo){
		FalhaDTO dto = service.findById(falCodigo);
			return ResponseEntity.ok().body(dto);	
	}
	
	@ApiOperation(value="Salva Falha")
	@PostMapping
	public ResponseEntity<FalhaDTO> insert(@RequestBody FalhaDTO dto){
		dto = service.insert (dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{falCodigo}")
				
				.buildAndExpand(dto.getFalCodigo()).toUri();
		
				return ResponseEntity.created(uri).body(dto);
	}
	
	@ApiOperation(value="Atualiza Falha")
	@PutMapping(value = "/{falCodigo}")
	public ResponseEntity<FalhaDTO> update(@PathVariable Integer falCodigo,@RequestBody FalhaDTO dto){
		dto = service.update (falCodigo, dto);
		return ResponseEntity.ok().body(dto);
	}			
	
	@ApiOperation(value="Deleta Falha")
	@DeleteMapping(value = "/{falCodigo}")
	public ResponseEntity<Void> delete(@PathVariable Integer falCodigo){
		service.delete (falCodigo);
		return ResponseEntity.noContent().build();
	}
	
}
