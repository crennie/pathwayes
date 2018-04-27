
# Use node version 8.5 (app currently running on) and smallest unix distribution, Linux Alpine
FROM node:8.5.0-alpine

# Create app directory (TODO: )
WORKDIR /user/src/app

# Install our node dependencies
COPY package*.json ./

RUN npm install

# Add http-server to global space in container
RUN npm install -g http-server

# Move app source over.  Unecessary files will be blacklisted using .dockerignore file
COPY . .

RUN yarn build

# Run server on 8080
EXPOSE 8080
CMD ["http-server", "./build"]