import EventCard from "../../components/EventCard";
import PlayerVote from "../../components/PlayerVote";
import {useState} from "react";
import SponsorCard from "../../components/SponsorCard";
import BaseLayout from "../../components/BaseLayout";
import Icon from "../../components/Icon";


const Admin = ()=>{
    const votes = [30, 40, 50]
    const totalVotes = votes.reduce((previousValue, currentValue)=>{
        return previousValue + currentValue
    })
    const [tab, setTab] = useState("Events")

    return (
        <BaseLayout>
            <div className={'flex h-10 w-max'}>
                <div className={`tab ${tab === "Events" ? 'bg-zinc-300': "bg-transparent"} transition-all`} onClick={()=>setTab("Events")}>
                    Events
                </div>
                <div className={`tab ${tab === "Previous Events" ? 'bg-zinc-300' : "bg-transparent"} transition-all`} onClick={()=>setTab("Previous Events")}>
                    Previous Events
                </div>
            </div>
            <div className={'flex h-14 justify-between items-center'}>
                <div className={'flex items-center px-3 py-2 hover:bg-zinc-200 cursor-pointer rounded-md'}>
                        <Icon icon={'add'} className={'mr-2'}/>
                    <span>create event</span>
                </div>
                <div className={'underline cursor-pointer'}>
                    Edit Event
                </div>
            </div>
            <div className={'flex h-52 py-3 w-full overflow-x-clip'}>
                <EventCard/>
                <EventCard/>
            </div>
            <div className={'flex mb-3 h-1/2 flex-wrap sm:flex-nowrap'}>
                <div className={'sm:h-full w-full h-72 bg-white sm:mr-5 mr-0 sm:mb-0 mb-3 rounded-md drop-shadow  px-5 py-4 overflow-clip flex flex-col'}>
                    <h3 className={"capitalize bg-gunmetal/20  w-max p-2 mb-5 rounded"}>
                        top 3 players
                    </h3>
                    <div className={'overflow-y-auto h-full'}>
                        {
                            votes.map((value, index)=><PlayerVote key={index} vote={value} percent={Math.round((value/totalVotes) * 100)}/>)
                        }
                    </div>
                </div>
                <div className={'sm:h-full w-full h-72 bg-white sm:ml-5 ml-0 rounded-md drop-shadow px-5 py-4 overflow-clip flex flex-col'}>
                    <h3 className={"capitalize bg-gunmetal/20  w-max p-2 mb-5 rounded"}>
                        Sponsors
                    </h3>
                    <div className={'overflow-y-scroll h-full'}>
                        <SponsorCard/>
                        <SponsorCard/>
                        <SponsorCard/>
                    </div>
                </div>
                <div className={'h-3 w-3 sm:hidden'}>

                </div>

            </div>
        </BaseLayout>
    )
}

export default Admin