FROM node:20-alpine

ENV NODE_ENV=production
WORKDIR /app

# Install production dependencies first so this layer is cached
# until package.json / package-lock.json change.
COPY app/package*.json ./
RUN npm install --omit=dev --no-audit --no-fund && npm cache clean --force

COPY app/ .

# Run as the unprivileged user that ships with the node image.
USER node

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/health || exit 1

CMD ["node", "server.js"]
