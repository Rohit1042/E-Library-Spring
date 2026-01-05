package com.artech.e_library.service;


import com.artech.e_library.dto.RegisterDto;
import com.artech.e_library.model.Role;
import com.artech.e_library.model.User;
import com.artech.e_library.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    public User registerUser(RegisterDto dto){

        if (userRepository.existsByUsername(dto.getUsername())){
            throw new IllegalArgumentException("Username already taken");
        }
        if (userRepository.existsByEmail(dto.getEmail())){
            throw new IllegalArgumentException("Email already in use");
        }

        User user = User.builder()
                .username(dto.getUsername())
                .email(dto.getEmail())
                .password(passwordEncoder.encode(dto.getPassword()))
                .roles(Set.of(Role.ROLE_USER))
                .enabled(true)
                .build();

        return userRepository.save(user);

    }


}
