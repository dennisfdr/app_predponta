package com.br.predponta.app.servicies;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.br.predponta.app.entities.Category;
import com.br.predponta.app.repositories.CategoryRepository;


@Service
public class CategoryService {
	
	
	@Autowired
	private CategoryRepository repository;
	
	public List<Category> findAll(){
		return repository.findAll();
	}

}

