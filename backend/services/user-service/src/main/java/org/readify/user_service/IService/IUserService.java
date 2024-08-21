package org.readify.user_service.IService;

import java.util.List;
import java.util.Optional;

import org.readify.user_service.Payload.Request.UserRequest;
import org.readify.user_service.Payload.Response.UserAuthResponse;
import org.readify.user_service.Payload.Response.UserResponse;

public interface IUserService {
    void saveUser(UserRequest userRequest);
    UserResponse getUserById(String id);
    List<UserResponse> getAllUsers();
    Boolean isUserExisting(Optional<String> username , Optional<String> email);
    UserAuthResponse getUserByUsernameforAuth(String username);
    void updateUser(String userId ,UserRequest userRequest);
    void deleteUser(String userId);
}
