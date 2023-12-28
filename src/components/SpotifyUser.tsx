import { FormEvent, useEffect, useState } from "react";
import { UserProfile } from "../utils/types";
import { SpotifyApiAuth } from "../utils/SpotifyApiAuth";

interface props {
  data: UserProfile
}

export function SpotifyUser({ data }: props) {
  const token: string = (window.localStorage.getItem('@access_token_spt') as string)
  const api = new SpotifyApiAuth()
  api.createAxiosInstance(token)

  const [quantity, setQuantity] = useState<number>(0);

  function getUserTrackData(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    api.getUserTracks(quantity)

  }

  useEffect(() => {

  }, [])



  return (
    <div className="flex items-center gap-7">
      <div>
        <img src={data.images[1].url} alt={`Imagem de ${data.display_name}`} className="rounded-full" />
      </div>
      <div>
        <h1 className="font-bold text-4xl pb-4">
          {data.display_name}
        </h1>
        <div className="opacity-55 text-center">
          <p>
            {data.email}
          </p>
          <p> Seguidores: {data.followers.total}</p>
          <div>
            <form onSubmit={(e) => getUserTrackData(e)} className="flex flex-col">
              <label htmlFor="quantity">Quantidade de musicas curtidas</label>
              <input
                className="text-white bg-black"
                id="quantity"
                type="number"
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
              <button>Ver</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )

}