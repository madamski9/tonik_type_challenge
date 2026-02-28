package com.example.typeChallengeBackend.game.dto;

import lombok.Data;

@Data
public class GameResultRequest {
    private Long userId;
    private Long textSnippetId;
    private Double wordsPerMinute;
    private Double accuracy;
    private Integer timeTaken;
}
