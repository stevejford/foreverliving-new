@echo off

REM Create Docker network if it doesn't exist
docker network create web 2>nul

REM Create letsencrypt directory if it doesn't exist
if not exist "letsencrypt" mkdir letsencrypt

REM Build and start the containers
docker-compose up -d --build
