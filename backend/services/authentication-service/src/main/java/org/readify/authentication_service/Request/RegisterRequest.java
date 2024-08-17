package org.readify.authentication_service.Request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

public record RegisterRequest(
    @NotNull(message = "Username is required") 
    String username,
    @NotNull(message = "Username is required")
    @Email 
    String email,
    @NotNull(message = "Password is required") 
    String password
) {
    
}
