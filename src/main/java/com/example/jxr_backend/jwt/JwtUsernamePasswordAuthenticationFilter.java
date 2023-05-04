package com.example.jxr_backend.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.jxr_backend.dto.UserCredentialDTO;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;
import java.util.Calendar;
import java.util.Date;

public class JwtUsernamePasswordAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private AuthenticationManager authenticationManager;
    @Value("${jwt.private.key}")
    private String secretKey;

    public JwtUsernamePasswordAuthenticationFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
            HttpServletResponse response) throws AuthenticationException {
        try {

            UserCredentialDTO credentialDTO = new ObjectMapper()
                    .readValue(request.getInputStream(),
                            UserCredentialDTO.class);

            Authentication auth = new UsernamePasswordAuthenticationToken(
                    credentialDTO.getEmail(), credentialDTO.getEncrypted_password());
            authenticationManager.authenticate(auth);// check si un et pw match

            return auth;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request,
            HttpServletResponse response,
            FilterChain chain,
            Authentication authResult) throws IOException, ServletException {

        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.DAY_OF_YEAR, 1);

        String token = JWT.create()
                .withSubject(authResult.getName())
                .withIssuer("MyApp")
                // .withArrayClaim("authorities", authResult.getAuthorities().toArray(new
                // String[]{}))
                .withIssuedAt(new Date())
                .withExpiresAt(cal.getTime())
                .sign(Algorithm.HMAC256(secretKey));

        response.addHeader("Authorization", "Bearer " + token);
    }
}
