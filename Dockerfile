# --- Build Stage ---
FROM node:20.17.0-slim as builder
WORKDIR /app

# Patch OS to reduce CVEs
RUN apt-get update && apt-get upgrade -y && rm -rf /var/lib/apt/lists/*
RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build


# --- Runtime Stage ---
FROM node:20.17.0-slim as runtime
WORKDIR /app

# Patch OS to reduce CVEs
RUN apt-get update && apt-get upgrade -y && rm -rf /var/lib/apt/lists/*
RUN npm install -g pnpm

COPY --from=builder /app ./

EXPOSE 3000
CMD ["pnpm", "start"]
