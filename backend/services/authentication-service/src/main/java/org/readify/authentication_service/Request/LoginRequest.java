package org.readify.authentication_service.Request;

import jakarta.validation.constraints.NotNull;

public record LoginRequest(

    @NotNull(message = "username is Required")
    String username,
    @NotNull(message = "Password is Required")
    String password
){

}