package org.readify.user_service.Payload.Request;

import java.util.List;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

public record UserRequest(
    
    @NotNull(message = "Username is required")
    String username,
    @NotNull(message = "Username is required")
    @Email
    String email,
    @NotNull(message = "Password is required")
    String password,

    List<String> roles
){
    
}
