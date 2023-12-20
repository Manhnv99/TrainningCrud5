package com.example.trainingcrud.controller;


import com.example.trainingcrud.model.SubCategory;
import com.example.trainingcrud.repository.SubCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin()
@RestController
@RequestMapping("/subcate")
public class SubCategoryController {

    @Autowired
    private SubCategoryRepository subCategoryRepository;

    private List<SubCategory> listSubCate=new ArrayList<>();

    private SubCategory subCategory=new SubCategory();

    @GetMapping("/listSubCate")
    public ResponseEntity<?> getAll(){
        listSubCate=subCategoryRepository.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(listSubCate);
    }


    @GetMapping("/list/{id}")
    public ResponseEntity<?> getSubCategoryById(@PathVariable Long id){
        subCategory=subCategoryRepository.getReferenceById(id);
        return ResponseEntity.status(HttpStatus.OK).body(subCategory);
    }

}
