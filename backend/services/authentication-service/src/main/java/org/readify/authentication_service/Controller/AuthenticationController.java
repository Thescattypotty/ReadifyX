package org.readify.authentication_service.Controller;

import org.readify.authentication_service.Request.LoginRequest;
import org.readify.authentication_service.Request.RegisterRequest;
import org.readify.authentication_service.Response.DtoUserResponse;
import org.readify.authentication_service.Response.JwtResponse;
import org.readify.authentication_service.Service.AuthenticationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody @Valid LoginRequest loginRequest)
    {
        return ResponseEntity.ok(authenticationService.login(loginRequest));
    }
    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody @Valid RegisterRequest registerRequest)
    {
        System.out.println("Trying to register");
        authenticationService.register(registerRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
    @GetMapping("/user")
    public ResponseEntity<DtoUserResponse> getCurrentUser(@RequestParam String username)
    {
        return ResponseEntity.ok(authenticationService.getUser(username));
    }
}
