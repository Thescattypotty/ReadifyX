package org.readify.authentication_service.Response;

public record JwtResponse(
    String accessToken,
    String refreshToken
) {
    
}
