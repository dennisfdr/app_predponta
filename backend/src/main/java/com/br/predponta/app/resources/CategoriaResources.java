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

import com.br.predponta.app.dto.CategoriaDTO;
import com.br.predponta.app.servicies.CategoriaService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(value= "/categorias")
@Api(value="API REST Categorias")
@CrossOrigin(origins = "*")

public class CategoriaResources {
	
	@Autowired
	private CategoriaService service;
	
	@ApiOperation(value="Busca todas as categorias")
	@GetMapping
	public ResponseEntity<List<CategoriaDTO>> findAll(){
		List <CategoriaDTO> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	
	//@GetMapping
    //public ResponseEntity<Page<CategoriaDTO>> findAll(Pageable pageable){

     //   Page <CategoriaDTO> list = service.findAllPaged(pageable);
     //   return ResponseEntity.ok().body(list);
    //    }
	
	
	@ApiOperation(value="Busca Categoria por ID")
	@GetMapping(value = "/{cat_codigo}")
	public ResponseEntity<CategoriaDTO> findById(@PathVariable Long cat_codigo){
		CategoriaDTO dto = service.findById(cat_codigo);
			return ResponseEntity.ok().body(dto);	
	}
	
	@ApiOperation(value="Salva Categoria")
	@PostMapping
	public ResponseEntity<CategoriaDTO> insert(@RequestBody CategoriaDTO dto){
		dto = service.insert (dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{cat_codigo}")
				.buildAndExpand(dto.getCat_codigo()).toUri();
		
				return ResponseEntity.created(uri).body(dto);
	}
	
	@ApiOperation(value="Atualiza categoria")
	@PutMapping(value = "/{cat_codigo}")
	public ResponseEntity<CategoriaDTO> update(@PathVariable Long cat_codigo,@RequestBody CategoriaDTO dto){
		dto = service.update (cat_codigo, dto);
		return ResponseEntity.ok().body(dto);
	}			
	
	@ApiOperation(value="Deleta categoria")
	@DeleteMapping(value = "/{cat_codigo}")
	public ResponseEntity<Void> delete(@PathVariable Long cat_codigo){
		service.delete (cat_codigo);
		return ResponseEntity.noContent().build();
	}
	
}
