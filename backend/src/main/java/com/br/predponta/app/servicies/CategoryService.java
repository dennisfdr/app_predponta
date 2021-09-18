package com.br.predponta.app.servicies;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.br.predponta.app.entities.Category;
import com.br.predponta.app.repositories.CategoryRepository;


@Service
public class CategoryService {
	
	
	@Autowired
	private CategoryRepository repository;
	
	@Transactional (readOnly = true)
	public List<Category> findAll(){
		return repository.findAll();
	}

}

