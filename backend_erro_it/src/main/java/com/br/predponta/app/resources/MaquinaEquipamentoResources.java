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

import com.br.predponta.app.dto.MaquinaEquipamentoDTO;
import com.br.predponta.app.servicies.MaquinaEquipamentoService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(value= "/maquinaequipamentos")
@Api(value="API REST MaquinaEquipamentos")
@CrossOrigin(origins = "*")

public class MaquinaEquipamentoResources {
	
	@Autowired
	private MaquinaEquipamentoService service;
	
	@ApiOperation(value="Busca todos as MaquinaEquipamento")
	@GetMapping
	public ResponseEntity<List<MaquinaEquipamentoDTO>> findAll(){
		List <MaquinaEquipamentoDTO> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	
	//@GetMapping
    //public ResponseEntity<Page<MaquinaEquipamentoDTO>> findAll(Pageable pageable){

     //   Page <MaquinaEquipamentoDTO> list = service.findAllPaged(pageable);
     //   return ResponseEntity.ok().body(list);
    //    }
	
	
	@ApiOperation(value="Busca maeuina equipamento por ID")
	@GetMapping(value = "/{maeCodigo}")
	public ResponseEntity<MaquinaEquipamentoDTO> findById(@PathVariable Integer maeCodigo){
		MaquinaEquipamentoDTO dto = service.findById(maeCodigo);
			return ResponseEntity.ok().body(dto);	
	}
	
	@ApiOperation(value="Salva maeuina equipamento")
	@PostMapping
	public ResponseEntity<MaquinaEquipamentoDTO> insert(@RequestBody MaquinaEquipamentoDTO dto){
		dto = service.insert (dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{maeCodigo}")
				
				.buildAndExpand(dto.getMaeCodigo()).toUri();
		
				return ResponseEntity.created(uri).body(dto);
	}
	
	@ApiOperation(value="Atualiza maeuina equipamento")
	@PutMapping(value = "/{maeCodigo}")
	public ResponseEntity<MaquinaEquipamentoDTO> update(@PathVariable Integer maeCodigo,@RequestBody MaquinaEquipamentoDTO dto){
		dto = service.update (maeCodigo, dto);
		return ResponseEntity.ok().body(dto);
	}			
	
	@ApiOperation(value="Deleta maeuina equipamento")
	@DeleteMapping(value = "/{maeCodigo}")
	public ResponseEntity<Void> delete(@PathVariable Integer maeCodigo){
		service.delete (maeCodigo);
		return ResponseEntity.noContent().build();
	}
	
}
