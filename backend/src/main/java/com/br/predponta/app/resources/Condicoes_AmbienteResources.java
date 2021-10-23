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

import com.br.predponta.app.dto.Condicoes_AmbienteDTO;
import com.br.predponta.app.servicies.Condicoes_AmbienteService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(value= "/condicoes_ambientes")
@Api(value="API REST Condicoes_Ambientes")
@CrossOrigin(origins = "*")

public class Condicoes_AmbienteResources {
	
	@Autowired
	private Condicoes_AmbienteService service;
	
	@ApiOperation(value="Busca todas as condicoes_ambientes")
	@GetMapping
	public ResponseEntity<List<Condicoes_AmbienteDTO>> findAll(){
		List <Condicoes_AmbienteDTO> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	
	//@GetMapping
    //public ResponseEntity<Page<Condicoes_AmbienteDTO>> findAll(Pageable pageable){

     //   Page <Condicoes_AmbienteDTO> list = service.findAllPaged(pageable);
     //   return ResponseEntity.ok().body(list);
    //    }
	
	
	@ApiOperation(value="Busca Condicoes_Ambiente por ID")
	@GetMapping(value = "/{cam_codigo}")
	public ResponseEntity<Condicoes_AmbienteDTO> findById(@PathVariable Long cam_codigo){
		Condicoes_AmbienteDTO dto = service.findById(cam_codigo);
			return ResponseEntity.ok().body(dto);	
	}
	
	@ApiOperation(value="Salva Condicoes_Ambiente")
	@PostMapping
	public ResponseEntity<Condicoes_AmbienteDTO> insert(@RequestBody Condicoes_AmbienteDTO dto){
		dto = service.insert (dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{cam_codigo}")
				.buildAndExpand(dto.getCam_codigo()).toUri();
		
				return ResponseEntity.created(uri).body(dto);
	}
	
	@ApiOperation(value="Atualiza condicoes_ambiente")
	@PutMapping(value = "/{cam_codigo}")
	public ResponseEntity<Condicoes_AmbienteDTO> update(@PathVariable Long cam_codigo,@RequestBody Condicoes_AmbienteDTO dto){
		dto = service.update (cam_codigo, dto);
		return ResponseEntity.ok().body(dto);
	}			
	
	@ApiOperation(value="Deleta condicoes_ambiente")
	@DeleteMapping(value = "/{cam_codigo}")
	public ResponseEntity<Void> delete(@PathVariable Long cam_codigo){
		service.delete (cam_codigo);
		return ResponseEntity.noContent().build();
	}
	
}
