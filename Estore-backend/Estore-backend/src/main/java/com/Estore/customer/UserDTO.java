package com.Estore.customer;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private ProfileDTO profile;

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ProfileDTO {
        private String phone;
        private String address;
        private String city;
        private String country;
    }
}
