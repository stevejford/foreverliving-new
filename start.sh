#!/bin/bash

# Create Docker network if it doesn't exist
docker network create web || true

# Create letsencrypt directory if it doesn't exist
mkdir -p letsencrypt

# Build and start the containers
docker-compose up -d --build
