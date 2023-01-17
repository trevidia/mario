import axios from "../lib/axios";
import {useState} from "react";
import Link from "next/link";
import Icon from "../components/Icon";
import Loading from "../components/Loading";

const Event = ({links, players, event, hasVoted}) => {
    const [sponsorLinks, setSponsorLinks] = useState(links.map(link => {
        return {url: link.url, clicked: false}
    }))
    const [error, setError] = useState("")
    const [username, setUsername] = useState("")
    const [proceed, setProceed] = useState(false)
    const [vote, setVote] = useState({iusr: "", playerId: null})
    const [loading, setLoading] = useState(false)

    return (
        <>
            {
                loading && <Loading/>
            }
            <div className={"relative bg-gradient-to-tr from-fuchsia-400 to-cyan-300 h-screen w-screen py-8 flex justify-center px-6 overflow-clip"}>
                <div className={'h-screen inset-x-0 top-0 absolute backdrop-blur bg-white/40 z-0'}>

                </div>
                {
                    hasVoted ? (
                        <div className={'z-10'}>
                            You have voted already.
                        </div>
                    ) : (
                        <div className={'lg:w-2/5 md:w-3/5 w-full z-10'}>
                            <h3 className={'text-center text-3xl text-zinc-800 mb-5'}>
                                {event.title}

                            </h3>
                            {
                                !proceed ? (
                                    <>
                                        <p className={'text-lg text-zinc-900 text-justify mb-5'}>
                                            This award is sponsored by Mario System, the Music Artiste and C.E.O. MARIO COLLECTIONS.
                                            Follow our Sponsor via the two links below for your vote to be valid.
                                        </p>
                                        {
                                            sponsorLinks.map((link, index) => (
                                                <Link href={link.url} target={'_blank'} rel={'noopener noreferrer'} key={index}>
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
                                        <input type={'text'} className={'input w-full my-2 h-10'} value={username}
                                               onChange={(e) => setUsername(e.target.value)} placeholder={'example'}/>
                                        <button className={"btn min-w-[100%] flex justify-center h-10 items-center text-lg mt-2"}
                                                onClick={() => {
                                                    let allLinksClicked = true
                                                    sponsorLinks.forEach((link) => {
                                                        if (!link.clicked) {
                                                            allLinksClicked = false
                                                            setError("Not all links have been visited")
                                                        }
                                                    })
                                                    if (allLinksClicked && username.length !== 0){
                                                        setVote({...vote, iusr: username})
                                                        setProceed(true)
                                                    } else if (username.length === 0){
                                                        setError("Input your username for verification")
                                                    }
                                                }}>
                                            Proceed
                                        </button>
                                        {
                                            error && (
                                                <div className={"text-red-800 flex justify-center items-center mt-5"}>
                                                    <Icon icon={'error'} className={'mr-3'}/>
                                                    {error}
                                                </div>
                                            )
                                        }
                                    </>
                                ) : (
                                    <div className={'flex justify-center gap-5 flex-wrap'}>
                                        {
                                            players.map(({player, id}, index)=> {
                                                console.log(player)
                                                return <div key={index} className={'bg-white px-3 py-2 flex flex-col gap-2 items-center rounded-md drop-shadow'}>
                                                    <img src={`https://ballonmario.s3.eu-west-3.amazonaws.com/${player.image}`} className={'h-36 rounded w-36 object-cover'} alt={`${player.firstName}'s picture`}/>
                                                    <span>{player.firstName} {player.lastName}</span>
                                                    <button className={'bg-fuchsia-400 rounded-full w-full py-2 mb-2 flex items-center justify-center text-white hover:bg-fuchsia-500 transition-colors'} onClick={()=> {
                                                        const data = {...vote, playerId: id}
                                                        setVote(data)
                                                        setLoading(true)
                                                        axios.post('/player/vote', data).then((res)=>{
                                                            setLoading(false)
                                                            window.cookieStore.set('vote', JSON.stringify(data))
                                                        }).catch((err)=> setLoading(false))
                                                    }
                                                    }>
                                                        Vote
                                                    </button>
                                                </div>
                                            })
                                        }
                                    </div>
                                )
                            }
                        </div>

                    )
                }
            </div>
        </>
    )
}

export default Event

export const getServerSideProps = async (context) => {
    const slug = context.params.event
    const {vote} = context.req.cookies
    let hasVoted = false
    let notFound = false
    const res = await axios.get(`/event/${slug}`).catch((err) => notFound = true)
    let playerVotedFor = vote && JSON.parse(vote).playerId

    res.data.event.eventPlayers.forEach(player => {
        if (player.id === playerVotedFor){
            hasVoted = true
        }
    })


    if (notFound) {
        return {
            notFound
        }
    }

    return {
        props: {
            links: res.data.links,
            players: res.data.event.eventPlayers,
            event: res.data.event,
            hasVoted
        }
    }
}