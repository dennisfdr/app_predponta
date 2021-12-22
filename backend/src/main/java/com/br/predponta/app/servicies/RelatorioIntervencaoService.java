package com.br.predponta.app.servicies;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.br.predponta.app.dto.RelatorioIntervencaoDTO;
import com.br.predponta.app.entities.InspecaoAcusticaLocal;
import com.br.predponta.app.entities.RelatorioIntervencao;

import com.br.predponta.app.repositories.InspecaoAcusticaLocalRepository;
import com.br.predponta.app.repositories.RelatorioIntervencaoRepository;
import com.br.predponta.app.servicies.exceptions.DataBaseException;
import com.br.predponta.app.servicies.exceptions.ResourceNotFoundException;


@Service
public class RelatorioIntervencaoService {
	
	
	@Autowired
	private  RelatorioIntervencaoRepository repository;
	@Autowired
    private InspecaoAcusticaLocalRepository inspecaoacusticalocalRepository;
	
	@Transactional (readOnly= true)
	public List <RelatorioIntervencaoDTO> findAll(){
		List<RelatorioIntervencao> list =repository.findAll();
		return list.stream().map(x -> new  RelatorioIntervencaoDTO(x)).collect(Collectors.toList());
	}
	
		
	@Transactional (readOnly = true)
    public Page<RelatorioIntervencaoDTO> findAllPaged(Pageable pageable){
        Page <RelatorioIntervencao> list=repository.findAll(pageable);
        return list.map(x -> new  RelatorioIntervencaoDTO(x));
    }
	
	@Transactional (readOnly = true)
	public  RelatorioIntervencaoDTO findById(Integer riCodigo) {
		Optional< RelatorioIntervencao> obj = repository.findById(riCodigo);
		 RelatorioIntervencao entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new  RelatorioIntervencaoDTO(entity);
	}
	
	@Transactional
	public  RelatorioIntervencaoDTO insert( RelatorioIntervencaoDTO dto) {
		 RelatorioIntervencao entity = new  RelatorioIntervencao();      
         
         entity.setRiCodigo(dto.getRiCodigo());
         entity.setRiFalha(dto.getRiFalha());     
	     entity.setRiEspecificacaoFalha(dto.getRiEspecificacaoFalha());
	     entity.setRiPosicao(dto.getRiPosicao());
	     entity.setRiAcaoProposta(dto.getRiAcaoProposta());
	     entity.setRiEspectro(dto.getRiEspectro());
	     entity.setRiCurvaTendencia(dto.getRiCurvaTendencia());
	     entity.setRiVideo(dto.getRiVideo());
	     entity.setRiStatus(dto.getRiStatus());
	     entity.setRiDataAbertura(dto.getRiDataAbertura());
	     entity.setRiFotoComponente(dto.getRiFotoComponente());
	     entity.setRiHaviaFalha(dto.getRiHaviaFalha());
	     entity.setRiHaviaFalhaObs(dto.getRiHaviaFalhaObs());
	     entity.setRiDiagnosticoFalha(dto.getRiDiagnosticoFalha());
	     entity.setRiDiagnosticoFalhaObs(dto.getRiDiagnosticoFalhaObs());
	     entity.setRiTrabalhoAlem(dto.getRiTrabalhoAlem());
	     entity.setRiTrabalhoAlemObs(dto.getRiTrabalhoAlemObs());
	     entity.setRiDataIntervencao(dto.getRiDataIntervencao());
	     entity.setRiTempoExecucao(dto.getRiTempoExecucao());
	     entity.setRiResponsavel(dto.getRiResponsavel());
	     entity.setRiNumOs(dto.getRiNumOs());
	     entity.setRiStatusAvaliacao(dto.getRiStatusAvaliacao());
	     entity.setRiCategoria(dto.getRiCategoria());
	     entity.setRiCustoPreditiva(dto.getRiCustoPreditiva());
	     entity.setRiCustoCorretiva(dto.getRiCustoCorretiva());
	     entity.setRiQuebraEquipamento(dto.getRiQuebraEquipamento());

		 InspecaoAcusticaLocal inspecaoacusticalocal = inspecaoacusticalocalRepository.getOne(dto.getInspecaoAcusticaLocal());
         entity.setInspecaoAcusticaLocal(inspecaoacusticalocal); 
         
		 entity = repository.save(entity);
		 		return new  RelatorioIntervencaoDTO(entity);	
	}
	
	@Transactional
	public  RelatorioIntervencaoDTO update(Integer riCodigo,  RelatorioIntervencaoDTO dto) {
		try {
			 RelatorioIntervencao entity = repository.getOne(riCodigo);

			 entity.setRiCodigo(dto.getRiCodigo());
	         entity.setRiFalha(dto.getRiFalha());     
		     entity.setRiEspecificacaoFalha(dto.getRiEspecificacaoFalha());
		     entity.setRiPosicao(dto.getRiPosicao());
		     entity.setRiAcaoProposta(dto.getRiAcaoProposta());
		     entity.setRiEspectro(dto.getRiEspectro());
		     entity.setRiCurvaTendencia(dto.getRiCurvaTendencia());
		     entity.setRiVideo(dto.getRiVideo());
		     entity.setRiStatus(dto.getRiStatus());
		     entity.setRiDataAbertura(dto.getRiDataAbertura());
		     entity.setRiFotoComponente(dto.getRiFotoComponente());
		     entity.setRiHaviaFalha(dto.getRiHaviaFalha());
		     entity.setRiHaviaFalhaObs(dto.getRiHaviaFalhaObs());
		     entity.setRiDiagnosticoFalha(dto.getRiDiagnosticoFalha());
		     entity.setRiDiagnosticoFalhaObs(dto.getRiDiagnosticoFalhaObs());
		     entity.setRiTrabalhoAlem(dto.getRiTrabalhoAlem());
		     entity.setRiTrabalhoAlemObs(dto.getRiTrabalhoAlemObs());
		     entity.setRiDataIntervencao(dto.getRiDataIntervencao());
		     entity.setRiTempoExecucao(dto.getRiTempoExecucao());
		     entity.setRiResponsavel(dto.getRiResponsavel());
		     entity.setRiNumOs(dto.getRiNumOs());
		     entity.setRiStatusAvaliacao(dto.getRiStatusAvaliacao());
		     entity.setRiCategoria(dto.getRiCategoria());
		     entity.setRiCustoPreditiva(dto.getRiCustoPreditiva());
		     entity.setRiCustoCorretiva(dto.getRiCustoCorretiva());
		     entity.setRiQuebraEquipamento(dto.getRiQuebraEquipamento());
			 
			 InspecaoAcusticaLocal inspecaoacusticalocal = inspecaoacusticalocalRepository.getOne(dto.getInspecaoAcusticaLocal());
	         entity.setInspecaoAcusticaLocal(inspecaoacusticalocal); 
			 
			 entity = repository.save(entity);
					return new  RelatorioIntervencaoDTO(entity);
		}
		catch(EntityNotFoundException e) {
		throw new  ResourceNotFoundException("Id not Found" + riCodigo);
		}
	}

	public void delete(Integer riCodigo) {
		try {
		repository.deleteById(riCodigo);
		}
		catch(EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException ("Id Not Found Exception");
		}
		catch (DataIntegrityViolationException e) {
			throw new DataBaseException("Integity Violation");
		}
	}
}

