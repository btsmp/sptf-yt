import { useEffect, useState } from 'react'
import { SpotifyApiAuth } from './utils/SpotifyApiAuth'
import { UserProfile } from './utils/types'
import { SpotifyUser } from './components/SpotifyUser'

function App() {
  const [userData, setUserData] = useState<UserProfile | undefined>()
  const spotifyAuthHandler = new SpotifyApiAuth()

  function handleSpotifyLogin() {
    const authLink = spotifyAuthHandler.generateURLtoAuthenticate()
    window.location.href = authLink
  }

  async function handleCallbackSpotify(code: string) {
    await spotifyAuthHandler.handleAuthCallback(code)
    const data = await spotifyAuthHandler.getUserInfo()
    setUserData(data)
  }


  function clearQueryParameters() {
    if (window.history.replaceState) {
      const newUrl = window.location.href.split('?')[0];
      window.history.replaceState({}, document.title, newUrl);
    }
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')
    if (code) {
      handleCallbackSpotify(code)
      clearQueryParameters()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className='flex flex-col items-center justify-between h-screen'>
      <h1 className='p-8'>Spotify {'->'} YoutubeMusic</h1>
      <div>
        <div className="flex">
          {userData ? <SpotifyUser data={userData} /> :
            <button
              onClick={handleSpotifyLogin}
              className='bg-green-800 p-4 rounded-md hover:bg-green-600'>
              Clique para logar no spotify
            </button>}

        </div>
      </div>
      <div></div>
    </main>
  )
}

export default App
