package com.example.trainingcrud.service;

import com.example.trainingcrud.model.Product;
import com.example.trainingcrud.request.ProductRequest;
import com.example.trainingcrud.response.ProductResponse;

import java.util.List;

public interface ProductService {

    ProductResponse add(ProductRequest productRequest);

    List<ProductResponse> getAll();

    ProductResponse deleteById(Long id);

    ProductResponse updateProduct(Long id,ProductRequest productRequest);

    List<ProductResponse> getById(Long id);


}
