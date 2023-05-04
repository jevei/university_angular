package com.example.jxr_backend.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.jxr_backend.entity.Users;
import com.example.jxr_backend.repository.UserRepository;
import com.example.jxr_backend.service.impl.UserDetailsServiceImpl;

import io.swagger.annotations.Api;

@RestController
@RequestMapping(path = "/api/users")
@Api(value = "ActControllerAPI", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {
    @Autowired
    private UserRepository visitorRepository;

    private final UserDetailsServiceImpl userDetailsService;

    public UserController(UserDetailsServiceImpl userDetailsService, JwtEncoder encoder) {
        this.userDetailsService = userDetailsService;
    }

    @GetMapping
    public List<Users> getAllVisitors() {
        return visitorRepository.findAll();
    }

    @PostMapping(path = "/signup")
    public void create(@RequestBody Users user) {
        userDetailsService.save(user);
        /*
         * Users springUser = (Users) user;
         * Instant now = Instant.now();
         * long expiry = 36000L;
         * JSONObject jo = new JSONObject();
         * jo.put("email", UserDTO.fromEntity(springUser).getEmail());
         * jo.put("firstname", UserDTO.fromEntity(springUser).getFirstname());
         * jo.put("lastname", UserDTO.fromEntity(springUser).getLastname());
         * jo.put("phone_number", UserDTO.fromEntity(springUser).getPhone_number());
         * jo.put("is_admin", UserDTO.fromEntity(springUser).isIs_admin());
         * System.out.println(jo);
         * JwtClaimsSet claims = JwtClaimsSet.builder()
         * .issuer("self")
         * .issuedAt(now)
         * .expiresAt(now.plusSeconds(expiry)).subject(String.valueOf(jo))
         * .build();
         * return
         * this.encoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
         */
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
