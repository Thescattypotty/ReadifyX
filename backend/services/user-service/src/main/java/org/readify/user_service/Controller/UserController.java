package org.readify.user_service.Controller;

import java.util.List;
import java.util.Optional;

import org.readify.user_service.Payload.Request.UserRequest;
import org.readify.user_service.Payload.Response.UserAuthResponse;
import org.readify.user_service.Payload.Response.UserResponse;
import org.readify.user_service.Service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {
    
    private final UserService userService;

    @PostMapping
    public ResponseEntity<Void> saveNewUser(@RequestBody @Valid UserRequest userRequest)
    {
        userService.saveUser(userRequest);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping
    public ResponseEntity<List<UserResponse>> findAllUsers()
    {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> findUserById(@PathVariable("id") String userId)
    {
        return ResponseEntity.ok(userService.getUserById(userId));
    }
    @PostMapping("/auth/login")
    public ResponseEntity<UserAuthResponse> findUserByUsername(@RequestBody String usernmae)
    {
        return ResponseEntity.ok(userService.getUserByUsernameforAuth(usernmae));
    }

    @PostMapping("/exist")
    public ResponseEntity<Boolean> isUserExist(@RequestBody(required = false) Optional<String> username,@RequestBody(required = false) Optional<String> email)
    {
        return ResponseEntity.ok(userService.isUserExisting(username, email));
    }
}
