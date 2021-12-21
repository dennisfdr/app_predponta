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

import com.br.predponta.app.dto.MedicaoDTO;
import com.br.predponta.app.servicies.MedicaoService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(value= "/medicaos")
@Api(value="API REST Medicao")
@CrossOrigin(origins = "*")

public class MedicaoResources {
	
	@Autowired
	private MedicaoService service;
	
	@ApiOperation(value="Busca todas as Medições")
	@GetMapping
	public ResponseEntity<List<MedicaoDTO>> findAll(){
		List <MedicaoDTO> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	
	//@GetMapping
    //public ResponseEntity<Page<MedicaoDTO>> findAll(Pageable pageable){

     //   Page <MedicaoDTO> list = service.findAllPaged(pageable);
     //   return ResponseEntity.ok().body(list);
    //    }
	
	
	@ApiOperation(value="Busca Medição por ID")
	@GetMapping(value = "/{medCogigo}")
	public ResponseEntity<MedicaoDTO> findById(@PathVariable Integer medCogigo){
		MedicaoDTO dto = service.findById(medCogigo);
			return ResponseEntity.ok().body(dto);	
	}
	
	@ApiOperation(value="Salva Medição")
	@PostMapping
	public ResponseEntity<MedicaoDTO> insert(@RequestBody MedicaoDTO dto){
		dto = service.insert (dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{medCogigo}")
				
				.buildAndExpand(dto.getMedCodigo()).toUri();
		
				return ResponseEntity.created(uri).body(dto);
	}
	
	@ApiOperation(value="Atualiza Medição")
	@PutMapping(value = "/{medCogigo}")
	public ResponseEntity<MedicaoDTO> update(@PathVariable Integer medCogigo,@RequestBody MedicaoDTO dto){
		dto = service.update (medCogigo, dto);
		return ResponseEntity.ok().body(dto);
	}			
	
	@ApiOperation(value="Deleta Medição")
	@DeleteMapping(value = "/{medCogigo}")
	public ResponseEntity<Void> delete(@PathVariable Integer medCogigo){
		service.delete (medCogigo);
		return ResponseEntity.noContent().build();
	}
	
}
