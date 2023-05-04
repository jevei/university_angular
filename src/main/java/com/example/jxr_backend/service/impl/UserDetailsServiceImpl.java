package com.example.jxr_backend.service.impl;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.jxr_backend.entity.Users;
import com.example.jxr_backend.repository.UserRepository;

import java.util.Optional;

@Service("authenticator")
public class UserDetailsServiceImpl implements UserDetailsService {
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    public UserDetailsServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<Users> optionalUser = userRepository.findByEmail(email);
        Users user = optionalUser
                .orElseThrow(() -> new UsernameNotFoundException(String.format("Username %s non trouvé", email)));

        return new InternalUser(user);
    }

    public void save(Users user) {
        user.setEncrypted_password(passwordEncoder.encode(user.getEncrypted_password()));
        this.userRepository.save(user);

    }
}
