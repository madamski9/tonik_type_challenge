package com.example.typeChallengeBackend.game.service;

import com.example.typeChallengeBackend.game.dto.GameResultRequest;
import com.example.typeChallengeBackend.game.entity.GameResult;
import com.example.typeChallengeBackend.game.entity.TextSnippet;
import com.example.typeChallengeBackend.game.entity.User;
import com.example.typeChallengeBackend.game.repository.GameResultRepository;
import com.example.typeChallengeBackend.game.repository.TextSnippetRepository;
import com.example.typeChallengeBackend.game.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GameService {

    private final TextSnippetRepository textSnippetRepository;
    private final GameResultRepository gameResultRepository;
    private final UserRepository userRepository;

    public TextSnippet getRandomText() {
        return textSnippetRepository.findRandomText();
    }

    public GameResult saveResult(GameResultRequest request) {
        GameResult result = new GameResult();

        User user = userRepository.findById(request.getUserId()).orElse(null);
        TextSnippet text = textSnippetRepository.findById(request.getTextSnippetId()).orElse(null);

        result.setUser(user);
        result.setTextSnippet(text);
        result.setWordsPerMinute(request.getWordsPerMinute());
        result.setAccuracy(request.getAccuracy());
        result.setTimeTaken(request.getTimeTaken());

        return gameResultRepository.save(result);
    }

    public List<GameResult> getLeaderboard() {
        return gameResultRepository.findTop10ByOrderByWordsPerMinuteDesc();
    }
}
