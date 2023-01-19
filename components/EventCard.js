import Ping from "./Ping";
import {useState} from "react";
import {setSelectedEvent} from "../lib/dashBoardReducer";
import Icon from "./Icon";
import {toast} from "react-toastify";

const EventCard = ({event, dispatch, selected}) => {
    const [clicked, setClicked] = useState(false)
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const date = new Date(event.end)
  return (
      <div onClick={()=> dispatch(setSelectedEvent(event.eid))} className={`h-max w-[300px] bg-gunmetal rounded py-3 mr-2 px-4 flex flex-col cursor-pointer ${ selected === event.eid && 'ring-2 ring-gunmetal/50 ring-offset-1'}`}>
          <div className={'flex justify-between text-cultured/95 items-center'}>
              <h4 className={"text-2xl font-semibold"}>
                  {
                      event.title
                  }
              </h4>
              <Icon icon={'share'} className={''} onClick={async () => {
                  await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_APP_URL}/${event.slug}`)
                  toast('Copied')
              }}/>
          </div>
          <div className={'flex items-center'}>
              <Ping size={'h-3 w-3 mr-2'}/>
              <span className={'text-cultured/80'}>Running</span>
          </div>
          <div className={'text-cultured/80 mb-3'}>
              Due: {date.getDate()} {months[date.getMonth()]} {date.getFullYear()}
          </div>
          <div className={'h-max flex justify-between items-center'}>
              <div className={'bg-cultured/90 w-max p-2 rounded'}>
                  {
                      `${event.eventPlayers.length} Players`
                  }
              </div>
              <div className={'flex'}>
                  {
                      event.top3.map(({player}, index)=> {
                          return (
                              <img src={`${process.env.NEXT_PUBLIC_AMAZON_BUCKET}/${player.image}`} key={index} className={'h-8 w-8 ml-2 rounded object-cover'} alt={`${player.name} image`}/>
                          )
                      })
                  }

              </div>
          </div>


      </div>
  )
}

export default EventCard