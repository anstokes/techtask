FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN yarn install --frozen-lockfile

# Bundle app source
COPY . .

# If you are building your code for production
RUN yarn build

# Expose port 3000
EXPOSE 3000

# Run application
CMD [ "yarn", "start" ]