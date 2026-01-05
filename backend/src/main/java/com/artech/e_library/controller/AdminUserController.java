package com.artech.e_library.controller;


import com.artech.e_library.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminUserController {

    @Autowired
    private UserRepository userRepository;


    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @PutMapping("/users/disable/{id}")
    public ResponseEntity<?> disableUser(@PathVariable Long id){
        return userRepository.findById(id).map(user -> {
            user.setEnabled(false);
            userRepository.save(user);
            return ResponseEntity.ok("User disabled successfully");
        }).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/users/enable/{id}")
    public ResponseEntity<?> enableUser(@PathVariable Long id){
        return userRepository.findById(id).map(user -> {
            user.setEnabled(true);
            userRepository.save(user);
            return ResponseEntity.ok("User enabled successfully");
        }).orElse(ResponseEntity.notFound().build());
    }

}
