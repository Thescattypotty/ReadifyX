package org.readify.user_service.Service;

import java.util.List;
import java.util.UUID;
import java.util.Optional;
import java.util.stream.Collectors;

import org.readify.user_service.Entity.User;
import org.readify.user_service.EntityRepository.UserRepository;
import org.readify.user_service.Exception.UserAlreadyExist;
import org.readify.user_service.Exception.UserNotFoundException;
import org.readify.user_service.IService.IUserService;
import org.readify.user_service.Payload.Mapper.UserMapper;
import org.readify.user_service.Payload.Request.UserRequest;
import org.readify.user_service.Payload.Response.UserAuthResponse;
import org.readify.user_service.Payload.Response.UserResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService
{
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Override
    @Transactional
    public void saveUser(UserRequest userRequest) {
        if(userRepository.existsByUsername(userRequest.username()) || userRepository.existsByEmail(userRequest.email()))
        {
            throw new UserAlreadyExist("User Service :: Cannot Create user because username | email already exist");
        }
        User user = userMapper.toUser(userRequest);
        userRepository.save(user);
    }

    @Override
    public UserResponse getUserById(String id) {
        return userRepository.findById(UUID.fromString(id))
            .map(userMapper::toUserResponse)
            .orElseThrow(() -> new UserNotFoundException("User Service :: User not found with id : " + id));
    }

    @Override
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll()
            .stream()
            .map(userMapper::toUserResponse)
            .collect(Collectors.toList());
    }
    @Override
    public UserAuthResponse getUserByUsernameforAuth(String username)
    {
        return userRepository.findByUsername(username)
                .map(userMapper::toUserAuthResponse)
                .orElseThrow(() -> new UserNotFoundException("User Service :: User not found with username : " + username));
    }

    @Override
    public Boolean isUserExisting(Optional<String> username, Optional<String> email) {
        if(username.isPresent())
        {
            return userRepository.existsByUsername(username.get());
        }
        if(email.isPresent())
        {
            return userRepository.existsByEmail(email.get());
        }
            return false; // throw exception here for bad request !
    }
    
}
