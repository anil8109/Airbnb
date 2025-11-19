1. its a micro service driven hotel booking system
2. We support idempotencykey for avoiding double bookings
3. we use Redlock based distributed cache lock to avoid concurrency issues
4. we have db migrations to handle db versioning
5. we have a golang service for auth, other services are in express+ts
6. auth is powered by JWT token and it includes a reverse proxy logic to forward requests to microservices
7. There is an async service interaction for handling notifications using Redis queue
8. there is cron scheduler logic to create rooms automatically for further availability
9. review service for async updating hotel ratings

Create resume for this.
