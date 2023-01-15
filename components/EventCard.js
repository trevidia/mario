import Ping from "./Ping";
import {useState} from "react";

const EventCard = () => {
    const [clicked, setClicked] = useState(false)
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const date = new Date('2023-02-10')
  return (
      <div onClick={()=>!clicked && setClicked(true)} className={`h-max w-[300px] bg-gunmetal rounded py-3 mr-2 px-4 flex flex-col ${clicked && 'ring-2 ring-gunmetal/50 ring-offset-1'}`}>
          <h4 className={"text-2xl font-semibold text-cultured/95"}>
              Lasu Ballon D&apos;or
          </h4>
          <div className={'flex items-center'}>
              <Ping size={'h-3 w-3 mr-2'}/>
              <span className={'text-cultured/80'}>Running</span>
          </div>
          <div className={'text-cultured/80 mb-3'}>
              Due: {date.getDate()} {months[date.getMonth()]} {date.getFullYear()}
          </div>
          <div className={'h-max flex justify-between items-center'}>
              <div className={'bg-cultured/90 w-max p-2 rounded'}>
                  11 Players
              </div>
              <div className={'flex'}>
                  <div className={'h-8 w-8 ml-2 bg-yellow-300'}>

                  </div>
                  <div className={'h-8 w-8 ml-2 bg-cyan-200'}>

                  </div>
                  <div className={'h-8 w-8 ml-2 bg-fuchsia-400'}>

                  </div>
              </div>
          </div>


      </div>
  )
}

export default EventCard