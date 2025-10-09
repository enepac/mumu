# ────────────────────────────────────────────────
# Mumu Covenant Backend — Orchestrator Container
# Deterministic dual-stage build
# ────────────────────────────────────────────────

### ─── Builder Stage ─────────────────────────────
FROM node:22-slim AS builder

WORKDIR /app
ENV NODE_ENV=development

# Copy manifests first
COPY package.json tsconfig.json ./

# Install all dependencies (dev + prod)
RUN npm install --include=dev

# Copy the rest of the source code
COPY . .

# Compile TypeScript to dist/
RUN npx tsc --project tsconfig.json


### ─── Runtime Stage ─────────────────────────────
FROM node:22-slim AS runtime

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080

# Copy only package manifest to install prod deps
COPY package.json ./

# Prevent husky prepare hook from running
ENV HUSKY=0
RUN npm install --omit=dev --ignore-scripts

# Copy compiled JS output from builder stage
COPY --from=builder /app/dist ./dist

# Expose and launch
EXPOSE 8080
CMD ["node", "dist/orchestrator.js"]
