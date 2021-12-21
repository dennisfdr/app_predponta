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

import com.br.predponta.app.dto.SubComponenteDTO;
import com.br.predponta.app.servicies.SubComponenteService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(value= "/subcomponentes")
@Api(value="API REST SubComponentes")
@CrossOrigin(origins = "*")

public class SubComponenteResources {
	
	@Autowired
	private SubComponenteService service;
	
	@ApiOperation(value="Busca todos as  Sub Componente")
	@GetMapping
	public ResponseEntity<List<SubComponenteDTO>> findAll(){
		List <SubComponenteDTO> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	
	//@GetMapping
    //public ResponseEntity<Page<SubComponenteDTO>> findAll(Pageable pageable){

     //   Page <SubComponenteDTO> list = service.findAllPaged(pageable);
     //   return ResponseEntity.ok().body(list);
    //    }
	
	
	@ApiOperation(value="Busca  sub componente por ID")
	@GetMapping(value = "/{scoCodigo}")
	public ResponseEntity<SubComponenteDTO> findById(@PathVariable Integer scoCodigo){
		SubComponenteDTO dto = service.findById(scoCodigo);
			return ResponseEntity.ok().body(dto);	
	}
	
	@ApiOperation(value="Salva  sub componente")
	@PostMapping
	public ResponseEntity<SubComponenteDTO> insert(@RequestBody SubComponenteDTO dto){
		dto = service.insert (dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{scoCodigo}")
				
				.buildAndExpand(dto.getScoCodigo()).toUri();
		
				return ResponseEntity.created(uri).body(dto);
	}
	
	@ApiOperation(value="Atualiza  sub componente")
	@PutMapping(value = "/{scoCodigo}")
	public ResponseEntity<SubComponenteDTO> update(@PathVariable Integer scoCodigo,@RequestBody SubComponenteDTO dto){
		dto = service.update (scoCodigo, dto);
		return ResponseEntity.ok().body(dto);
	}			
	
	@ApiOperation(value="Deleta  sub componente")
	@DeleteMapping(value = "/{scoCodigo}")
	public ResponseEntity<Void> delete(@PathVariable Integer scoCodigo){
		service.delete (scoCodigo);
		return ResponseEntity.noContent().build();
	}
	
}
