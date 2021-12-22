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

import com.br.predponta.app.dto.RelatorioIntervencaoDTO;
import com.br.predponta.app.servicies.RelatorioIntervencaoService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(value= "/relatoriointervencaos")
@Api(value="API REST RelatorioIntervencao")
@CrossOrigin(origins = "*")

public class RelatorioIntervencaoResources {
	
	@Autowired
	private RelatorioIntervencaoService service;
	
	@ApiOperation(value="Busca todas as Medições")
	@GetMapping
	public ResponseEntity<List<RelatorioIntervencaoDTO>> findAll(){
		List <RelatorioIntervencaoDTO> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	
	//@GetMapping
    //public ResponseEntity<Page<RelatorioIntervencaoDTO>> findAll(Pageable pageable){

     //   Page <RelatorioIntervencaoDTO> list = service.findAllPaged(pageable);
     //   return ResponseEntity.ok().body(list);
    //    }
	
	
	@ApiOperation(value="Busca Relatório de Intevenção por ID")
	@GetMapping(value = "/{riCodigo}")
	public ResponseEntity<RelatorioIntervencaoDTO> findById(@PathVariable Integer riCodigo){
		RelatorioIntervencaoDTO dto = service.findById(riCodigo);
			return ResponseEntity.ok().body(dto);	
	}
	
	@ApiOperation(value="Salva Relatório de Intevenção")
	@PostMapping
	public ResponseEntity<RelatorioIntervencaoDTO> insert(@RequestBody RelatorioIntervencaoDTO dto){
		dto = service.insert (dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{riCodigo}")
				
				.buildAndExpand(dto.getRiCodigo()).toUri();
		
				return ResponseEntity.created(uri).body(dto);
	}
	
	@ApiOperation(value="Atualiza Relatório de Intevenção")
	@PutMapping(value = "/{riCodigo}")
	public ResponseEntity<RelatorioIntervencaoDTO> update(@PathVariable Integer riCodigo,@RequestBody RelatorioIntervencaoDTO dto){
		dto = service.update (riCodigo, dto);
		return ResponseEntity.ok().body(dto);
	}			
	
	@ApiOperation(value="Deleta Relatório de Intevenção")
	@DeleteMapping(value = "/{riCodigo}")
	public ResponseEntity<Void> delete(@PathVariable Integer riCodigo){
		service.delete (riCodigo);
		return ResponseEntity.noContent().build();
	}
	
}
