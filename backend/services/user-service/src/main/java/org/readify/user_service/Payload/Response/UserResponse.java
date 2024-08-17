package org.readify.user_service.Payload.Response;

import java.util.List;
import java.time.LocalDateTime;

public record UserResponse(
    String id,    
    String username,
    String email,
    List<String> roles,
    LocalDateTime createdAt,
    LocalDateTime updatedAt
){

}
    
