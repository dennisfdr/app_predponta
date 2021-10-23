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
	
	@ApiOperation(value="Busca todas as equipamentos")
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
	@GetMapping(value = "/{equ_codigo}")
	public ResponseEntity<EquipamentoDTO> findById(@PathVariable Long equ_codigo){
		EquipamentoDTO dto = service.findById(equ_codigo);
			return ResponseEntity.ok().body(dto);	
	}
	
	@ApiOperation(value="Salva Equipamento")
	@PostMapping
	public ResponseEntity<EquipamentoDTO> insert(@RequestBody EquipamentoDTO dto){
		dto = service.insert (dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{equ_codigo}")
				.buildAndExpand(dto.getEqu_codigo()).toUri();
		
				return ResponseEntity.created(uri).body(dto);
	}
	
	@ApiOperation(value="Atualiza equipamento")
	@PutMapping(value = "/{equ_codigo}")
	public ResponseEntity<EquipamentoDTO> update(@PathVariable Long equ_codigo,@RequestBody EquipamentoDTO dto){
		dto = service.update (equ_codigo, dto);
		return ResponseEntity.ok().body(dto);
	}			
	
	@ApiOperation(value="Deleta equipamento")
	@DeleteMapping(value = "/{equ_codigo}")
	public ResponseEntity<Void> delete(@PathVariable Long equ_codigo){
		service.delete (equ_codigo);
		return ResponseEntity.noContent().build();
	}
	
}
