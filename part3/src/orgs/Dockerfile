FROM node:8-alpine

WORKDIR /usr/app

# Copy the package.json files
COPY orgs/package.json main/package.json
COPY utils/package.json utils/package.json

# Run npm install for each
RUN cd main; npm install
RUN cd utils; npm install

# Copy over the source
COPY orgs/ main/
COPY utils/ utils/

WORKDIR main