import {useEffect, useState} from 'react'
import "./styles/main.css"
import logoImg from "./assets/logo-nlw-esports.svg"
import { GameBanner } from "./components/GameBanner"
import { CreateAdBanner } from "./components/CreatAdBanner"
import { DiscordLogo, GameController } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'
import { CreateAtModal } from './components/CreateAtModal'
import axios from 'axios'

interface Game {
  id: string,
  title: string,
  bannerUrl: string,
  _count: {
    ads: number
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    axios.get('http://localhost:8080/games')
    .then(response => {
        setGames(response.data)
    })
}, [])

  return (
    <div className="max-w-[80vw] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="" width="200px" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map(game => (
          <GameBanner key={game.id} bannerUrl={game.bannerUrl} title={game.title} adsCount={game._count.ads} />
        ))}
      </div>
      <Dialog.Root>
        <CreateAdBanner />
          <CreateAtModal />
        
      </Dialog.Root>
    </div>
  )
}

export default App
