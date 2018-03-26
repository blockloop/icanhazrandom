FROM node:8
EXPOSE 3000
ENV env production
RUN mkdir /app
WORKDIR /app
ADD . .
RUN npm install
CMD ["npm", "start"]
