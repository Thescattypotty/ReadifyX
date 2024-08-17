package org.readify.authentication_service.Service;

import java.util.HashMap;
import java.util.Map;

import org.readify.authentication_service.Exception.BadCredentialsException;
import org.readify.authentication_service.Exception.RegistrationFailedException;
import org.readify.authentication_service.Exception.UserAlreadyExistException;
import org.readify.authentication_service.FeignClient.UserClient;
import org.readify.authentication_service.IService.IAuthenticationService;
import org.readify.authentication_service.Request.LoginRequest;
import org.readify.authentication_service.Request.RegisterRequest;
import org.readify.authentication_service.Response.DtoUserResponse;
import org.readify.authentication_service.Response.JwtResponse;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import feign.FeignException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService implements IAuthenticationService
{

    private final JwtUtilService jwtUtilService;
    private final PasswordEncoder passwordEncoder;
    private final UserClient userClient;



    @Override
    public JwtResponse login(LoginRequest loginRequest) {

        DtoUserResponse user = userClient.getUserByUsername(loginRequest.username())
            .orElseThrow(() -> new BadCredentialsException("Auth Service :: Username incorrect"));

        if (!passwordEncoder.matches(loginRequest.password(), user.password())) {
            throw new BadCredentialsException("Auth Service :: password incorrect");
        }
        // generate accessToken
        String accessToken = jwtUtilService.generateToken(user.username(), user.roles(), "ACCESS");

        // generate refreshToken
        String refreshToken = jwtUtilService.generateToken(user.username(), user.roles(), "REFRESH");

        return new JwtResponse(accessToken, refreshToken);
    }

    @Override
    public void register(RegisterRequest registerRequest) {
        // verify if username & password already exist else throw exception !
        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("email", registerRequest.email());
        requestBody.put("username", registerRequest.username());
        if(userClient.UserExist(requestBody) == true)
        {
            throw new UserAlreadyExistException("Auth Service :: username or email already in used");
        }
        // generate new password
        String encodedPassword = passwordEncoder.encode(registerRequest.password());

        // post entity to save the user
        try {
            userClient.saveUser(
                new RegisterRequest(
                    registerRequest.username(),
                    registerRequest.email(),
                    encodedPassword
                )
            );
        } catch (FeignException e) {
            throw new RegistrationFailedException("Auth Service :: Registration Failed");
        }
    }
    
}
