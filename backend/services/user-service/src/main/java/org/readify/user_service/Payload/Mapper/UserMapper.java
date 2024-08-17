package org.readify.user_service.Payload.Mapper;

import org.readify.user_service.Entity.User;
import org.readify.user_service.Enum.ERole;
import org.readify.user_service.Payload.Request.UserRequest;
import org.readify.user_service.Payload.Response.UserAuthResponse;
import org.readify.user_service.Payload.Response.UserResponse;
import org.springframework.stereotype.Service;

@Service
public class UserMapper {
    public User toUser(UserRequest userRequest)
    {
        return User.builder()
            .username(userRequest.username())
            .email(userRequest.email())
            .password(userRequest.password())
            .build();
    }
    public UserResponse toUserResponse(User user)
    {
        return new UserResponse(
            user.getId().toString(),
            user.getUsername(),
            user.getEmail(),
            user.getRoles().stream().map(ERole::name).toList(),
            user.getCreatedAt(),
            user.getUpdatedAt()
        );
    }
    public UserAuthResponse toUserAuthResponse(User user)
    {
        return new UserAuthResponse(
            user.getUsername(),
            user.getPassword(),
            user.getRoles().stream().map(ERole::name).toList()
        );
    }
}
