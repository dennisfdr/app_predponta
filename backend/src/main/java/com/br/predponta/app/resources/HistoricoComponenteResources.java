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

import com.br.predponta.app.dto.HistoricoComponenteDTO;
import com.br.predponta.app.servicies.HistoricoComponenteService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(value= "/historicocomponentes")
@Api(value="API REST HistoricoComponentes")
@CrossOrigin(origins = "*")

public class HistoricoComponenteResources {
	
	@Autowired
	private HistoricoComponenteService service;
	
	@ApiOperation(value="Busca todos as HistoricoComponente")
	@GetMapping
	public ResponseEntity<List<HistoricoComponenteDTO>> findAll(){
		List <HistoricoComponenteDTO> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	
	//@GetMapping
    //public ResponseEntity<Page<HistoricoComponenteDTO>> findAll(Pageable pageable){

     //   Page <HistoricoComponenteDTO> list = service.findAllPaged(pageable);
     //   return ResponseEntity.ok().body(list);
    //    }
	
	
	@ApiOperation(value="Busca historico componente por ID")
	@GetMapping(value = "/{hcoCodigo}")
	public ResponseEntity<HistoricoComponenteDTO> findById(@PathVariable Integer hcoCodigo){
		HistoricoComponenteDTO dto = service.findById(hcoCodigo);
			return ResponseEntity.ok().body(dto);	
	}
	
	@ApiOperation(value="Salva historico componente")
	@PostMapping
	public ResponseEntity<HistoricoComponenteDTO> insert(@RequestBody HistoricoComponenteDTO dto){
		dto = service.insert (dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{hcoCodigo}")
				
				.buildAndExpand(dto.getHcoCodigo()).toUri();
		
				return ResponseEntity.created(uri).body(dto);
	}
	
	@ApiOperation(value="Atualiza historico componente")
	@PutMapping(value = "/{hcoCodigo}")
	public ResponseEntity<HistoricoComponenteDTO> update(@PathVariable Integer hcoCodigo,@RequestBody HistoricoComponenteDTO dto){
		dto = service.update (hcoCodigo, dto);
		return ResponseEntity.ok().body(dto);
	}			
	
	@ApiOperation(value="Deleta historico componente")
	@DeleteMapping(value = "/{hcoCodigo}")
	public ResponseEntity<Void> delete(@PathVariable Integer hcoCodigo){
		service.delete (hcoCodigo);
		return ResponseEntity.noContent().build();
	}
	
}
