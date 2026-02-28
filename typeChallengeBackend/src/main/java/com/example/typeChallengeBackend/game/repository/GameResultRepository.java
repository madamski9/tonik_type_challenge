package com.example.typeChallengeBackend.game.repository;

import com.example.typeChallengeBackend.game.entity.GameResult;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface GameResultRepository extends JpaRepository<GameResult, Long> {
    List<GameResult> findTop10ByOrderByWordsPerMinuteDesc();
}
