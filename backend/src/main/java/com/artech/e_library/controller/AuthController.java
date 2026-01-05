package com.artech.e_library.controller;


import com.artech.e_library.dto.AuthDto;
import com.artech.e_library.dto.RegisterDto;
import com.artech.e_library.dto.TokenResponse;
import com.artech.e_library.model.User;
import com.artech.e_library.repository.UserRepository;
import com.artech.e_library.security.JwtUtil;
import com.artech.e_library.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterDto dto){

        try{
            User user = userService.registerUser(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(user);
        }catch (IllegalArgumentException ex){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("message", ex.getMessage()));
        }



    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthDto dto){
        try {
            Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(dto.getUsername(), dto
                    .getPassword()));

            UserDetails details = (UserDetails) auth.getPrincipal();
            Set<String> roles = details.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toSet());

            String token = jwtUtil.generateToken(details.getUsername(), roles);

            return ResponseEntity.ok(new TokenResponse(token, roles));
        }catch (BadCredentialsException e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid Credentials"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "Login failed" + e.getMessage()));
        }


    }


}
