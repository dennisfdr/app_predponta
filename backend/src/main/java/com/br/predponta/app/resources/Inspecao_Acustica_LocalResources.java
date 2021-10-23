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

import com.br.predponta.app.dto.Inspecao_Acustica_LocalDTO;
import com.br.predponta.app.servicies.Inspecao_Acustica_LocalService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(value= "/inspecao_acustica_locals")
@Api(value="API REST Inspecao_Acustica_Locals")
@CrossOrigin(origins = "*")

public class Inspecao_Acustica_LocalResources {
	
	@Autowired
	private Inspecao_Acustica_LocalService service;
	
	@ApiOperation(value="Busca todas as inspecao_acustica_locals")
	@GetMapping
	public ResponseEntity<List<Inspecao_Acustica_LocalDTO>> findAll(){
		List <Inspecao_Acustica_LocalDTO> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	
	//@GetMapping
    //public ResponseEntity<Page<Inspecao_Acustica_LocalDTO>> findAll(Pageable pageable){

     //   Page <Inspecao_Acustica_LocalDTO> list = service.findAllPaged(pageable);
     //   return ResponseEntity.ok().body(list);
    //    }
	
	
	@ApiOperation(value="Busca Inspecao_Acustica_Local por ID")
	@GetMapping(value = "/{ial_codigo}")
	public ResponseEntity<Inspecao_Acustica_LocalDTO> findById(@PathVariable Long ial_codigo){
		Inspecao_Acustica_LocalDTO dto = service.findById(ial_codigo);
			return ResponseEntity.ok().body(dto);	
	}
	
	@ApiOperation(value="Salva Inspecao_Acustica_Local")
	@PostMapping
	public ResponseEntity<Inspecao_Acustica_LocalDTO> insert(@RequestBody Inspecao_Acustica_LocalDTO dto){
		dto = service.insert (dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{ial_codigo}")
				.buildAndExpand(dto.getIal_codigo()).toUri();
		
				return ResponseEntity.created(uri).body(dto);
	}
	
	@ApiOperation(value="Atualiza inspecao_acustica_local")
	@PutMapping(value = "/{ial_codigo}")
	public ResponseEntity<Inspecao_Acustica_LocalDTO> update(@PathVariable Long ial_codigo,@RequestBody Inspecao_Acustica_LocalDTO dto){
		dto = service.update (ial_codigo, dto);
		return ResponseEntity.ok().body(dto);
	}			
	
	@ApiOperation(value="Deleta inspecao_acustica_local")
	@DeleteMapping(value = "/{ial_codigo}")
	public ResponseEntity<Void> delete(@PathVariable Long ial_codigo){
		service.delete (ial_codigo);
		return ResponseEntity.noContent().build();
	}
	
}
