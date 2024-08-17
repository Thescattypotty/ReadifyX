package org.readify.authentication_service.FeignClient;

import java.util.Map;
import java.util.Optional;

import org.readify.authentication_service.Request.RegisterRequest;
import org.readify.authentication_service.Response.DtoUserResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@FeignClient(
    name = "user-service",
    url = "${application.config.user-url}"
)
public interface UserClient {
    
    @PostMapping("/auth/login")
    Optional<DtoUserResponse> getUserByUsername(@RequestBody String username);

    @PostMapping
    void saveUser(@RequestBody RegisterRequest registerRequest);

    @PostMapping("/exist")
    Boolean UserExist(@RequestBody Map<String, String> body);
}
