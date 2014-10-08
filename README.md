# Building a RESTful API in Node and Express

Using the new Express 4.0 Router to build an API

## Requirements

- docker, node and npm

## Installation

- Clone the repo: `git clone git@github.com:vdupain/node-api`
- Install dependencies: `npm install`
- `wget http://download.geonames.org/export/dump/FR.zip && unzip FR.zip`
- Start mongodb: `docker run -d -p 27017:27017 -p 28017:28017 --name mongodb dockerfile/mongodb mongod --rest --httpinterface`
- Start the server: `MONGODB_URI="mongodb://localhost:27017/" node items.js`
