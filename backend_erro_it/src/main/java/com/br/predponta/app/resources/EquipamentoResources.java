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

import com.br.predponta.app.dto.EquipamentoDTO;
import com.br.predponta.app.servicies.EquipamentoService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(value= "/equipamentos")
@Api(value="API REST Equipamentos")
@CrossOrigin(origins = "*")

public class EquipamentoResources {
	
	@Autowired
	private EquipamentoService service;
	
	@ApiOperation(value="Busca todos os Equipamento")
	@GetMapping
	public ResponseEntity<List<EquipamentoDTO>> findAll(){
		List <EquipamentoDTO> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	
	//@GetMapping
    //public ResponseEntity<Page<EquipamentoDTO>> findAll(Pageable pageable){

     //   Page <EquipamentoDTO> list = service.findAllPaged(pageable);
     //   return ResponseEntity.ok().body(list);
    //    }
	
	
	@ApiOperation(value="Busca Equipamento por ID")
	@GetMapping(value = "/{equCodigo}")
	public ResponseEntity<EquipamentoDTO> findById(@PathVariable Integer equCodigo){
		EquipamentoDTO dto = service.findById(equCodigo);
			return ResponseEntity.ok().body(dto);	
	}
	
	@ApiOperation(value="Salva Equipamento")
	@PostMapping
	public ResponseEntity<EquipamentoDTO> insert(@RequestBody EquipamentoDTO dto){
		dto = service.insert (dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{equCodigo}")
				
				.buildAndExpand(dto.getEquCodigo()).toUri();
		
				return ResponseEntity.created(uri).body(dto);
	}
	
	@ApiOperation(value="Atualiza Equipamento")
	@PutMapping(value = "/{equCodigo}")
	public ResponseEntity<EquipamentoDTO> update(@PathVariable Integer equCodigo,@RequestBody EquipamentoDTO dto){
		dto = service.update (equCodigo, dto);
		return ResponseEntity.ok().body(dto);
	}			
	
	@ApiOperation(value="Deleta Equipamento")
	@DeleteMapping(value = "/{equCodigo}")
	public ResponseEntity<Void> delete(@PathVariable Integer equCodigo){
		service.delete (equCodigo);
		return ResponseEntity.noContent().build();
	}
	
}
