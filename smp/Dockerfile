FROM node:18-alpine

WORKDIR /smp/

COPY public/ /smp/public
COPY src/ /smp/src
COPY package.json /smp/

RUN npm install
EXPOSE 4000

CMD ["npm", "start"]
