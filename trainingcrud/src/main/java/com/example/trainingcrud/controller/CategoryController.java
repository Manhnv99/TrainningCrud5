package com.example.trainingcrud.controller;


import com.example.trainingcrud.model.Category;
import com.example.trainingcrud.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/category")
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    private List<Category> listCategory=new ArrayList<>();

    @GetMapping("/listCate")
    public ResponseEntity<?> getAll(){
        listCategory=categoryRepository.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(listCategory);
    }
}
