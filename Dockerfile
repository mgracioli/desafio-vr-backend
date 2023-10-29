FROM node:16

COPY *.sql /docker-entrypoint-initdb.d/

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "start"]