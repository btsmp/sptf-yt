import axios, { AxiosInstance } from 'axios';
export class SpotifyApi {
  private readonly BASE_URL='https://api.spotify.com/v1';
  private readonly REDIRECT_URL='http://localhost:5173/'
  private readonly CLIENT_ID=''
  private readonly endpoint: AxiosInstance

  constructor () {
    this.endpoint = axios.create({
      baseURL: this.BASE_URL
    })
  }

  public async getUserInfo() {
    const response = await this.endpoint.get('/me')
    console.log(response.data)
  }


  public async getAuthToken() {
    console.log(this.REDIRECT_URL)
    console.log(this.CLIENT_ID)
  }
}