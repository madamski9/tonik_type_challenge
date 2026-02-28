# TypeRacer Backend

Prosty backend dla gry TypeRacer.

## Wymagania

- Java 21
- PostgreSQL
- Gradle

## Konfiguracja

1. Utwórz bazę danych PostgreSQL:
```sql
CREATE DATABASE typeracer_db;
```

2. Zmień dane w `application.properties` jeśli potrzeba

3. Dodaj przykładowe teksty:
```sql
INSERT INTO text_snippets (content) VALUES 
('The quick brown fox jumps over the lazy dog'),
('To be or not to be that is the question'),
('In a galaxy far far away');
```

## Uruchomienie

```bash
./gradlew bootRun
```

## API

### User
- `POST /api/user/register` - rejestracja
- `POST /api/user/login` - logowanie

### Game
- `GET /api/text/random` - losowy tekst
- `POST /api/results` - zapisz wynik
- `GET /api/leaderboard` - najlepsze wyniki

## Przykłady

Rejestracja:
```json
POST /api/user/register
{
  "username": "jan",
  "email": "jan@example.com",
  "password": "haslo123"
}
```

Zapisanie wyniku:
```json
POST /api/results
{
  "userId": 1,
  "textSnippetId": 1,
  "wordsPerMinute": 65.5,
  "accuracy": 98.5,
  "timeTaken": 45
}
```

## Roadmap

W przyszłości:
- Walidacja danych wejściowych
- JWT tokeny dla bezpieczeństwa
- Hashowanie haseł
- Obsługa błędów
