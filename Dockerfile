FROM node:22-alpine

WORKDIR /app

# Enable corepack (pnpm)
RUN corepack enable

# Copy manifests first (better layer caching)
COPY package.json pnpm-lock.yaml* ./

# Install deps (lockfile optional; if missing, pnpm will resolve)
RUN pnpm install --frozen-lockfile=false

# Copy rest
COPY . .

EXPOSE 3000

ENV NODE_ENV=development
ENV WATCHPACK_POLLING=true

CMD ["pnpm", "dev"]
