import axios from 'axios'

const { CLIENT_ID, CLIENT_SECRET, SCOPE } = process.env

export function buildSpotifyAuthUrl() {
  const url = new URL('https://accounts.spotify.com/authorize')
  url.searchParams.append('response_type', 'code')
  url.searchParams.append('client_id', CLIENT_ID!)
  url.searchParams.append('scope', SCOPE!)
  url.searchParams.append('redirect_uri', 'http://localhost:1337/token')

  return url.toString()
}

export async function getRefreshToken(code: string) {
  const res = await axios.post(
    'https://accounts.spotify.com/api/token',
    {},
    {
      params: {
        grant_type: 'authorization_code',
        code,
        redirect_uri: 'http://localhost:1337/token'
      },

      headers: {
        Authorization: `Basic ${Buffer.from(
          `${CLIENT_ID}:${CLIENT_SECRET}`
        ).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      validateStatus: () => true
    }
  )

  if (res.status !== 200) return null

  return res.data.refresh_token
}
