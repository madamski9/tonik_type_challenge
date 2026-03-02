package com.example.typeChallengeBackend.game.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.typeChallengeBackend.game.entity.GameResult;

public interface GameResultRepository extends JpaRepository<GameResult, Long> {
    List<GameResult> findTop10ByOrderByAccuracyDesc();
}
