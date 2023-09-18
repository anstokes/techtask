# Connex One Tech Task

> This test is designed to evaluate both technical skills in a real-world scenario and how you'd work as a team member at Connex One.  The task is to build a simple API, and frontend application for displaying data returned by the API.

## Installation / Testing

The simplest way to test the code, assuming that a Docker environment is available, is to clone this repository and run the Docker container:
```console
git clone https://github.com/anstokes/techtask.git
cd techtask
docker compose -f "docker-compose.yml" up -d --build
```

## Manual compilation

Alternatively, it is possible to build the server component separately:
```console
git clone https://github.com/anstokes/techtask.git
cd techtask\server
yarn install
```

To run in production mode:
```console
yarn build
yarn start
```

OR, to run in development mode:
```console
yarn start:dev
```

And to run the client component:
```console
cd techtask\client
yarn start
```

## Server

The server should be available at http://localhost:3000

## Client

The client should be available at http://localhost:3001
