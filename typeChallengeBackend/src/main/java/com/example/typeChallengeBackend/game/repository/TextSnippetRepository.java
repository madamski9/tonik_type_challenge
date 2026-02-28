package com.example.typeChallengeBackend.game.repository;

import com.example.typeChallengeBackend.game.entity.TextSnippet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TextSnippetRepository extends JpaRepository<TextSnippet, Long> {
    @Query(value = "SELECT * FROM text_snippets ORDER BY RANDOM() LIMIT 1", nativeQuery = true)
    TextSnippet findRandomText();
}
