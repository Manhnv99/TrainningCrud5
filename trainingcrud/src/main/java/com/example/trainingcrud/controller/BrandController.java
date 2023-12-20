package com.example.trainingcrud.controller;


import com.example.trainingcrud.model.Brand;
import com.example.trainingcrud.repository.BrandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/brand")
public class BrandController {

    @Autowired
    private BrandRepository brandRepository;

    private List<Brand> listBrand=new ArrayList<>();

    private Brand brand=new Brand();

    @GetMapping("/listBrand")
    public ResponseEntity<?> getAll(){
        listBrand=brandRepository.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(listBrand);
    }

    @GetMapping("/listBrand/{id}")
    public ResponseEntity<?> getBrandById(@PathVariable Long id){
        brand=brandRepository.getReferenceById(id);
        return ResponseEntity.status(HttpStatus.OK).body(brand);
    }

}
