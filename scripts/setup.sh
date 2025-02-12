#!/bin/bash

echo "🚀 Starting setup..."

# Check if PostgreSQL is running
if ! pg_isready > /dev/null 2>&1; then
    echo "❌ PostgreSQL is not running. Starting PostgreSQL..."
    
    # For Mac (using brew)
    if [[ "$OSTYPE" == "darwin"* ]]; then
        brew services start postgresql
    # For Linux
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        sudo service postgresql start
    fi
    
    # Wait for PostgreSQL to start
    sleep 3
fi

# Check again if PostgreSQL is running
if ! pg_isready > /dev/null 2>&1; then
    echo "❌ Failed to start PostgreSQL. Please start it manually."
    exit 1
fi

echo "✅ PostgreSQL is running"

# Create database if it doesn't exist
if ! psql -lqt | cut -d \| -f 1 | grep -qw habit_streaks; then
    echo "Creating database habit_streaks..."
    createdb habit_streaks
    echo "✅ Database created"
else
    echo "✅ Database already exists"
fi

# Check if .env file exists
if [ ! -f .env ]; then
    echo "Creating .env file..."
    echo "DATABASE_URL=\"postgresql://$(whoami)@localhost:5432/habit_streaks\"" > .env
    echo "NEXTAUTH_SECRET=\"development-secret\"" >> .env
    echo "NEXTAUTH_URL=\"http://localhost:3000\"" >> .env
    echo "✅ Created .env file"
else
    echo "✅ .env file already exists"
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
    echo "✅ Dependencies installed"
else
    echo "✅ Dependencies already installed"
fi

# Generate Prisma client and push schema
echo "Setting up database schema..."
npx prisma generate
npx prisma db push
echo "✅ Database schema updated"

# Start the development server
echo "🚀 Starting development server..."
npm run dev 