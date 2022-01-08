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

import com.br.predponta.app.dto.ComponenteSubcomponenteDTO;
import com.br.predponta.app.servicies.ComponenteSubcomponenteService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(value= "/componentesubcomponentes")
@Api(value="API REST ComponenteSubcomponentes")
@CrossOrigin(origins = "*")

public class ComponenteSubcomponenteResources {
	
	@Autowired
	private ComponenteSubcomponenteService service;
	
	@ApiOperation(value="Busca todos as  Sub Componente")
	@GetMapping
	public ResponseEntity<List<ComponenteSubcomponenteDTO>> findAll(){
		List <ComponenteSubcomponenteDTO> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	
	//@GetMapping
    //public ResponseEntity<Page<ComponenteSubcomponenteDTO>> findAll(Pageable pageable){

     //   Page <ComponenteSubcomponenteDTO> list = service.findAllPaged(pageable);
     //   return ResponseEntity.ok().body(list);
    //    }
	
	
	@ApiOperation(value="Busca componente subcomponente por ID")
	@GetMapping(value = "/{cscCodigo}")
	public ResponseEntity<ComponenteSubcomponenteDTO> findById(@PathVariable Integer cscCodigo){
		ComponenteSubcomponenteDTO dto = service.findById(cscCodigo);
			return ResponseEntity.ok().body(dto);	
	}
	
	@ApiOperation(value="Salva componente subcomponente")
	@PostMapping
	public ResponseEntity<ComponenteSubcomponenteDTO> insert(@RequestBody ComponenteSubcomponenteDTO dto){
		dto = service.insert (dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{cscCodigo}")
				
				.buildAndExpand(dto.getCscCodigo()).toUri();
		
				return ResponseEntity.created(uri).body(dto);
	}
	
	@ApiOperation(value="Atualiza  componente subcomponente")
	@PutMapping(value = "/{cscCodigo}")
	public ResponseEntity<ComponenteSubcomponenteDTO> update(@PathVariable Integer cscCodigo,@RequestBody ComponenteSubcomponenteDTO dto){
		dto = service.update (cscCodigo, dto);
		return ResponseEntity.ok().body(dto);
	}			
	
	@ApiOperation(value="Deleta  componente subcomponente")
	@DeleteMapping(value = "/{cscCodigo}")
	public ResponseEntity<Void> delete(@PathVariable Integer cscCodigo){
		service.delete (cscCodigo);
		return ResponseEntity.noContent().build();
	}
	
}
