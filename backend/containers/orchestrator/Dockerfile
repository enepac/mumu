# ────────────────────────────────────────────────
# Mumu Covenant Backend — Orchestrator Container
# Compiled JS runtime (recommended)
# ────────────────────────────────────────────────

FROM node:22-slim

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080

# Copy local manifest & install prod deps
COPY package.json ./
RUN npm install --omit=dev typescript

# Copy orchestrator source
COPY . .

# Compile TypeScript to dist/
RUN npx tsc --project tsconfig.json

# Launch compiled output
EXPOSE 8080
CMD ["node", "dist/orchestrator.js"]
