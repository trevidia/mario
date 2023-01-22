import VoteProgressBar from "./VoteProgressBar";
import Image from "next/image";
const {random, round} = Math
const PlayerVote = ({percent, vote, player}) => {
  return (
      <div className={"mb-3 flex w-full items-center"}>
          <div className={'w-10 h-10 relative rounded-full overflow-clip mr-3'}>
              <Image src={`${process.env.NEXT_PUBLIC_AMAZON_BUCKET}/${player.image}`} width={200} height={200} quality={5} style={{objectFit: 'cover'}}  alt={player.name} />
          </div>
          <div className={'flex flex-col w-full flex-1'}>
              <h4 className={'text-xl text-zinc-900'}>
                  {
                      player.name
                  }
              </h4>
              <div className={'flex items-center'}>
                  <VoteProgressBar percent={percent}/>
                  <span className={'ml-2 '}>
                      {vote} votes
                  </span>
              </div>
          </div>
      </div>
  )
}

export default PlayerVote