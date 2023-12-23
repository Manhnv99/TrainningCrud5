package com.example.trainingcrud.serviceImpl;

import com.example.trainingcrud.model.Status;
import com.example.trainingcrud.repository.StatusRepository;
import com.example.trainingcrud.service.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StatusServiceImpl implements StatusService {

    @Autowired
    private StatusRepository statusRepository;

    @Override
    public List<Status> getAll() {
        return statusRepository.findAll();
    }

    @Override
    public Status getById(Long id) {
        return statusRepository.getReferenceById(id);
    }
}
