package com.example.jxr_backend.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.google.common.base.Strings;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

//https://youtu.be/her_7pa0vrg?t=15339
public class JwtTokenFilter extends OncePerRequestFilter {
    @Value("${jwt.private.key}")
    private String secretKey;

    @Override
    protected void doFilterInternal(HttpServletRequest req,
            HttpServletResponse rep,
            FilterChain filterChain) throws ServletException, IOException {
        String auth = req.getHeader("Authorization");
        if (Strings.isNullOrEmpty(auth) || !auth.startsWith("Bearer")) {
            filterChain.doFilter(req, rep);
        } else {
            String token = auth.replace("Bearer ", "");
            // voir https://github.com/auth0/java-jwt
            try {
                Algorithm algorithm = Algorithm.HMAC256(secretKey);
                JWTVerifier verifier = JWT.require(algorithm)
                        .withIssuer("MyApp")
                        .build();
                DecodedJWT jwt = verifier.verify(token);
                String username = jwt.getSubject();
                Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, null);
                SecurityContextHolder.getContext().setAuthentication(authentication);
                filterChain.doFilter(req, rep);
            } catch (JWTVerificationException exception) {
                exception.printStackTrace();
                // rep.sendError(HttpServletResponse.SC_FORBIDDEN);
                throw new RuntimeException(exception.getMessage());
            }
        }

    }
}
