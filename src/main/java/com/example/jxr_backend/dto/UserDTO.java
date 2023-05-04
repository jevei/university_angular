package com.example.jxr_backend.dto;

import com.example.jxr_backend.entity.Users;
import com.fasterxml.jackson.annotation.JsonProperty;

public class UserDTO {
    @JsonProperty("email")
    private String email;

    @JsonProperty("firstname")
    private String firstname;

    @JsonProperty("lastname")
    private String lastname;

    @JsonProperty("phone_number")
    private String phone_number;

    @JsonProperty("is_admin")
    private boolean is_admin;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getPhone_number() {
        return phone_number;
    }

    public void setPhone_number(String phone_number) {
        this.phone_number = phone_number;
    }

    public boolean isIs_admin() {
        return is_admin;
    }

    public void setIs_admin(boolean is_admin) {
        this.is_admin = is_admin;
    }

    public UserDTO() {
    }

    // you can do any transforamtion/validation here
    public static UserDTO fromEntity(Users user) {
        UserDTO dto = new UserDTO();
        dto.setEmail(user.getEmail());
        dto.setFirstname(user.getFirstname());
        dto.setLastname(user.getLastname());
        dto.setPhone_number(user.getPhone_number());
        dto.setIs_admin(user.isIs_admin());
        return dto;
    }
}
