interface GameBannerProps {
    bannerUrl: string,
    title: string,
    adsCount: number
}

export const GameBanner = ({bannerUrl, title, adsCount}: GameBannerProps) => {
    return (
        <a href="" className="relative rounded-lg overflow-hidden">
            <img src={bannerUrl} alt="" width="150px"/>
            <div className="pt-28 pb-4 px-4 bg-game-gradient w-[150px] absolute bottom-0 right-0 top-0">
              <strong className="font-bold text-white block">{title}</strong>
              <span className="text-zinc-300 text-sm block mt-1">{adsCount} anuncio(s)</span>
            </div>
        </a>
    )
}