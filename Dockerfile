# Genius Lab Web - Vite + React + Express
# Build from web/ subdirectory
FROM node:20-alpine AS build
WORKDIR /app

COPY web/package.json web/package-lock.json ./
RUN npm ci

COPY web/ .
ARG VITE_PUBLIC_FORM_ENDPOINT
ARG VITE_PUBLIC_FORMSPREE_FORM_ID
ARG VITE_PUBLIC_SITE_URL
ENV VITE_PUBLIC_FORM_ENDPOINT=$VITE_PUBLIC_FORM_ENDPOINT
ENV VITE_PUBLIC_FORMSPREE_FORM_ID=$VITE_PUBLIC_FORMSPREE_FORM_ID
ENV VITE_PUBLIC_SITE_URL=$VITE_PUBLIC_SITE_URL
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
