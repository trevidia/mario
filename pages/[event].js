import axios from "../lib/axios";
import {useEffect, useState} from "react";
import Link from "next/link";
import Icon from "../components/Icon";
import Loading from "../components/Loading";
import {OpenInNewRounded} from "@mui/icons-material";
import {toast} from "react-toastify";

const Event = ({links, players, event,}) => {
    const [sponsorLinks, setSponsorLinks] = useState(links.map(link => {
        return {url: link.url, clicked: false, lid: link.lid}
    }))
    const [error, setError] = useState("")
    const [username, setUsername] = useState("")
    const [proceed, setProceed] = useState(false)
    const [vote, setVote] = useState({iusr: "", playerId: null})
    const [loading, setLoading] = useState(false)
    const [hasVoted, setHasVoted] = useState(false)

    const instaUserValidation = ()=>{
        const re = /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)$/
        return re.exec(username)
    }


    return (
        <>
            {
                loading && <Loading/>
            }
            <div className={"relative bg-gradient-to-tr from-fuchsia-400 to-cyan-300 h-screen w-screen py-8 flex justify-center px-6 overflow-y-auto"}>
                <div className={'h-screen inset-x-0 top-0 fixed backdrop-blur bg-white/40 z-0 '}>

                </div>
                {
                    hasVoted ? (
                        <div className={'flex flex-col items-center gap-8'}>
                            <h2 className={'text-4xl z-10'}>
                                {event.title}
                            </h2>
                        <div className={'z-10 text-3xl'}>
                            You have voted already. Wait for another event By <span className={'uppercase font-bold'}> Mario</span>
                        </div>
                        <img src={`${process.env.NEXT_PUBLIC_AMAZON_BUCKET}/${event.image}`} alt={'event flyer'} className={"h-[300px] w-[300px] object-cover z-10"}/>
                    </div>
                    ) : (
                        <div className={'lg:w-4/5 w-full z-10 '}>
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
                                                        onClick={async () => {
                                                            setSponsorLinks(prevState => {
                                                                let state = prevState
                                                                state[index].clicked = true
                                                                return [...state]
                                                            })
                                                            console.log(link)
                                                            await axios.get(`/link/${link.lid}`)
                                                        }}>
                                                        <span className={'w-2/3 truncate'}>
                                                            {link.url}
                                                        </span>
                                                        <OpenInNewRounded className={'mr-3'}/>
                                                    </div>
                                                </Link>
                                            ))
                                        }
                                        <div className={'mt-3'}>
                                            Instagram Username:
                                        </div>
                                        <form onSubmit={(e)=> e.preventDefault()} >
                                            <input
                                                autoCapitalize={'none'}
                                                type={'text'} className={'input w-full my-2 h-10'} value={username}
                                                   onChange={(e) => setUsername(e.target.value)} placeholder={'example'}/>
                                            <button className={"btn min-w-[100%] flex justify-center h-10 items-center text-lg mt-2"}
                                                    onClick={() => {
                                                        let allLinksClicked = true
                                                        sponsorLinks.forEach((link) => {
                                                            if (!link.clicked) {
                                                                allLinksClicked = false
                                                            }
                                                        })
                                                        if (!allLinksClicked){
                                                            toast("Not all links has been followed, please click the links and follow the account", {type: "error"})
                                                        }
                                                        let result = instaUserValidation()
                                                        if (allLinksClicked && username.length !== 0 && result !== null){
                                                            setVote({...vote, iusr: username.toLowerCase()})
                                                            setLoading(true)
                                                            axios.get(`/event/${event.slug}/${username}`)
                                                                .then((res)=> {
                                                                    setHasVoted(res.data.hasVoted)
                                                                    setLoading(false)
                                                                }).catch((err)=> {
                                                                setLoading(false)
                                                                console.log(err)
                                                            })
                                                            setProceed(true)
                                                        } else if (username.length === 0){
                                                            toast("Please Input the username used for following Mario", {type: "error"})
                                                        } else if (!result){
                                                            toast("Invalid Instagram username", {type: "error"})
                                                        }
                                                    }}>
                                                Proceed
                                            </button>
                                        </form>
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
                                    <>
                                    <div className={'flex justify-center gap-5 flex-wrap'}>
                                        {
                                            players.map(({player, id}, index)=> {
                                                console.log(player)
                                                return <div key={index} className={'bg-white px-3 py-2 flex flex-col gap-2 items-center rounded-md drop-shadow'}>
                                                    <img src={`https://ballonmario.s3.eu-west-3.amazonaws.com/${player.image}`} className={'h-36 rounded w-36 object-cover'} alt={`${player.firstName}'s picture`}/>
                                                    <span className={'text-xl'}>{player.name}</span>
                                                    <span>{player.department}</span>
                                                    <button className={'bg-fuchsia-400 rounded-full w-full py-2 mb-2 flex items-center justify-center text-white hover:bg-fuchsia-500 transition-colors'} onClick={()=> {
                                                        const data = {...vote, playerId: id}
                                                        setVote(data)
                                                        setLoading(true)
                                                        axios.post('/player/vote', data).then((res)=>{
                                                            setLoading(false)
                                                            setHasVoted(true)
                                                            console.log(res)
                                                        }).catch((err)=> setLoading(false))
                                                    }
                                                    }>
                                                        Vote
                                                    </button>
                                                </div>
                                            })
                                        }
                                    </div>
                                        <div className={"h-20 w-full"}>

                                        </div>
                                    </>
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
    console.log(slug)
    let notFound = false
    console.log(context.req.cookies)
    const res = await axios.get(`/event/${slug}`).catch((err) => notFound = true)


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
        }
    }
}