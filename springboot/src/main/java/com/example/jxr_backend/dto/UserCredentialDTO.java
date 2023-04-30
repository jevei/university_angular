package com.example.jxr_backend.dto;

import lombok.Data;

@Data
public class UserCredentialDTO {
    String email;
    String encrypted_password;
}
