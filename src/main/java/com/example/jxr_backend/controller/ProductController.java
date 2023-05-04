package com.example.jxr_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.jxr_backend.entity.Products;
import com.example.jxr_backend.repository.ProductRepository;

import java.util.List;

@RestController
@RequestMapping(path = "/api/products")
public class ProductController {
  @Autowired
  private ProductRepository drugRepository;

  @GetMapping
  public List<Products> getAllDrugs() {
    return drugRepository.findAll();
  }

  @PostMapping
  public Products createDrug(@RequestBody Products drug) {
    return drugRepository.save(drug);
  }

  @GetMapping("/{id}")
  public Products getDrugById(@PathVariable Long id) {
    return drugRepository.findById(id).orElseThrow(() -> new RuntimeException("Drug " + id + " is not found!"));
  }

  @PutMapping("/{id}")
  public Products updateDrug(@PathVariable Long id, @RequestBody Products drugDetails) {
    Products drug = drugRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Drug " + id + " is not found!"));

    drug.setName(drugDetails.getName());
    drug.setExpiration(drugDetails.getExpiration());
    drug.setDescription(drugDetails.getDescription());
    drug.setLast_input(drugDetails.getLast_input());
    drug.setLast_output(drugDetails.getLast_output());
    drug.setPicture_url(drugDetails.getPicture_url());
    drug.setPrice(drugDetails.getPrice());
    drug.setStock(drugDetails.getStock());

    return drugRepository.save(drug);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteDrug(@PathVariable Long id) {
    Products drug = drugRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Drug " + id + " is not found!"));

    drugRepository.delete(drug);

    return ResponseEntity.ok().build();
  }

}
