package com.example.typeChallengeBackend.game.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.typeChallengeBackend.game.entity.GameResult;

public interface GameResultRepository extends JpaRepository<GameResult, Long> {
    @Query(value = "SELECT * FROM game_results ORDER BY accuracy DESC, words_per_minute DESC, time_taken ASC LIMIT 10", nativeQuery = true)
    List<GameResult> findTop10ByOrderByAccuracyDescWordsPerMinuteDescTimeTakenAsc();
}