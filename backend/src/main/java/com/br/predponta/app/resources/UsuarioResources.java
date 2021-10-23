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

import com.br.predponta.app.dto.UsuarioDTO;
import com.br.predponta.app.servicies.UsuarioService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(value= "/usuarios")
@Api(value="API REST Usuarios")
@CrossOrigin(origins = "*")

public class UsuarioResources {
	
	@Autowired
	private UsuarioService service;
	
	@ApiOperation(value="Busca todas as usuarios")
	@GetMapping
	public ResponseEntity<List<UsuarioDTO>> findAll(){
		List <UsuarioDTO> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	
	//@GetMapping
    //public ResponseEntity<Page<UsuarioDTO>> findAll(Pageable pageable){

     //   Page <UsuarioDTO> list = service.findAllPaged(pageable);
     //   return ResponseEntity.ok().body(list);
    //    }
	
	
	@ApiOperation(value="Busca Usuario por ID")
	@GetMapping(value = "/{usu_codigo}")
	public ResponseEntity<UsuarioDTO> findById(@PathVariable Long usu_codigo){
		UsuarioDTO dto = service.findById(usu_codigo);
			return ResponseEntity.ok().body(dto);	
	}
	
	@ApiOperation(value="Salva Usuario")
	@PostMapping
	public ResponseEntity<UsuarioDTO> insert(@RequestBody UsuarioDTO dto){
		dto = service.insert (dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{usu_codigo}")
				.buildAndExpand(dto.getUsu_codigo()).toUri();
		
				return ResponseEntity.created(uri).body(dto);
	}
	
	@ApiOperation(value="Atualiza usuario")
	@PutMapping(value = "/{usu_codigo}")
	public ResponseEntity<UsuarioDTO> update(@PathVariable Long usu_codigo,@RequestBody UsuarioDTO dto){
		dto = service.update (usu_codigo, dto);
		return ResponseEntity.ok().body(dto);
	}			
	
	@ApiOperation(value="Deleta usuario")
	@DeleteMapping(value = "/{usu_codigo}")
	public ResponseEntity<Void> delete(@PathVariable Long usu_codigo){
		service.delete (usu_codigo);
		return ResponseEntity.noContent().build();
	}
	
}
