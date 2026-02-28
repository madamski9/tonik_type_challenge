package com.example.typeChallengeBackend.game.service;

import com.example.typeChallengeBackend.game.dto.LoginRequest;
import com.example.typeChallengeBackend.game.dto.RegisterRequest;
import com.example.typeChallengeBackend.game.dto.UserResponse;
import com.example.typeChallengeBackend.game.entity.User;
import com.example.typeChallengeBackend.game.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserResponse register(RegisterRequest request) {
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());

        User saved = userRepository.save(user);
        return new UserResponse(saved.getId(), saved.getUsername(), saved.getEmail());
    }

    public UserResponse login(LoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername());
        if (user != null && user.getPassword().equals(request.getPassword())) {
            return new UserResponse(user.getId(), user.getUsername(), user.getEmail());
        }
        return null;
    }
}
