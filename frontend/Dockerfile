FROM node:22-bookworm AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install
COPY . ./

RUN npm run build && npm ci --omit dev

FROM node:22-bookworm-slim

LABEL org.opencontainers.image.authors="wooshcz@gmail.com" \
    org.opencontainers.image.source=https://github.com/wooshcz/sitecheckup \
    version="1.0"

WORKDIR /app

COPY --from=build /app/node_modules/ ./node_modules/
COPY --from=build /app/build/ ./build/

ENV HOST=0.0.0.0
ENV PORT=8000

EXPOSE 8000

ENTRYPOINT [ "node", "build" ]