package com.example.trainingcrud.service;

import com.example.trainingcrud.model.Status;

import java.util.List;

public interface StatusService {

    List<Status> getAll();

    Status getById(Long id);

}
