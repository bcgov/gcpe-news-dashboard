#!/bin/bash

# Define some colors
_red='\033[0;31m'
_yellow='\033[1;33m'
_nc='\033[0m' # No Color

# Bring down any previously running containers
docker-compose down

# Build images
echo '---> Building images...'
docker-compose build
echo '---> Complete'

# Bring up new containers (silently)
docker-compose up -d

echo -e \\n"${_yellow}** Development Server is listening on localhost:4200, open your browser on http://localhost:4200/ **${_nc}"
