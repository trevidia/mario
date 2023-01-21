import {DeleteForever, ModeEditOutlined} from "@mui/icons-material";

const PlayerCard = ({player}) => {
  return (
      <div className={'flex mb-4 bg-white shadow p-2 rounded-md'}>
          <img src={`${process.env.NEXT_PUBLIC_AMAZON_BUCKET}/${player.image}`}
               className={"h-20 w-20 mr-5 object-cover rounded-md drop-shadow"}
               alt={`Image of ${player.name}`}/>
          <div className={'flex flex-col flex-1'}>
              <span className={'capitalize text-lg mb-3 text-zinc-900'}>
                  { player.name}
              </span>
              <span className={'text-zinc-500 text-sm'}>
                  { player.department}
              </span>
          </div>
          <div className={'text-white flex'}>
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