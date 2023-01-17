import axios from "../lib/axios";
import {useState} from "react";
import Link from "next/link";
import Icon from "../components/Icon";

const Event = ({links, players, event})=>{
    const [sponsorLinks, setSponsorLinks] = useState(links.map(link => {return {url: link.url, clicked: false}}))
    return (
        <div className={"relative bg-gradient-to-tr from-fuchsia-400 to-cyan-300 h-screen w-screen py-8 flex justify-center px-6 overflow-clip"}>
            <div className={'h-screen inset-x-0 top-0 absolute backdrop-blur bg-white/40 z-0'}>

            </div>
            <div className={'md:w-2/5 w-full z-10'}>
                <h3 className={'text-center text-3xl text-zinc-800 mb-5'}>
                    {event.title}
                </h3>
                <p className={'text-lg text-zinc-900 text-justify mb-5'}>
                    This award is sponsored by Mario System, the Music Artiste and C.E.O. MARIO COLLECTIONS. Follow our Sponsor via the two links below for your vote to be valid.
                </p>
                {
                    sponsorLinks.map((link, index) => (
                        <Link href={link.url} target={'_blank'} rel={'noopener noreferrer'}>
                            <div
                                className={'py-2 bg-zinc-200/80 rounded my-2 px-3 flex items-center justify-between'}
                                onClick={() => setSponsorLinks(prevState => {
                                    let state = prevState
                                    state[index].clicked = true

                                    return [...state]
                                })}>
                                <span className={'w-2/3 truncate'}>
                                    {link.url}
                                </span>
                                <Icon icon={'link'} className={'mr-3'}/>

                            </div>
                        </Link>
                    ))
                }
                <div className={'mt-3'}>
                    Instagram Username:
                </div>
                <input type={'text'} className={'input w-full my-2 h-10'} placeholder={'example'}/>
                <button className={"btn min-w-[100%] flex justify-center h-10 items-center text-lg mt-2"}>
                    Proceed
                </button>
            </div>
        </div>
    )
}

export default Event

export const getServerSideProps = async (context) => {
    const slug = context.params.event
    let notFound = false
    const res = await axios.get(`/event/${slug}`).catch((err)=> notFound = true)
    if (notFound){
        return {
            notFound
        }
    }

    return {
        props: {
            links: res.data.links,
            players: res.data.event.eventPlayers,
            event: res.data.event,
        }
    }
}