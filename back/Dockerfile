FROM node:14-alpine as runner 
ENV NODE_ENV=developement

COPY . /app
WORKDIR /app

EXPOSE 3630
CMD ["npm", "run", "dev"]

FROM runner as builder 
ENV NODE_ENV=production

COPY package*.json ./
RUN npm install

CMD ["npm", "start"]