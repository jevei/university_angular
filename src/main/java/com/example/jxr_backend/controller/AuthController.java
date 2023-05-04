package com.example.jxr_backend.controller;

import org.json.JSONObject;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.jxr_backend.dto.UserDTO;
import com.example.jxr_backend.entity.Users;
import java.time.Instant;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final JwtEncoder encoder;

    public AuthController(JwtEncoder encoder) {
        this.encoder = encoder;
    }

    @PostMapping("")
    public String auth(Authentication authentication) {
        Users springUser = (Users) authentication.getPrincipal();
        // Optional<Users> app = userRepo.findByEmail(springUser.getEmail());
        /*
         * System.out
         * .println(authentication.getName() + "," + app.get().getFirstname() + "," +
         * app.get().getLastname() + ","
         * + app.get().getPhone_number() + "," + app.get().isIs_admin());
         */
        Instant now = Instant.now();
        long expiry = 36000L;
        String scope = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));
        // JSONParser temp = new
        // JSONParser(String.valueOf(UserDTO.fromEntity(springUser)));
        JSONObject jo = new JSONObject();
        jo.put("email", UserDTO.fromEntity(springUser).getEmail());
        jo.put("firstname", UserDTO.fromEntity(springUser).getFirstname());
        jo.put("lastname", UserDTO.fromEntity(springUser).getLastname());
        jo.put("phone_number", UserDTO.fromEntity(springUser).getPhone_number());
        jo.put("is_admin", UserDTO.fromEntity(springUser).isIs_admin());
        System.out.println(jo);
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(now)
                .expiresAt(now.plusSeconds(expiry)).subject(String.valueOf(jo))
                // .subject(authentication.getName() + "," + app.get().getFirstname() + "," +
                // app.get().getLastname() + "," + app.get().getPhone_number() + "," +
                // app.get().isIs_admin())
                .claim("scope", scope)
                .build();
        return this.encoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }
}
