error id: file://<WORKSPACE>/typeChallengeBackend/src/main/java/com/example/typeChallengeBackend/game/controller/GameController.java:com/example/typeChallengeBackend/game/entity/TextSnippet#
file://<WORKSPACE>/typeChallengeBackend/src/main/java/com/example/typeChallengeBackend/game/controller/GameController.java
empty definition using pc, found symbol in pc: com/example/typeChallengeBackend/game/entity/TextSnippet#
empty definition using semanticdb
empty definition using fallback
non-local guesses:

offset: 243
uri: file://<WORKSPACE>/typeChallengeBackend/src/main/java/com/example/typeChallengeBackend/game/controller/GameController.java
text:
```scala
package com.example.typeChallengeBackend.game.controller;

import com.example.typeChallengeBackend.game.dto.GameResultRequest;
import com.example.typeChallengeBackend.game.entity.GameResult;
import com.example.typeChallengeBackend.game.entity.@@TextSnippet;
import com.example.typeChallengeBackend.game.service.GameService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class GameController {

    private final GameService gameService;

    @GetMapping("/text/random")
    public TextSnippet getRandomText() {
        return gameService.getRandomText();
    }

    @PostMapping("/results")
    public GameResult saveResult(@RequestBody GameResultRequest request) {
        return gameService.saveResult(request);
    }

    @GetMapping("/leaderboard")
    public List<GameResult> getLeaderboard() {
        return gameService.getLeaderboard();
    }
}

```


#### Short summary: 

empty definition using pc, found symbol in pc: com/example/typeChallengeBackend/game/entity/TextSnippet#