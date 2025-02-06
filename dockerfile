FROM node:23-alpine
WORKDIR /app
# Copy only package.json
COPY package.json package-lock.json ./
# Install packages
RUN npm install
# Copy all files
COPY . .
# Run application
CMD ["npm", "start"]