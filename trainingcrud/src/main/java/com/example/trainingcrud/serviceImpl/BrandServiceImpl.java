package com.example.trainingcrud.serviceImpl;

import com.example.trainingcrud.model.Brand;
import com.example.trainingcrud.repository.BrandRepository;
import com.example.trainingcrud.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BrandServiceImpl implements BrandService {

    @Autowired
    private BrandRepository brandRepository;

    @Override
    public List<Brand> getAll() {
        return brandRepository.findAll();
    }

    @Override
    public Brand getById(Long id) {
        return brandRepository.getReferenceById(id);
    }
}
