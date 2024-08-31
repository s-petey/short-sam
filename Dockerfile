# Stage 1: Install dependencies
FROM oven/bun:latest AS install
WORKDIR /app
COPY package.json ./
COPY ./postcss.config.cjs ./
COPY ./tailwind.config.ts ./
COPY ./tsconfig.json      ./
COPY ./svelte.config.js   ./
COPY ./vite.config.ts     ./
RUN bun install

# Stage 2: Build the application
FROM oven/bun:latest AS build
ARG PUBLIC_SUPABASE_URL=${PUBLIC_SUPABASE_URL}
WORKDIR /app
COPY --from=install /app/package.json ./
COPY --from=install /app/bun.lockb ./
COPY --from=install /app/node_modules ./node_modules
COPY ./src ./src
COPY ./static ./static
COPY ./postcss.config.cjs ./
COPY ./tailwind.config.ts ./
COPY ./tsconfig.json      ./
COPY ./svelte.config.js   ./
COPY ./vite.config.ts     ./

RUN bun run build

# Stage 3: Use a production-ready Bun.js image to run the application
FROM node:20-alpine AS production
# ARG ORIGIN=http://localhost:3000
ARG PUBLIC_SUPABASE_URL=${PUBLIC_SUPABASE_URL}
ARG ORIGIN=${ORIGIN}
WORKDIR /app
COPY --from=install /app/node_modules ./node_modules
COPY --from=install /app/bun.lockb ./
COPY --from=build /app/build ./build
COPY --from=build /app/package.json ./package.json
EXPOSE 3000
CMD ["echo", "-------------------------------------------------------"]
CMD ["sh", "-c", "echo $ORIGIN"]
CMD ["node", "-r", "dotenv/config", "build"]