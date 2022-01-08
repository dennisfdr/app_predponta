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

import com.br.predponta.app.dto.MaquinaDTO;
import com.br.predponta.app.servicies.MaquinaService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(value= "/maquinas")
@Api(value="API REST Maquinas")
@CrossOrigin(origins = "*")

public class MaquinaResources {
	
	@Autowired
	private MaquinaService service;
	
	@ApiOperation(value="Busca todos as Maquina")
	@GetMapping
	public ResponseEntity<List<MaquinaDTO>> findAll(){
		List <MaquinaDTO> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	
	//@GetMapping
    //public ResponseEntity<Page<MaquinaDTO>> findAll(Pageable pageable){

     //   Page <MaquinaDTO> list = service.findAllPaged(pageable);
     //   return ResponseEntity.ok().body(list);
    //    }
	
	
	@ApiOperation(value="Busca maquina por ID")
	@GetMapping(value = "/{maqCodigo}")
	public ResponseEntity<MaquinaDTO> findById(@PathVariable Integer maqCodigo){
		MaquinaDTO dto = service.findById(maqCodigo);
			return ResponseEntity.ok().body(dto);	
	}
	
	@ApiOperation(value="Salva maquina")
	@PostMapping
	public ResponseEntity<MaquinaDTO> insert(@RequestBody MaquinaDTO dto){
		dto = service.insert (dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{maqCodigo}")
				
				.buildAndExpand(dto.getMaqCodigo()).toUri();
		
				return ResponseEntity.created(uri).body(dto);
	}
	
	@ApiOperation(value="Atualiza maquina")
	@PutMapping(value = "/{maqCodigo}")
	public ResponseEntity<MaquinaDTO> update(@PathVariable Integer maqCodigo,@RequestBody MaquinaDTO dto){
		dto = service.update (maqCodigo, dto);
		return ResponseEntity.ok().body(dto);
	}			
	
	@ApiOperation(value="Deleta maquina")
	@DeleteMapping(value = "/{maqCodigo}")
	public ResponseEntity<Void> delete(@PathVariable Integer maqCodigo){
		service.delete (maqCodigo);
		return ResponseEntity.noContent().build();
	}
	
}
