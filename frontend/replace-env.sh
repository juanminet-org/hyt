#!/bin/sh
echo "Running replace-env.sh..."
echo "Current environment variables:"
env

echo "Substituting environment variables in .env.template..."
envsubst < .env.template > .env

echo "Resulting .env file:"
cat .env

exec "$@"