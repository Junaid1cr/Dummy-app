# ---- build stage ----
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# ---- runtime stage ----
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY --from=build /app/dist ./dist

# APP_VERSION is normally set by the Deployment (the commit SHA). The ARG is a
# build-time fallback so a bare `docker run` still reports something sensible.
ARG APP_VERSION=dev
ENV APP_VERSION=$APP_VERSION
ENV PORT=3000

EXPOSE 3000
USER node
CMD ["node", "dist/index.js"]
