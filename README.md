# Building a RESTful API in Node and Express

Using the new Express 4.0 Router to build an API

[Read the tutorial](http://scotch.io/tutorials/javascript/build-a-restful-api-using-node-and-express-4)

## Requirements

- docker, node and npm

## Installation

- Clone the repo: `git clone git@github.com:vdupain/node-api`
- Install dependencies: `npm install`
- Start mongodb: `docker run -d -p 27017:27017 --name mongodb dockerfile/mongodb`
- Start the server: `MONGODB_URI="mongodb://localhost:27017/" node items.js`
