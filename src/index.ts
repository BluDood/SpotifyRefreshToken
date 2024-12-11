import 'dotenv/config'

import express, { Request, Response } from 'express'

import { buildSpotifyAuthUrl, getRefreshToken } from './lib/spotify.js'

if (
  !['CLIENT_ID', 'CLIENT_SECRET', 'SCOPE'].every(e => e in process.env)
) {
  console.error('Missing required environment variables!')
  process.exit(1)
}

const app = express()

app.get('/', (req: Request, res: Response) => {
  res.redirect(buildSpotifyAuthUrl())
})

app.get('/token', async (req: Request, res: Response) => {
  const { code } = req.query

  if (!code) {
    res.status(400).send('Missing code')
    return
  }

  const refreshToken = await getRefreshToken(code as string)

  if (!refreshToken) {
    res.status(400).send('Invalid code')
    return
  }

  res.send(refreshToken)
})

app.listen(1337, () => {
  console.log('Listening on http://localhost:1337')
})
