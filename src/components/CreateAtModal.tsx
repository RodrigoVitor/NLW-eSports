import * as Dialog from '@radix-ui/react-dialog'
import { Check, GameController } from 'phosphor-react'
import { Input } from '../components/Form/input'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as Toggle from '@radix-ui/react-toggle-group'
import { FormEvent, useEffect, useState } from 'react'
import  axios from 'axios'


interface Game {
    id: string,
    title: string,
  }

export function CreateAtModal () {
    const [games, setGames] = useState<Game[]>([])
    const [weekDays, setWeekDays] = useState<string[]>([])
    const [useVoiceChanel, setUseVoiceChanel] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:8080/games')
        .then(response => {
            setGames(response.data)
        })
    }, [])

    async function handleCreateAd(event: FormEvent) {
        event.preventDefault()
        const formData = new FormData(event.target as HTMLFormElement)
        const data = Object.fromEntries(formData)

        if(!data.name) {
            return;
        }

        try {
            await axios.post(`http://localhost:8080/games/${data.game}/ads`, {
                name: data.name,
                yearsPlayng: Number(data.yearsPlayng),
                discord: data.discord,
                weekDays: weekDays.map(Number),
                hourSTart: data.hourStart,
                hourEnd: data.hourEnd,
                useVoiceChannel: useVoiceChanel
            })
            alert('201 created')
        } catch (error) {
            alert('500 Server')
        }

        
        
    }   

    return (
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

          <Dialog.Content 
            className="fixed bg-[#2a2634] py-8 px-10 text-white top-1/2 left-1/2 
            -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25"
          >
            <Dialog.Title className='text-3xl font-black'>
              Publique um anúncio
            </Dialog.Title>
              asdasdasdasdsadasdsadsa
              <form onSubmit={handleCreateAd} className='mt-8 flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="game" className='font-semibold'>Qual o game?</label>
                <select 
                    name="game" id="game" 
                    className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:zinc-500'
                    defaultValue=""
                >
                    <option disabled  value="">Selecione o game que deseja jogar</option>
                    {games.map(game => (
                        <option key={game.id} value={game.id}>{game.title}</option>
                    ))}
                </select>
                </div>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="name">Seu nome (ou nickname)?</label>
                  <Input name="name" id='name' type="text" placeholder='Como te chamam dentro do game'/>
                </div>

                <div className='grid grid-cols-2 gap-6'>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor="yearsPlayng">Joga a quantos anos</label>
                    <Input name="yearsPlayng" id='yearsPlayng' type="number" placeholder='Tudo bem ser Zero' />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor="discord">Qual seu Discord</label>
                    <Input name="discord" id='discord' type="text" placeholder='Usuario00000' />
                  </div>
                </div>

                <div className='flex gap-6'>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor="weekDays">Quando costuma jogar?</label>
                    <Toggle.Root type='multiple' className='grid grid-cols-4 gap-2' onValueChange={setWeekDays}>
                      <Toggle.Item value='0' 
                        className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : ' bg-zinc-900'} `} title='Domingo'>
                            D
                    </Toggle.Item>
                      <Toggle.Item value='1' 
                        className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : ' bg-zinc-900'} `} title='Segunda'>
                        S
                    </Toggle.Item>
                      <Toggle.Item value='2' 
                        className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : ' bg-zinc-900'} `} title='Terça'>
                        T
                    </Toggle.Item>
                      <Toggle.Item value="3" 
                        className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : ' bg-zinc-900'} `} title='Quarta'>
                        Q
                    </Toggle.Item>
                      <Toggle.Item value="4" 
                       className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : ' bg-zinc-900'} `} title='Quinta'>
                        Q
                    </Toggle.Item>
                    <Toggle.Item value="5" 
                        className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : ' bg-zinc-900'} `} title='Sexta'>
                            S
                    </Toggle.Item>
                    <Toggle.Item value="6" 
                        className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : ' bg-zinc-900'} `} title='Sabado'>
                        S
                    </Toggle.Item>
                    </Toggle.Root>
                  </div>
                  <div className='flex flex-col gap-2 flex-1'>
                    <label htmlFor="hourStart">Qual horario do dia?</label>
                    <div className='grid grid-cols-2 gap-2'>
                      <Input name="hourStart" type="time" id="hourStart" placeholder='De'/>
                      <Input name="hourEnd" type="time" id="hourEnd" placeholder='Ate'/>
                    </div>
                  </div>
                </div>

                <label className='mt-2 flex items-center gap-2 text-sm'> 
                <Checkbox.Root className='w-6 h-6 p-1 rounded bg-zinc-900' checked={useVoiceChanel} onCheckedChange={(checked) => {
                    if (checked) {
                        setUseVoiceChanel(true)
                    } else {
                        setUseVoiceChanel(false)
                    }
                }}>
                    <Checkbox.Indicator>
                        <Check className="w-4 h-4 text-emerald-400"/>
                    </Checkbox.Indicator>
                </Checkbox.Root>
                  Costumo a me conectar ao chat de voz
                </label>

                <footer className='mt-4 flex justify-end gap-4'>
                  <Dialog.Close type="button" className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>
                    Cancelar
                  </Dialog.Close>

                  <button type='submit' 
                    className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600' 
                  >
                    <GameController size={24}/>
                    Encontrar duo
                  </button>
                </footer>
              </form>
          </Dialog.Content>
        </Dialog.Portal>
    )
}