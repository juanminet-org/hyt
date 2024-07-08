# Spring Boot React with Docker

CRUD application with spring boot react and docker

### Backend
- mvn clean install
- docker build -t java-docker-image-test --progress=plain --no-cache --target=test .
  
### Frontend
- npm install
- npm start
- npm kill-port 3000

### App
- docker compose up --build
- docker compose up --build -d
- docker compose down
- docker compose -f compose.dev.yaml up --build


