import { UserProfile } from "../utils/types";

interface props {
  data: UserProfile
}

export function SpotifyUser({ data }: props) {

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
        </div>
      </div>
    </div>
  )

}