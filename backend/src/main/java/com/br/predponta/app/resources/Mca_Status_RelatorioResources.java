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

import com.br.predponta.app.dto.Mca_Status_RelatorioDTO;
import com.br.predponta.app.servicies.Mca_Status_RelatorioService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping(value= "/mca_status_relatorios")
@Api(value="API REST Mca_Status_Relatorios")
@CrossOrigin(origins = "*")

public class Mca_Status_RelatorioResources {
	
	@Autowired
	private Mca_Status_RelatorioService service;
	
	@ApiOperation(value="Busca todas as mca_status_relatorios")
	@GetMapping
	public ResponseEntity<List<Mca_Status_RelatorioDTO>> findAll(){
		List <Mca_Status_RelatorioDTO> list = service.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	
	//@GetMapping
    //public ResponseEntity<Page<Mca_Status_RelatorioDTO>> findAll(Pageable pageable){

     //   Page <Mca_Status_RelatorioDTO> list = service.findAllPaged(pageable);
     //   return ResponseEntity.ok().body(list);
    //    }
	
	
	@ApiOperation(value="Busca Mca_Status_Relatorio por ID")
	@GetMapping(value = "/{mcasr_codigo}")
	public ResponseEntity<Mca_Status_RelatorioDTO> findById(@PathVariable Long mcasr_codigo){
		Mca_Status_RelatorioDTO dto = service.findById(mcasr_codigo);
			return ResponseEntity.ok().body(dto);	
	}
	
	@ApiOperation(value="Salva Mca_Status_Relatorio")
	@PostMapping
	public ResponseEntity<Mca_Status_RelatorioDTO> insert(@RequestBody Mca_Status_RelatorioDTO dto){
		dto = service.insert (dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{mcasr_codigo}")
				.buildAndExpand(dto.getMcasr_codigo()).toUri();
		
				return ResponseEntity.created(uri).body(dto);
	}
	
	@ApiOperation(value="Atualiza mca_status_relatorio")
	@PutMapping(value = "/{mcasr_codigo}")
	public ResponseEntity<Mca_Status_RelatorioDTO> update(@PathVariable Long mcasr_codigo,@RequestBody Mca_Status_RelatorioDTO dto){
		dto = service.update (mcasr_codigo, dto);
		return ResponseEntity.ok().body(dto);
	}			
	
	@ApiOperation(value="Deleta mca_status_relatorio")
	@DeleteMapping(value = "/{mcasr_codigo}")
	public ResponseEntity<Void> delete(@PathVariable Long mcasr_codigo){
		service.delete (mcasr_codigo);
		return ResponseEntity.noContent().build();
	}
	
}
