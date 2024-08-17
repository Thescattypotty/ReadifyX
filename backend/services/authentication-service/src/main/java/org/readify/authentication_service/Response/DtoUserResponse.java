package org.readify.authentication_service.Response;

import java.util.List;

public record DtoUserResponse(
    String username,
    String password,
    List<String> roles
){
}
