# Type Challenge - Touch Typing Practice Application

A fullstack typing speed practice application built with Next.js (frontend) and Spring Boot (backend).

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, TailwindCSS
- **Backend**: Spring Boot 4.x, Java, PostgreSQL
- **Infrastructure**: Docker, Docker Compose

## Quick Start

### Run with Docker Compose

```bash
# Build and start all services
docker-compose up --build

# In detached mode (background)
docker-compose up -d --build
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080

### Stop the application

```bash
docker-compose down

# Also remove volumes with data (WARNING: will delete the database)
docker-compose down -v
```

## Database

### Data Initialization

The database is automatically initialized with 25 sample typing practice texts during the first run.

The initialization script is located at: `typeChallengeBackend/src/main/resources/db/init.sql`

### Manual Data Addition/Update

If you want to add or update data in an already running database:

```bash
# Copy the SQL file to the container
docker cp typeChallengeBackend/src/main/resources/db/init.sql job-challenge-db-1:/tmp/init.sql

# Execute the SQL script
docker exec -i job-challenge-db-1 psql -U postgres -d typeracer_db -f /tmp/init.sql
```

Or directly via psql:

```bash
docker exec -i job-challenge-db-1 psql -U postgres -d typeracer_db < typeChallengeBackend/src/main/resources/db/init.sql
```

### Database Access

```bash
# Connect to PostgreSQL database
docker exec -it job-challenge-db-1 psql -U postgres -d typeracer_db

# Example queries:
# SELECT COUNT(*) FROM text_snippets;
# SELECT id, LEFT(content, 50) FROM text_snippets;
```

## Local Development

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd typeChallengeBackend
./gradlew bootRun
```

Requires PostgreSQL running on localhost:5432

## Project Structure

```
.
├── docker-compose.yml          # Docker Compose configuration
├── frontend/                   # Next.js application
│   ├── app/                   # App Router
│   ├── components/            # React components
│   └── Dockerfile
└── typeChallengeBackend/      # Spring Boot application
    ├── src/
    │   └── main/
    │       ├── java/          # Java source code
    │       └── resources/
    │           └── db/        # SQL scripts
    │               └── init.sql
    └── Dockerfile
```

## API Endpoints

- `GET /api/game/random-text` - Get a random text to type
- `POST /api/game/result` - Save game result

---

*Project created as a recruitment challenge*

