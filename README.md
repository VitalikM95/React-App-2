# My Task Board

This is a test project

## Getting Started

To get a local copy up and running follow these simple steps:

### Prerequisites

Make sure you have Docker and Docker Compose installed on your local machine.

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/VitalikM95/React-App.git
   ```
2. Navigate to the project directory:
   ```sh
   cd React-App
   ```

### Usage

#### Development Mode with Docker

To start the project in development mode with server, client, and database running simultaneously:

```sh
docker-compose up --build
```

This command will build and start the Docker containers for the server, client, and PostgreSQL database. The server will be accessible at `http://localhost:4444` and the client at `http://localhost:3000`.
