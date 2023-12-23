package com.example.trainingcrud.service;

import com.example.trainingcrud.model.SubCategory;

import java.util.List;

public interface SubCategoryService {

    List<SubCategory> getAll();

    SubCategory getById(Long id);

}
