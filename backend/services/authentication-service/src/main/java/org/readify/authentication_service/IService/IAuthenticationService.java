package org.readify.authentication_service.IService;

import org.readify.authentication_service.Request.LoginRequest;
import org.readify.authentication_service.Request.RegisterRequest;
import org.readify.authentication_service.Response.DtoUserResponse;
import org.readify.authentication_service.Response.JwtResponse;

public interface IAuthenticationService {

    JwtResponse login(LoginRequest loginRequest);
    void register(RegisterRequest registerRequest);
    DtoUserResponse getUser(String username);
}
