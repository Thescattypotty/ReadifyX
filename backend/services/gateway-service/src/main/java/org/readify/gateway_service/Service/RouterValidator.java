package org.readify.gateway_service.Service;

import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.function.Predicate;

@Service
public class RouterValidator {
    
    public static final List<String> openEndPoints = List.of(
        "/api/v1/auth/login",
        "/api/v1/auth/register"
    );
    public Predicate<ServerHttpRequest> isSecured = request -> openEndPoints.stream()
            .noneMatch(uri -> request.getURI().getPath().contains(uri));
}

