package com.Estore.customer;

import com.Estore.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();

        Profile profile = Profile.builder()
                .user(user)
                .build();
        user.setProfile(profile);

        User savedUser = userRepository.save(user);
        return AuthResponse.builder()
                .token("dummy-token")
                .user(userMapper.toDTO(savedUser))
                .build();
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        return AuthResponse.builder()
                .token("dummy-token")
                .user(userMapper.toDTO(user))
                .build();
    }

    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return userMapper.toDTO(user);
    }

    @Transactional
    public UserDTO updateUser(Long id, UserDTO userDTO) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());

        if (userDTO.getProfile() != null) {
            Profile profile = user.getProfile();
            profile.setPhone(userDTO.getProfile().getPhone());
            profile.setAddress(userDTO.getProfile().getAddress());
            profile.setCity(userDTO.getProfile().getCity());
            profile.setCountry(userDTO.getProfile().getCountry());
        }

        User updatedUser = userRepository.save(user);
        return userMapper.toDTO(updatedUser);
    }
}
