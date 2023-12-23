package com.example.trainingcrud.controller;


import com.example.trainingcrud.model.Brand;
import com.example.trainingcrud.model.Product;
import com.example.trainingcrud.repository.ProductRepository;
import com.example.trainingcrud.request.ProductRequest;
import com.example.trainingcrud.service.ProductService;
import jakarta.persistence.Query;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
    private ProductService productService;


    @PostMapping("/add")
    public ResponseEntity<?> addProduct(@RequestBody @Valid ProductRequest productRequest){
        return ResponseEntity.status(HttpStatus.CREATED).body(productService.add(productRequest));
    }

    @GetMapping("/listProduct")
    public ResponseEntity<?> getAll(){
        return ResponseEntity.status(HttpStatus.OK).body(productService.getAll());
    }

    @DeleteMapping("/remove/{id}")
    public ResponseEntity<?> remove(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(productService.deleteById(id));
    }

    @PutMapping("/updateProduct/{id}")
    public ResponseEntity<?> update(@PathVariable Long id,@RequestBody @Valid ProductRequest productRequest){
        return ResponseEntity.status(HttpStatus.OK).body(productService.updateProduct(id,productRequest));
    }


    @GetMapping("/list/{id}")
    public ResponseEntity<?> getProductById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(productService.getById(id));
    }


}
