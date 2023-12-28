import axios, { AxiosInstance } from 'axios';
import { UserProfile } from './types';
import CLIENT_SECRET from '../../config'


export class SpotifyApiAuth {
  private readonly BASE_URL='https://api.spotify.com/v1';
  private readonly REDIRECT_URI='https://sptf-yt.vercel.app/'
  private readonly SCOPE='user-read-private user-read-email user-library-read'
  private readonly CLIENT_ID='31d1acda698d48beb6f3086e67d7898a'
  private readonly CLIENT_SECRET = CLIENT_SECRET
  private endpoint!: AxiosInstance;

  public createAxiosInstance(token: string): void {
    this.endpoint = axios.create({
      baseURL: this.BASE_URL,
      headers: {Authorization: 'Bearer ' + token} 
    })
  }

  public async getUserInfo(): Promise<UserProfile> {
    const response = await this.endpoint.get('/me')
    return response.data
  }

  public async handleAuthCallback(code: string): Promise<void> {
    
    const params = new URLSearchParams( {
      client_id: this.CLIENT_ID,
      grant_type: 'authorization_code',
      code,
      redirect_uri: this.REDIRECT_URI,
    })
    const accessTokenUrl = `https://accounts.spotify.com/api/token`
    const result = await axios.post(accessTokenUrl, params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Basic ${btoa(this.CLIENT_ID+':'+this.CLIENT_SECRET)}`
      }
    
    });
    const {access_token} = result.data;

    window.localStorage.setItem('@access_token_spt', access_token);
    this.createAxiosInstance(access_token)
  }

  public generateURLtoAuthenticate(): string {
    const authorizationBaseUrl =  'https://accounts.spotify.com/authorize'
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: this.CLIENT_ID,
      scope: this.SCOPE,
      redirect_uri: this.REDIRECT_URI,
    })
    console.log(this.CLIENT_SECRET)
    return `${authorizationBaseUrl}?${params.toString()}` 
  }
  
  public async getUserTracks(quantity: number) {
    const market= 'BR'
    const limit = 50
    const urls: string[] = []
    let offset;

    for (offset = 0; offset < quantity; offset += limit) {
      urls.push(`/me/tracks?market=${market}&limit=50&offset=${offset}`)
    }

    const responses = await Promise.all(urls.map(async url => {
      const res = await this.endpoint.get(url)
      return res.data.items
    }));
    const uniqueArray = responses.flat()

    uniqueArray.forEach(track => {
      console.log(track.track.name)
    })

  }
}