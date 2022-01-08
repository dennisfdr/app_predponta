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

import com.br.predponta.app.dto.StatusSubComponenteDTO;
import com.br.predponta.app.servicies.StatusSubComponenteService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(value= "/statussubcomponentes")
@Api(value="API REST StatusSubComponentes")
@CrossOrigin(origins = "*")

public class StatusSubComponenteResources {
	
	@Autowired
	private StatusSubComponenteService service;
	
	@ApiOperation(value="Busca todos as Status Sub Componente")
	@GetMapping
	public ResponseEntity<List<StatusSubComponenteDTO>> findAll(){
		List <StatusSubComponenteDTO> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	
	//@GetMapping
    //public ResponseEntity<Page<StatusSubComponenteDTO>> findAll(Pageable pageable){

     //   Page <StatusSubComponenteDTO> list = service.findAllPaged(pageable);
     //   return ResponseEntity.ok().body(list);
    //    }
	
	
	@ApiOperation(value="Busca status sub componente por ID")
	@GetMapping(value = "/{sscCogigo}")
	public ResponseEntity<StatusSubComponenteDTO> findById(@PathVariable Integer sscCogigo){
		StatusSubComponenteDTO dto = service.findById(sscCogigo);
			return ResponseEntity.ok().body(dto);	
	}
	
	@ApiOperation(value="Salva status sub componente")
	@PostMapping
	public ResponseEntity<StatusSubComponenteDTO> insert(@RequestBody StatusSubComponenteDTO dto){
		dto = service.insert (dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{sscCogigo}")
				
				.buildAndExpand(dto.getSscCodigo()).toUri();
		
				return ResponseEntity.created(uri).body(dto);
	}
	
	@ApiOperation(value="Atualiza status sub componente")
	@PutMapping(value = "/{sscCogigo}")
	public ResponseEntity<StatusSubComponenteDTO> update(@PathVariable Integer sscCogigo,@RequestBody StatusSubComponenteDTO dto){
		dto = service.update (sscCogigo, dto);
		return ResponseEntity.ok().body(dto);
	}			
	
	@ApiOperation(value="Deleta status sub componente")
	@DeleteMapping(value = "/{sscCogigo}")
	public ResponseEntity<Void> delete(@PathVariable Integer sscCogigo){
		service.delete (sscCogigo);
		return ResponseEntity.noContent().build();
	}
	
}
