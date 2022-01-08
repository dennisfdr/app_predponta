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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.br.predponta.app.dto.InspecaoAcusticaLocalDTO;
import com.br.predponta.app.servicies.InspecaoAcusticaLocalService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(value= "/inspecaoacusticalocals")
@Api(value="API REST InspecaoAcusticaLocals")
@CrossOrigin(origins = "*")

public class InspecaoAcusticaLocalResources {
	
	@Autowired
	private InspecaoAcusticaLocalService service;
	
	@ApiOperation(value="Busca todos os Inspeção Acustica Local")
	@GetMapping
	public ResponseEntity<List<InspecaoAcusticaLocalDTO>> findAll(){
		List <InspecaoAcusticaLocalDTO> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	
	//@GetMapping
    //public ResponseEntity<Page<InspecaoAcusticaLocalDTO>> findAll(Pageable pageable){

     //   Page <InspecaoAcusticaLocalDTO> list = service.findAllPaged(pageable);
     //   return ResponseEntity.ok().body(list);
    //    }
	
	
	@ApiOperation(value="Busca Inspeção Acustica Local por ID")
	@GetMapping(value = "/{ialCodigo}")
	public ResponseEntity<InspecaoAcusticaLocalDTO> findById(@PathVariable Integer ialCodigo){
		InspecaoAcusticaLocalDTO dto = service.findById(ialCodigo);
			return ResponseEntity.ok().body(dto);	
	}
	
	@ApiOperation(value="Salva Inspeção Acustica Local")
	@PostMapping
	public ResponseEntity<InspecaoAcusticaLocalDTO> insert(@RequestBody InspecaoAcusticaLocalDTO dto){
		dto = service.insert (dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{ialCodigo}")
				
				.buildAndExpand(dto.getIalCodigo()).toUri();
		
				return ResponseEntity.created(uri).body(dto);
	}
	
	@ApiOperation(value="Atualiza Inspeção AcusticaLocal")
	@PutMapping(value = "/{ialCodigo}")
	public ResponseEntity<InspecaoAcusticaLocalDTO> update(@PathVariable Integer ialCodigo,@RequestBody InspecaoAcusticaLocalDTO dto){
		dto = service.update (ialCodigo, dto);
		return ResponseEntity.ok().body(dto);
	}			
	
	@ApiOperation(value="Deleta Inspeção Acustica Local")
	@DeleteMapping(value = "/{ialCodigo}")
	public ResponseEntity<Void> delete(@PathVariable Integer ialCodigo){
		service.delete (ialCodigo);
		return ResponseEntity.noContent().build();
	}
	
}
