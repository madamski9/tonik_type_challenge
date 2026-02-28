package com.example.typeChallengeBackend.game.controller;

import com.example.typeChallengeBackend.game.dto.LoginRequest;
import com.example.typeChallengeBackend.game.dto.RegisterRequest;
import com.example.typeChallengeBackend.game.dto.UserResponse;
import com.example.typeChallengeBackend.game.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public UserResponse register(@RequestBody RegisterRequest request) {
        return userService.register(request);
    }

    @PostMapping("/login")
    public UserResponse login(@RequestBody LoginRequest request) {
        return userService.login(request);
    }
}
