package com.example.trainingcrud.service;

import com.example.trainingcrud.model.Brand;

import java.util.List;

public interface BrandService {

    List<Brand> getAll();

    Brand getById(Long id);
}
