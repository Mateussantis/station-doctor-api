FROM node

WORKDIR /usr/app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 3333

# Aguarda o banco de dados e roda a migration antes de iniciar a aplicação
CMD sh -c "until nc -z database 5432; do echo '⏳ Aguardando o banco de dados...'; sleep 1; done && \
  npx prisma generate && \
  npx prisma migrate dev && \
  yarn run dev"
