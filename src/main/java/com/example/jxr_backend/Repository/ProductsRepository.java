package com.example.jxr_backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.jxr_backend.entity.Products;

public interface ProductsRepository extends JpaRepository<Products, Long> {
}
