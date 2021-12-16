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

import com.br.predponta.app.dto.EmpresaDTO;
import com.br.predponta.app.servicies.EmpresaService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(value= "/empresas")
@Api(value="API REST Empresas")
@CrossOrigin(origins = "*")

public class EmpresaResources {
	
	@Autowired
	private EmpresaService service;
	
	@ApiOperation(value="Busca todas as vibrações empresas")
	@GetMapping
	public ResponseEntity<List<EmpresaDTO>> findAll(){
		List <EmpresaDTO> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	
	//@GetMapping
    //public ResponseEntity<Page<EmpresaDTO>> findAll(Pageable pageable){

     //   Page <EmpresaDTO> list = service.findAllPaged(pageable);
     //   return ResponseEntity.ok().body(list);
    //    }
	
	
	@ApiOperation(value="Busca empresa por ID")
	@GetMapping(value = "/{empCodigo}")
	public ResponseEntity<EmpresaDTO> findById(@PathVariable Integer empCodigo){
		EmpresaDTO dto = service.findById(empCodigo);
			return ResponseEntity.ok().body(dto);	
	}
	
	@ApiOperation(value="Salva empresa")
	@PostMapping
	public ResponseEntity<EmpresaDTO> insert(@RequestBody EmpresaDTO dto){
		dto = service.insert (dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{empCodigo}")
				
				.buildAndExpand(dto.getEmpCodigo()).toUri();
		
				return ResponseEntity.created(uri).body(dto);
	}
	
	@ApiOperation(value="Atualiza empresa")
	@PutMapping(value = "/{empCodigo}")
	public ResponseEntity<EmpresaDTO> update(@PathVariable Integer empCodigo,@RequestBody EmpresaDTO dto){
		dto = service.update (empCodigo, dto);
		return ResponseEntity.ok().body(dto);
	}			
	
	@ApiOperation(value="Deleta empresa")
	@DeleteMapping(value = "/{empCodigo}")
	public ResponseEntity<Void> delete(@PathVariable Integer empCodigo){
		service.delete (empCodigo);
		return ResponseEntity.noContent().build();
	}
	
}
