# Genius Lab Web - Vite + React + Express
# Build from web/ subdirectory
FROM node:20-alpine AS build
WORKDIR /app

COPY web/package.json web/package-lock.json ./
RUN npm ci

COPY web/ .
RUN npm run build

FROM node:20-alpine AS runtime
WORKDIR /app

COPY web/package.json web/package-lock.json ./
RUN npm ci

COPY --from=build /app/dist ./dist
COPY --from=build /app/server ./server
COPY --from=build /app/src ./src

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

CMD ["npx", "tsx", "server/index.ts"]
