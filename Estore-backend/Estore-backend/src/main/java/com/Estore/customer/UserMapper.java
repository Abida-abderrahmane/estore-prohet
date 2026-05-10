package com.Estore.customer;

import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserDTO toDTO(User user) {
        if (user == null) return null;

        return UserDTO.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .profile(user.getProfile() != null ? toProfileDTO(user.getProfile()) : null)
                .build();
    }

    private UserDTO.ProfileDTO toProfileDTO(Profile profile) {
        return UserDTO.ProfileDTO.builder()
                .phone(profile.getPhone())
                .address(profile.getAddress())
                .city(profile.getCity())
                .country(profile.getCountry())
                .build();
    }
}
