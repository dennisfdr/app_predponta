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

import com.br.predponta.app.dto.EmpresaEmailDTO;
import com.br.predponta.app.servicies.EmpresaEmailService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(value= "/empresaemails")
@Api(value="API REST EmpresaEmails")
@CrossOrigin(origins = "*")

public class EmpresaEmailResources {
	
	@Autowired
	private EmpresaEmailService service;
	
	@ApiOperation(value="Busca todos os emails da Empresa")
	@GetMapping
	public ResponseEntity<List<EmpresaEmailDTO>> findAll(){
		List <EmpresaEmailDTO> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	
	//@GetMapping
    //public ResponseEntity<Page<EmpresaEmailDTO>> findAll(Pageable pageable){

     //   Page <EmpresaEmailDTO> list = service.findAllPaged(pageable);
     //   return ResponseEntity.ok().body(list);
    //    }
	
	
	@ApiOperation(value="Busca email por ID")
	@GetMapping(value = "/{emeCodigo}")
	public ResponseEntity<EmpresaEmailDTO> findById(@PathVariable Integer emeCodigo){
		EmpresaEmailDTO dto = service.findById(emeCodigo);
			return ResponseEntity.ok().body(dto);	
	}
	
	@ApiOperation(value="Salva empresa email")
	@PostMapping
	public ResponseEntity<EmpresaEmailDTO> insert(@RequestBody EmpresaEmailDTO dto){
		dto = service.insert (dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{emeCodigo}")
				
				.buildAndExpand(dto.getEmeCodigo()).toUri();
		
				return ResponseEntity.created(uri).body(dto);
	}
	
	@ApiOperation(value="Atualiza empresa email")
	@PutMapping(value = "/{emeCodigo}")
	public ResponseEntity<EmpresaEmailDTO> update(@PathVariable Integer emeCodigo,@RequestBody EmpresaEmailDTO dto){
		dto = service.update (emeCodigo, dto);
		return ResponseEntity.ok().body(dto);
	}			
	
	@ApiOperation(value="Deleta empresa email")
	@DeleteMapping(value = "/{emeCodigo}")
	public ResponseEntity<Void> delete(@PathVariable Integer emeCodigo){
		service.delete (emeCodigo);
		return ResponseEntity.noContent().build();
	}
	
}
