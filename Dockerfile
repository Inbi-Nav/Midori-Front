# ---------- BUILD ----------
FROM node:20-alpine AS build

WORKDIR /app

COPY midori-frontend/package*.json ./

RUN npm install

COPY midori-frontend .

RUN npm run build


FROM node:20-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/dist ./dist

ENV PORT=3000

EXPOSE 3000

CMD ["sh", "-c", "serve -s dist -l $PORT"]