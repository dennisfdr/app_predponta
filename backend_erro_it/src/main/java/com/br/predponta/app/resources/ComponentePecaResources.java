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

import com.br.predponta.app.dto.ComponentePecaDTO;
import com.br.predponta.app.servicies.ComponentePecaService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(value= "/componentepecas")
@Api(value="API REST ComponentePecas")
@CrossOrigin(origins = "*")

public class ComponentePecaResources {
	
	@Autowired
	private ComponentePecaService service;
	
	@ApiOperation(value="Busca todos os Componentes Peças")
	@GetMapping
	public ResponseEntity<List<ComponentePecaDTO>> findAll(){
		List <ComponentePecaDTO> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	
	//@GetMapping
    //public ResponseEntity<Page<ComponentePecaDTO>> findAll(Pageable pageable){

     //   Page <ComponentePecaDTO> list = service.findAllPaged(pageable);
     //   return ResponseEntity.ok().body(list);
    //    }
	
	
	@ApiOperation(value="Busca historico componente por ID")
	@GetMapping(value = "/{copCodigo}")
	public ResponseEntity<ComponentePecaDTO> findById(@PathVariable Integer copCodigo){
		ComponentePecaDTO dto = service.findById(copCodigo);
			return ResponseEntity.ok().body(dto);	
	}
	
	@ApiOperation(value="Salva historico componente")
	@PostMapping
	public ResponseEntity<ComponentePecaDTO> insert(@RequestBody ComponentePecaDTO dto){
		dto = service.insert (dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{copCodigo}")
				
				.buildAndExpand(dto.getCopCodigo()).toUri();
		
				return ResponseEntity.created(uri).body(dto);
	}
	
	@ApiOperation(value="Atualiza historico componente")
	@PutMapping(value = "/{copCodigo}")
	public ResponseEntity<ComponentePecaDTO> update(@PathVariable Integer copCodigo,@RequestBody ComponentePecaDTO dto){
		dto = service.update (copCodigo, dto);
		return ResponseEntity.ok().body(dto);
	}			
	
	@ApiOperation(value="Deleta historico componente")
	@DeleteMapping(value = "/{copCodigo}")
	public ResponseEntity<Void> delete(@PathVariable Integer copCodigo){
		service.delete (copCodigo);
		return ResponseEntity.noContent().build();
	}
	
}
