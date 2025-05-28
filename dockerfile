FROM node

RUN apt-get update && apt-get install -y netcat-openbsd && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 3333

CMD sh -c "until nc -z database 5432; do echo '⏳ Aguardando o banco de dados...'; sleep 1; done && \
  npx prisma migrate dev && \
  yarn run dev"
