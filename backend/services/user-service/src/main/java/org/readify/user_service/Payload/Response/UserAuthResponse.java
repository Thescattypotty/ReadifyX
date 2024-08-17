package org.readify.user_service.Payload.Response;

import java.util.List;

public record UserAuthResponse(
    String username,
    String password,
    List<String> roles
) {
    
}
