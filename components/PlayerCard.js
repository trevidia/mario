import {DeleteForever, ModeEditOutlined} from "@mui/icons-material";
import Image from "next/image";

const PlayerCard = ({player}) => {
  return (
      <div className={'flex mb-4 bg-white shadow p-2 rounded-md'}>
          <div className={'relative h-10 w-10 sm:h-20 sm:w-20 mr-5 drop-shadow rounded overflow-clip flex-none self-center'}>
              <Image src={`${process.env.NEXT_PUBLIC_AMAZON_BUCKET}/${player.image}`} alt={`Image of ${player.name}`} fill={true} style={{objectFit: "cover"}}/>
          </div>
          <div className={'flex flex-col shrink w-full'}>
              <span className={'capitalize text-lg mb-3 text-zinc-900 w-full truncate'}>
                  { player.name}
              </span>
              <span className={'text-zinc-500 text-sm truncate w-full'}>
                  { player.department}
              </span>
          </div>
          <div className={'text-white flex flex-wrap flex-none'}>
              <div className={'bg-emerald-300 h-8 w-8 rounded flex justify-center items-center cursor-pointer hover:bg-emerald-400 transition-colors'}>
                  <ModeEditOutlined/>
              </div>
              <div className={'bg-red-600 h-8 w-8 rounded flex justify-center items-center ml-2 cursor-pointer hover:bg-red-500 transition-colors'}>
                  <DeleteForever/>
              </div>
          </div>
      </div>
  )
}

export default PlayerCard