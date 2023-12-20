package com.example.trainingcrud.controller;

import com.example.trainingcrud.model.ProductBrand;
import com.example.trainingcrud.repository.ProductBrandRepository;
import com.example.trainingcrud.response.ProductBrandResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/productBrand")
public class ProductBrandController {

    @Autowired
    private ProductBrandRepository productBrandRepository;

    private List<ProductBrandResponse> productBrandResponseList=new ArrayList<>();

    private List<ProductBrand> productBrandList=new ArrayList<>();

    private ProductBrand productBrand=new ProductBrand();

    private ProductBrandResponse productBrandResponse=new ProductBrandResponse();

    @GetMapping("/list")
    public ResponseEntity<?> getAll(){
        productBrandResponseList=productBrandRepository.getAll();
        return ResponseEntity.status(HttpStatus.OK).body(productBrandResponseList);
    }


    @GetMapping("/list/{id}")
    public ResponseEntity<?> getAll(@PathVariable Long id){
        productBrandResponse=productBrandRepository.getProductBrandById(id);
        return ResponseEntity.status(HttpStatus.OK).body(productBrandResponse);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addProductBrand(@RequestBody ProductBrand productBrandAdd){
        productBrand=productBrandRepository.save(productBrandAdd);
        return ResponseEntity.status(HttpStatus.OK).body(productBrand);
    }


    @GetMapping("/find")
    public ResponseEntity<?> findByAll(
            @RequestParam (name = "name",required = false) String pname,
            @RequestParam (name = "price",required = false) Double price,
            @RequestParam (name = "brandname",required = false) String brandName,
            @RequestParam (name = "catename",required = false) String cateName,
            @RequestParam (name = "statusname",required = false) String statusName
    ){
        productBrandResponseList=productBrandRepository.findByAll(pname,price ,brandName,cateName,statusName);
        return ResponseEntity.status(HttpStatus.OK).body(productBrandResponseList);
    }


    @GetMapping("/search")
    public ResponseEntity<?> searchByAll(@RequestParam(name = "keyword",required = false,defaultValue = "") String query){
        productBrandResponseList=productBrandRepository.searchByAll(query);
        return ResponseEntity.status(HttpStatus.OK).body(productBrandResponseList);
    }

    @DeleteMapping("/remove/{id}")
    public ResponseEntity<?> remove(@PathVariable Long id){
        productBrandRepository.deleteById(id);
        return ResponseEntity.status(HttpStatus.OK).body(true);
    }

    @GetMapping("/listProductBrand/{id}")
    public ResponseEntity<?> list(@PathVariable Long id){
        Optional productBrand=productBrandRepository.findById(id);
        return ResponseEntity.status(HttpStatus.OK).body(productBrand);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable Long id,@RequestBody ProductBrand productBrandEdit){
        ProductBrand productBrand=productBrandRepository.getReferenceById(id);
        productBrand.setBrand(productBrandEdit.getBrand());
        productBrand.setProduct(productBrandEdit.getProduct());
        ProductBrand pb=productBrandRepository.save(productBrand);
        return ResponseEntity.status(HttpStatus.OK).body(pb);
    }


}
