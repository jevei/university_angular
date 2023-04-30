package com.example.jxr_backend.service;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.jxr_backend.Entity.Users;
import com.example.jxr_backend.Repository.UsersRepository;

import java.util.Collection;
import java.util.Optional;

@Service("authenticator")
public class UsersDetailsServiceImpl implements UserDetailsService {
    private UsersRepository userRepository;
    private PasswordEncoder passwordEncoder;

    public UsersDetailsServiceImpl(UsersRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<Users> optionalUser = userRepository.findByEmail(email);
        Users user = optionalUser
                .orElseThrow(() -> new UsernameNotFoundException(String.format("Username %s non trouvé", email)));

        return new UserDetails() {
            @Override
            public Collection<? extends GrantedAuthority> getAuthorities() {
                return null;
            }

            @Override
            public String getPassword() {
                return user.getEncrypted_password();
            }

            @Override
            public String getUsername() {
                return user.getEmail();
            }

            @Override
            public boolean isAccountNonExpired() {
                return true;
            }

            @Override
            public boolean isAccountNonLocked() {
                return true;
            }

            @Override
            public boolean isCredentialsNonExpired() {
                return true;
            }

            @Override
            public boolean isEnabled() {
                return true;
            }
        };
    }

    public void save(Users user) {
        user.setEncrypted_password(passwordEncoder.encode(user.getEncrypted_password()));
        this.userRepository.save(user);

    }
}
