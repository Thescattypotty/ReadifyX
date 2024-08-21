package org.readify.user_service.Service;

import java.util.List;
import java.util.UUID;
import java.util.Optional;
import java.util.stream.Collectors;

import org.readify.user_service.Entity.User;
import org.readify.user_service.EntityRepository.UserRepository;
import org.readify.user_service.Enum.ERole;
import org.readify.user_service.Exception.UserAlreadyExist;
import org.readify.user_service.Exception.UserNotFoundException;
import org.readify.user_service.IService.IUserService;
import org.readify.user_service.Payload.Mapper.UserMapper;
import org.readify.user_service.Payload.Request.UserRequest;
import org.readify.user_service.Payload.Response.UserAuthResponse;
import org.readify.user_service.Payload.Response.UserResponse;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService
{
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void saveUser(UserRequest userRequest) {
        if(userRepository.existsByUsername(userRequest.username()) || userRepository.existsByEmail(userRequest.email()))
        {
            throw new UserAlreadyExist("User Service :: Cannot Create user because username | email already exist");
        }
        User user = userMapper.toUser(userRequest);
        String encodedPassword = passwordEncoder.encode(userRequest.password());
        user.setPassword(encodedPassword);
        if(userRequest.roles() != null)
        {
            user.setRoles(
                userRequest.roles().stream().map(
                    r -> ERole.valueOf(r)).collect(Collectors.toList())
            );
        }
        
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

    @Override
    public void deleteUser(String userId) {
        if(userRepository.existsById(UUID.fromString(userId)))
        {
            userRepository.deleteById(UUID.fromString(userId));
        }
        
    }

    @Override
    public void updateUser(String userId, UserRequest userRequest) {
        User user = userRepository.findById(UUID.fromString(userId))
            .orElseThrow(() -> new UserNotFoundException("User Service :: User not found with id : " + userId));
        
        user.setUsername(userRequest.username());
        user.setEmail(userRequest.email());
        if(!user.getEmail().equals(userRequest.email()))
        {
            if(!userRepository.existsByEmail(userRequest.email()))
            {
                user.setEmail(userRequest.email());
            }else{
                throw new UserAlreadyExist("User Service :: Cannot Create user because email already exist");
            }
        }
        if (!user.getUsername().equals(userRequest.username())) {
            if (!userRepository.existsByUsername(userRequest.username())) {
                user.setUsername(userRequest.username());
            } else {
                throw new UserAlreadyExist("User Service :: Cannot Create user because username already exist");
            }
        }
        user.setRoles(
            userRequest.roles().stream().map(
                    r -> ERole.valueOf(r)
                ).collect(Collectors.toList())
        );

        userRepository.save(user);
    }
    
}
