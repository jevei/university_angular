package com.example.jxr_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.jxr_backend.entity.Products;

public interface ProductRepository extends JpaRepository<Products, Long> {
}
