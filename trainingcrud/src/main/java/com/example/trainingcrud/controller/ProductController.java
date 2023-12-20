package com.example.trainingcrud.controller;


import com.example.trainingcrud.model.Brand;
import com.example.trainingcrud.model.Product;
import com.example.trainingcrud.repository.ProductRepository;
import jakarta.persistence.Query;
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
    private ProductRepository productRepository;

    private Product product=new Product();

    private List<Product> productList=new ArrayList<>();


    @PostMapping("/add")
    public ResponseEntity<?> addProduct(@RequestBody Product productAdd){
        product=productRepository.save(productAdd);
        return ResponseEntity.status(HttpStatus.OK).body(product);
    }

    @GetMapping("/listProduct")
    public ResponseEntity<?> getAll(){
        productList=productRepository.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(productList);
    }

    @DeleteMapping("/remove/{id}")
    public ResponseEntity<?> remove(@PathVariable Long id){
        productRepository.deleteById(id);
        return ResponseEntity.status(HttpStatus.OK).body(true);
    }

    @PutMapping("/updateProduct/{id}")
    public ResponseEntity<?> update(@PathVariable Long id,@RequestBody Product productEdit){
        Product product=productRepository.getReferenceById(id);
        product.setProductName(productEdit.getProductName());
        product.setColor(productEdit.getColor());
        product.setQuantity(productEdit.getQuantity());
        product.setSellPrice(productEdit.getSellPrice());
        product.setOriginPrice(productEdit.getOriginPrice());
        product.setDescription(productEdit.getDescription());
        product.setSubCategory(productEdit.getSubCategory());
        product.setStatus(productEdit.getStatus());
        Product p=productRepository.save(product);
        return ResponseEntity.status(HttpStatus.OK).body(p);
    }


    @GetMapping("/list/{id}")
    public ResponseEntity<?> getProductById(@PathVariable Long id){
        product=productRepository.getReferenceById(id);
        return ResponseEntity.status(HttpStatus.OK).body(product);
    }


}
