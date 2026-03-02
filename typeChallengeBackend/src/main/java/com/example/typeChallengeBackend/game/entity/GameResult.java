package com.example.typeChallengeBackend.game.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "game_results")
@Data
public class GameResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "text_snippet_id")
    private TextSnippet textSnippet;

    private Double accuracy;
    private Integer timeTaken;
    private Double wordsPerMinute;
    private LocalDateTime createdAt = LocalDateTime.now();
}
