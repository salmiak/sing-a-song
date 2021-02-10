# Sing a song

A portfolio website for semi professional musicians in Sweden.

## Setup

### Server Dependencies
1. Install Node.js
2. Install mysql
3. Make sure to have a STMP-account available
4. Make a copy of `config-example.json` and name it `config.json` and fill out with the correct details.
5. Run `$ npm i` to install server dependencies.

### Client setup
1. Go to client folder `$ cd client`
2. Install dependencies `$ npm i`
3. Build for production `$ npm run build`

### Start server
Run `$ npm start` to launch server, this will serve the content of the `client/dist` as static + API.
