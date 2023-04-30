package com.example.jxr_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.jxr_backend.Entity.Users;
import com.example.jxr_backend.Repository.UsersRepository;

import java.util.List;

@RestController
@RequestMapping(path = "/api/users")
public class UsersController {
    @Autowired
    private UsersRepository visitorRepository;

    @GetMapping
    public List<Users> getAllVisitors() {
        return visitorRepository.findAll();
    }

    @PostMapping
    public Users createVisitor(@RequestBody Users visitor) {
        return visitorRepository.save(visitor);
    }

    @GetMapping("/{id}")
    public Users getVisitorById(@PathVariable Long id) {
        return visitorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Visitor " + id + " is not found!"));
    }

    @PutMapping("/{id}")
    public Users updateVisitor(@PathVariable Long id, @RequestBody Users visitorDetails) {
        Users visitor = visitorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Visitor " + id + " is not found!"));

        visitor.setIs_admin(visitorDetails.isIs_admin());
        visitor.setEmail(visitorDetails.getEmail());
        visitor.setEncrypted_password(visitorDetails.getEncrypted_password());
        visitor.setFirstname(visitorDetails.getFirstname());
        visitor.setLastname(visitorDetails.getLastname());
        visitor.setPhone_number(visitorDetails.getPhone_number());

        return visitorRepository.save(visitor);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteVisitor(@PathVariable Long id) {
        Users visitor = visitorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Visitor " + id + " is not found!"));

        visitorRepository.delete(visitor);

        return ResponseEntity.ok().build();
    }
}
