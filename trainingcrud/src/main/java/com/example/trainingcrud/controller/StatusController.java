package com.example.trainingcrud.controller;


import com.example.trainingcrud.model.Status;
import com.example.trainingcrud.repository.StatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/status")
public class StatusController {

    @Autowired
    private StatusRepository statusRepository;

    private List<Status> listStatus=new ArrayList<>();

    private Status status=new Status();

    @GetMapping("/listStatus")
    public ResponseEntity<?> getAll(){
        listStatus=statusRepository.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(listStatus);
    }

    @GetMapping("/list/{id}")
    public ResponseEntity<?> getStatusById(@PathVariable Long id){
        status=statusRepository.getReferenceById(id);
        return ResponseEntity.status(HttpStatus.OK).body(status);
    }
}
