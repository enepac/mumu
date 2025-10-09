# --- Build Stage ---
FROM node:20.17.0-slim AS builder
WORKDIR /app
RUN apt-get update && apt-get upgrade -y && rm -rf /var/lib/apt/lists/*
RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy frontend and backend code
COPY . .

# Build frontend
RUN pnpm build

# --- Runtime Stage ---
FROM node:20.17.0-slim
WORKDIR /app
RUN npm install -g pnpm
COPY --from=builder /app ./

# Start backend API
EXPOSE 8080
CMD ["pnpm", "--dir", "backend", "start"]
