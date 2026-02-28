package com.example.typeChallengeBackend.game.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

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

    private Double wordsPerMinute;
    private Double accuracy;
    private Integer timeTaken;
    private LocalDateTime createdAt = LocalDateTime.now();
}
