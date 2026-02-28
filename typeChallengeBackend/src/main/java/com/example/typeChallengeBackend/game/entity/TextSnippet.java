package com.example.typeChallengeBackend.game.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "text_snippets")
@Data
public class TextSnippet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String content;
}
