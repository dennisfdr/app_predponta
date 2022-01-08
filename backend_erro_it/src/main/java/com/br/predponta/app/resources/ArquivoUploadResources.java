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

import com.br.predponta.app.dto.ArquivoUploadDTO;
import com.br.predponta.app.servicies.ArquivoUploadService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(value= "/arquivouploads")
@Api(value="API REST ArquivoUploads")
@CrossOrigin(origins = "*")

public class ArquivoUploadResources {
	
	@Autowired
	private ArquivoUploadService service;
	
	@ApiOperation(value="Busca todos os Arquivo Upload")
	@GetMapping
	public ResponseEntity<List<ArquivoUploadDTO>> findAll(){
		List <ArquivoUploadDTO> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	
	//@GetMapping
    //public ResponseEntity<Page<ArquivoUploadDTO>> findAll(Pageable pageable){

     //   Page <ArquivoUploadDTO> list = service.findAllPaged(pageable);
     //   return ResponseEntity.ok().body(list);
    //    }
	
	
	@ApiOperation(value="Busca Arquivos Upload por ID")
	@GetMapping(value = "/{aruCodigo}")
	public ResponseEntity<ArquivoUploadDTO> findById(@PathVariable Integer aruCodigo){
		ArquivoUploadDTO dto = service.findById(aruCodigo);
			return ResponseEntity.ok().body(dto);	
	}
	
	@ApiOperation(value="Salva Arquivo Upload")
	@PostMapping
	public ResponseEntity<ArquivoUploadDTO> insert(@RequestBody ArquivoUploadDTO dto){
		dto = service.insert (dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{aruCodigo}")
				
				.buildAndExpand(dto.getAruCodigo()).toUri();
		
				return ResponseEntity.created(uri).body(dto);
	}
	
	@ApiOperation(value="Atualiza Arquivo Upload")
	@PutMapping(value = "/{aruCodigo}")
	public ResponseEntity<ArquivoUploadDTO> update(@PathVariable Integer aruCodigo,@RequestBody ArquivoUploadDTO dto){
		dto = service.update (aruCodigo, dto);
		return ResponseEntity.ok().body(dto);
	}			
	
	@ApiOperation(value="Deleta Arquivo Upload")
	@DeleteMapping(value = "/{aruCodigo}")
	public ResponseEntity<Void> delete(@PathVariable Integer aruCodigo){
		service.delete (aruCodigo);
		return ResponseEntity.noContent().build();
	}
	
}
