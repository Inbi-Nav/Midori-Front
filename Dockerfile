FROM node:20-alpine

WORKDIR /app

COPY midori-frontend/package*.json ./

RUN npm install

COPY midori-frontend .

RUN npm run build

RUN npm install -g serve

ENV PORT=3000

EXPOSE 3000

CMD ["sh", "-c", "serve -s dist -l $PORT"]