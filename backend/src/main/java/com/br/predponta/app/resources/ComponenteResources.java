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

import com.br.predponta.app.dto.ComponenteDTO;
import com.br.predponta.app.servicies.ComponenteService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(value= "/componentes")
@Api(value="API REST Componentes")
@CrossOrigin(origins = "*")

public class ComponenteResources {
	
	@Autowired
	private ComponenteService service;
	
	@ApiOperation(value="Busca todos as Componente")
	@GetMapping
	public ResponseEntity<List<ComponenteDTO>> findAll(){
		List <ComponenteDTO> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	
	//@GetMapping
    //public ResponseEntity<Page<ComponenteDTO>> findAll(Pageable pageable){

     //   Page <ComponenteDTO> list = service.findAllPaged(pageable);
     //   return ResponseEntity.ok().body(list);
    //    }
	
	
	@ApiOperation(value="Busca componente por ID")
	@GetMapping(value = "/{comCodigo}")
	public ResponseEntity<ComponenteDTO> findById(@PathVariable Integer comCodigo){
		ComponenteDTO dto = service.findById(comCodigo);
			return ResponseEntity.ok().body(dto);	
	}
	
	@ApiOperation(value="Salva componente")
	@PostMapping
	public ResponseEntity<ComponenteDTO> insert(@RequestBody ComponenteDTO dto){
		dto = service.insert (dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{comCodigo}")
				
				.buildAndExpand(dto.getComCodigo()).toUri();
		
				return ResponseEntity.created(uri).body(dto);
	}
	
	@ApiOperation(value="Atualiza componente")
	@PutMapping(value = "/{comCodigo}")
	public ResponseEntity<ComponenteDTO> update(@PathVariable Integer comCodigo,@RequestBody ComponenteDTO dto){
		dto = service.update (comCodigo, dto);
		return ResponseEntity.ok().body(dto);
	}			
	
	@ApiOperation(value="Deleta componente")
	@DeleteMapping(value = "/{comCodigo}")
	public ResponseEntity<Void> delete(@PathVariable Integer comCodigo){
		service.delete (comCodigo);
		return ResponseEntity.noContent().build();
	}
	
}
