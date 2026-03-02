# Type Challenge - Touch Typing Practice Application

A fullstack typing speed practice application with user authentication, real-time statistics, and competitive leaderboard. Built with Next.js (frontend) and Spring Boot (backend).

## Features

- Real-time typing practice with accuracy tracking
- Live WPM (Words Per Minute) calculation
- Visual feedback with color-coded text and animated cursor
- User authentication system with guest mode
- Global leaderboard sorted by accuracy and WPM
- Result persistence with PostgreSQL
- Full Docker support for easy deployment

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, TailwindCSS, DaisyUI
- **Backend**: Spring Boot 4.x, Java, PostgreSQL 16, Hibernate
- **Infrastructure**: Docker, Docker Compose
- **Architecture**: Server Components + Client Components, RESTful API

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
├── docker-compose.yml              # Docker Compose configuration
├── frontend/                       # Next.js 15 application
│   ├── app/                       # App Router pages
│   │   ├── page.tsx              # Home page
│   │   ├── game/                 # Typing game page
│   │   │   └── page.tsx
│   │   ├── leaderboard/          # Leaderboard page
│   │   │   └── page.tsx
│   │   └── layout.tsx            # Root layout
│   ├── components/               # React components
│   │   ├── game/                # Game-specific components
│   │   │   ├── GameClient.tsx   # Main game logic
│   │   │   ├── StatsDisplay.tsx # Live stats display
│   │   │   ├── TextDisplay.tsx  # Text rendering with cursor
│   │   │   └── ResultPanel.tsx  # Results modal
│   │   ├── Navbar.tsx           # Navigation bar
│   │   ├── Footer.tsx           # Footer component
│   │   └── Container.tsx        # Layout container
│   ├── lib/                     # Utility functions
│   │   ├── utils/
│   │   │   └── game.ts         # Game calculations (WPM, accuracy)
│   │   ├── api/
│   │   │   └── game.ts         # API client functions
│   │   └── cookies.ts          # Cookie management
│   ├── types/                   # TypeScript type definitions
│   └── Dockerfile
└── typeChallengeBackend/         # Spring Boot application
    ├── src/
    │   ├── main/
    │   │   ├── java/com/example/typeChallengeBackend/
    │   │   │   ├── TypeChallengeBackendApplication.java
    │   │   │   ├── core/              # Core functionality
    │   │   │   │   ├── controller/    # User authentication
    │   │   │   │   ├── dto/          # Data transfer objects
    │   │   │   │   └── enums/
    │   │   │   └── game/             # Game logic
    │   │   │       ├── controller/   # Text & Results API
    │   │   │       ├── dto/
    │   │   │       ├── entity/       # JPA entities
    │   │   │       ├── repository/   # Database access
    │   │   │       └── service/      # Business logic
    │   │   └── resources/
    │   │       ├── application.properties
    │   │       └── db/
    │   │           └── init.sql     # Database initialization
    │   └── test/
    └── Dockerfile
```

## API Endpoints

### Text Management
- `GET /text/random` - Get a random typing text snippet

### User Authentication
- `POST /user/login` - User login
- `POST /user/register` - User registration

### Game Results
- `POST /results` - Save game result
- `GET /leaderboard` - Get top 10 players sorted by accuracy and WPM

## Future Improvements

### Backend Security & Features
- **JWT Authentication** - Replace cookie-based auth with JWT tokens for better security
- **Password Hashing** - Implement bcrypt/argon2 for secure password storage
- **Input Validation** - Add comprehensive validation and sanitization
- **API Rate Limiting** - Prevent abuse with request throttling
- **Audit Logging** - Track user actions and security events
- **Multiple Rounds** - Support for multi-round games with cumulative scoring

### Frontend Enhancements
- **HTTP Interceptors** - Automatic connection monitoring and token refresh
- **Real-time Leaderboard** - Live updates using WebSocket/Server-Sent Events
- **Connection Recovery** - Auto-reconnect and state synchronization on disconnection
- **Responsive Design** - Better mobile support with touch-optimized controls
- **Themes** - Multiple color themes and customization options
- **Advanced Stats** - Error patterns, progress tracking, personal records
- **Achievements** - Badges and milestones for long-term engagement

### Infrastructure
- **Testing** - Unit and integration tests for both frontend and backend
- **Monitoring** - Application performance monitoring and error tracking
- **CI/CD** - Automated testing and deployment pipeline

---

*Project created as a recruitment challenge*