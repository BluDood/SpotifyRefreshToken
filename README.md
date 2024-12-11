# SpotifyRefreshToken

Easily authenticate with a Spotify application and get a refresh token.

## Setting up

You'll need [Node.js](https://nodejs.org/en) installed on your computer.

1. Install `node_modules`

   ```
   npm install
   ```

2. Build the source code

   ```
   npm run build
   ```

3. Fill out environment variables in `.env`. Check [`.env.example`](.env.example) for an example

## Usage

1. Run the application

   ```
   npm start
   ```

2. Open http://localhost:1337 in a web browser
3. Log in to your Spotify account and authorize your application
4. You will be redirected to a page displaying the refresh token
