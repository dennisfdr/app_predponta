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

import com.br.predponta.app.dto.Servicos_SiteDTO;
import com.br.predponta.app.servicies.Servicos_SiteService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(value= "/servicos_sites")
@Api(value="API REST Servicos_Sites")
@CrossOrigin(origins = "*")

public class Servicos_SiteResources {
	
	@Autowired
	private Servicos_SiteService service;
	
	@ApiOperation(value="Busca todas as servicos_sites")
	@GetMapping
	public ResponseEntity<List<Servicos_SiteDTO>> findAll(){
		List <Servicos_SiteDTO> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	
	//@GetMapping
    //public ResponseEntity<Page<Servicos_SiteDTO>> findAll(Pageable pageable){

     //   Page <Servicos_SiteDTO> list = service.findAllPaged(pageable);
     //   return ResponseEntity.ok().body(list);
    //    }
	
	
	@ApiOperation(value="Busca Servicos_Site por ID")
	@GetMapping(value = "/{ssi_codigo}")
	public ResponseEntity<Servicos_SiteDTO> findById(@PathVariable Long ssi_codigo){
		Servicos_SiteDTO dto = service.findById(ssi_codigo);
			return ResponseEntity.ok().body(dto);	
	}
	
	@ApiOperation(value="Salva servicos site")
	@PostMapping
	public ResponseEntity<Servicos_SiteDTO> insert(@RequestBody Servicos_SiteDTO dto){
		dto = service.insert (dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{ssi_codigo}")
				.buildAndExpand(dto.getSsi_codigo()).toUri();
		
				return ResponseEntity.created(uri).body(dto);
	}
	
	@ApiOperation(value="Atualiza servicos site")
	@PutMapping(value = "/{ssi_codigo}")
	public ResponseEntity<Servicos_SiteDTO> update(@PathVariable Long ssi_codigo,@RequestBody Servicos_SiteDTO dto){
		dto = service.update (ssi_codigo, dto);
		return ResponseEntity.ok().body(dto);
	}			
	
	@ApiOperation(value="Deleta servicos site")
	@DeleteMapping(value = "/{ssi_codigo}")
	public ResponseEntity<Void> delete(@PathVariable Long ssi_codigo){
		service.delete (ssi_codigo);
		return ResponseEntity.noContent().build();
	}
	
}
