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

import com.br.predponta.app.dto.Mca_StatusDTO;
import com.br.predponta.app.servicies.Mca_StatusService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(value= "/mca_statuss")
@Api(value="API REST Mca_Statuss")
@CrossOrigin(origins = "*")

public class Mca_StatusResources {
	
	@Autowired
	private Mca_StatusService service;
	
	@ApiOperation(value="Busca todas as mca_statuss")
	@GetMapping
	public ResponseEntity<List<Mca_StatusDTO>> findAll(){
		List <Mca_StatusDTO> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	
	//@GetMapping
    //public ResponseEntity<Page<Mca_StatusDTO>> findAll(Pageable pageable){

     //   Page <Mca_StatusDTO> list = service.findAllPaged(pageable);
     //   return ResponseEntity.ok().body(list);
    //    }
	
	
	@ApiOperation(value="Busca Mca_Status por ID")
	@GetMapping(value = "/{mcas_codigo}")
	public ResponseEntity<Mca_StatusDTO> findById(@PathVariable Long mcas_codigo){
		Mca_StatusDTO dto = service.findById(mcas_codigo);
			return ResponseEntity.ok().body(dto);	
	}
	
	@ApiOperation(value="Salva Mca_Status")
	@PostMapping
	public ResponseEntity<Mca_StatusDTO> insert(@RequestBody Mca_StatusDTO dto){
		dto = service.insert (dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{mcas_codigo}")
				.buildAndExpand(dto.getMcasr_codigo()).toUri();
		
				return ResponseEntity.created(uri).body(dto);
	}
	
	@ApiOperation(value="Atualiza mca_status")
	@PutMapping(value = "/{mcas_codigo}")
	public ResponseEntity<Mca_StatusDTO> update(@PathVariable Long mcas_codigo,@RequestBody Mca_StatusDTO dto){
		dto = service.update (mcas_codigo, dto);
		return ResponseEntity.ok().body(dto);
	}			
	
	@ApiOperation(value="Deleta mca_status")
	@DeleteMapping(value = "/{mcas_codigo}")
	public ResponseEntity<Void> delete(@PathVariable Long mcas_codigo){
		service.delete (mcas_codigo);
		return ResponseEntity.noContent().build();
	}
	
}
