package com.example.trainingcrud.serviceImpl;

import com.example.trainingcrud.model.SubCategory;
import com.example.trainingcrud.repository.SubCategoryRepository;
import com.example.trainingcrud.service.SubCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class SubCateGoryServiceImpl implements SubCategoryService {

    @Autowired
    private SubCategoryRepository subCategoryRepository;


    @Override
    public List<SubCategory> getAll() {
        return subCategoryRepository.findAll();
    }

    @Override
    public SubCategory getById(Long id) {
        return subCategoryRepository.getReferenceById(id);
    }
}
