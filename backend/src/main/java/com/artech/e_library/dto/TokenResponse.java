package com.artech.e_library.dto;


import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Set;

@Data
@AllArgsConstructor
public class TokenResponse {

    private String token;
    private Set<String> roles;

}
