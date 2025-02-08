FROM node:23-alpine
WORKDIR /app
# Copy only package.json
COPY package.json package-lock.json ./
# Install packages
RUN npm install
# Copy all files
COPY . .
# Exposes API Port
EXPOSE 3000
# Run bash-like command: create-db, migrations, seeders and api start
CMD npx sequelize-cli db:create && npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all && npm start