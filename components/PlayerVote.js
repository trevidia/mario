import VoteProgressBar from "./VoteProgressBar";
import {useEffect, useState} from "react";
const {random, round} = Math
const PlayerVote = ({percent, vote, player}) => {
    const colors = ['bg-fuchsia-400', 'bg-cyan-300', 'bg-yellow-300']
    const [color, setColor] = useState('bg-cyan-300')
    useEffect(()=>{
        setColor(prevState => colors[round(random() * 2)])
    },[])

  return (
      <div className={"mb-3 flex w-full items-center"}>
          <img className={`h-10 w-10 mr-3 object-cover rounded-full`} src={`${process.env.NEXT_PUBLIC_AMAZON_BUCKET}/${player.image}`}/>
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