import axios, { AxiosInstance } from 'axios';
import { UserProfile } from './types';


export class SpotifyApi {
  private readonly BASE_URL='https://api.spotify.com/v1';
  private readonly REDIRECT_URI='http://localhost:5173/'
  private readonly SCOPE='user-read-private user-read-email user-library-read'
  private readonly CLIENT_ID='31d1acda698d48beb6f3086e67d7898a'
  private readonly CLIENT_SECRET: string= (process.env.CLIENT_SECRET as string)
  private endpoint!: AxiosInstance;

  public createAxiosInstance(token: string) {
    this.endpoint = axios.create({
      baseURL: this.BASE_URL,
      headers: {Authorization: 'Bearer ' + token} 
    })
  }

  public async getUserInfo(): Promise<UserProfile> {
    const response = await this.endpoint.get('/me')
    return response.data
  }

  public async handleAuthCallback(code: string) {
    
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

  public generateURLtoAuthenticate() {
    const authorizationBaseUrl =  'https://accounts.spotify.com/authorize'
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: this.CLIENT_ID,
      scope: this.SCOPE,
      redirect_uri: this.REDIRECT_URI,
    })
    return `${authorizationBaseUrl}?${params.toString()}` 
  }

  get clientId() {
    return this.CLIENT_ID
  }
}