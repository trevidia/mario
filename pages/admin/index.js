import EventCard from "../../components/EventCard";
import PlayerVote from "../../components/PlayerVote";
import {useEffect, useReducer, useState} from "react";
import SponsorCard from "../../components/SponsorCard";
import BaseLayout from "../../components/BaseLayout";
import Icon from "../../components/Icon";
import axios from "../../lib/axios";
import {dashBoardReducer, dashStateInitializer} from "../../lib/dashBoardReducer";
import Link from "next/link";
import {AddOutlined} from "@mui/icons-material";


const Admin = ({events})=>{
    const votes = [30, 40, 50]
    const totalVotes = votes.reduce((previousValue, currentValue)=>{
        return previousValue + currentValue
    })
    const [tab, setTab] = useState("Events")
    const [state, dispatch] = useReducer(dashBoardReducer, events, dashStateInitializer)

    return (
        <BaseLayout>
            <div className={'flex h-10 w-max flex-none'}>
                <div className={`tab ${tab === "Events" ? 'bg-zinc-300': "bg-transparent"} transition-all`} onClick={()=>setTab("Events")}>
                    Events
                </div>
                <div className={`tab ${tab === "Previous Events" ? 'bg-zinc-300' : "bg-transparent"} transition-all`} onClick={()=>setTab("Previous Events")}>
                    Previous Events
                </div>
            </div>
            <div className={'flex h-14 justify-between items-center flex-none'}>
                <Link href={'/admin/event/new'}>
                    <div className={'flex items-center px-3 py-2 hover:bg-zinc-200 cursor-pointer rounded-md'}>
                        <AddOutlined className={'mr-2'}/>
                        <span>create event</span>
                    </div>
                </Link>
                {
                    state.selectedEvent && <div className={'underline cursor-pointer'}>
                        <Link href={`/admin/event/${state.events.find(event => event.eid === state.selectedEvent).slug}`}>
                            Edit Event
                        </Link>
                    </div>
                }
            </div>
            <div className={'flex h-max py-3 mb-3 w-full overflow-x-scroll overflow-y-hidden px-2 flex-none'}>
                {
                    state.events.map((event, index)=>{
                        return <EventCard key={index} event={event} dispatch={dispatch} selected={state.selectedEvent}/>
                    })
                }
            </div>
            {
                state.selectedEvent ? (
                    <div className={'flex mb-3 h-1/2 flex-wrap md:flex-nowrap shrink pb-5 md:items-stretch'}>
                        <div className={'md:h-full w-full min-h-[250px] h-72 bg-white md:mr-2 mr-0 md:mb-0 mb-3 rounded-md drop-shadow  px-5 py-4 flex flex-col'}>
                            <div className={'flex justify-between'}>
                                <h3 className={"capitalize bg-gunmetal/20  w-max p-2 mb-5 rounded"}>
                                    top 3 players
                                </h3>
                                <Link href={`/admin/event/${state.events.find((event) => event.eid === state.selectedEvent).slug}/votes`}>
                                    View votes
                                </Link>
                            </div>
                            <div className={'overflow-y-auto h-full shrink'}>
                                {
                                    state.events.find((event) => event.eid === state.selectedEvent).top3.map(({player, _count}, index, players)=> {
                                        const totalVotes = players.reduce((previousValue, currentValue, currentIndex) => {
                                            if (currentIndex >= 2){
                                                return previousValue + currentValue._count.votes
                                            } else {
                                                return previousValue._count.votes + currentValue._count.votes
                                            }
                                        })
                                        console.log(totalVotes)
                                        return <PlayerVote player={player} key={index} vote={_count.votes} percent={Math.round((_count.votes/ totalVotes) * 100)}/>
                                    })
                                }
                            </div>
                        </div>
                        <div className={'md:h-full h-72 min-h-[250px] w-full bg-white md:ml-2 ml-0 rounded-md drop-shadow px-5 py-4 overflow-clip flex flex-col'}>
                            <h3 className={"capitalize bg-gunmetal/20  w-max p-2 mb-5 rounded"}>
                                Sponsors
                            </h3>
                            <div className={'overflow-y-scroll h-full'}>
                                {
                                    state
                                        .events
                                        .find(event=> event.eid === state.selectedEvent)
                                        .eventSponsors
                                        .map(({sponsor}, index)=> {
                                            console.log(sponsor)
                                            return <SponsorCard key={index} sponsor={sponsor}/>
                                        })
                                }
                            </div>
                        </div>
                        <div className={'h-10 w-3 sm:hidden'}>

                        </div>

                    </div>
                ): (
                    <div className={'flex mb-3 h-1/2 flex-wrap sm:flex-nowrap'}>
                        No Event Selected Yet

                    </div>
                )
            }
        </BaseLayout>
    )
}

export default Admin

export const getServerSideProps = async ({req, res}) => {
    const response = await axios.get('/event').catch((err)=>{
        // console.log(err)
    })
    console.log(response)
    const events = response.data.events

    return {
        props: {
            events: events
        }
    }
}