import BaseLayout from "../../../../components/BaseLayout";
import axios from "../../../../lib/axios";
import Link from "next/link";
import {useEffect, useState} from "react";
import PlayerVote from "../../../../components/PlayerVote";
import {eventPlayers} from "../../../../lib/utils";

const Votes = ({votes: propVotes, eventPlayers: propPlayers}) => {
    const [votes, setVotes] = useState(propVotes)
    const [players, setPlayers] = useState(propPlayers)

    useEffect(()=>{
        console.log(players)
    }, [players])

    function handlePrevVotes() {
        axios.get(votes.prevPageUrl).then((res)=>{
            setVotes(res.data.votes)
            setPlayers(res.data.eventPlayers)
        }).catch((err)=> {
            console.log(err)
        })
    }

    function handleNextVotes() {
        axios.get(votes.nextPageUrl).then((res)=>{
            setVotes(res.data.eventPlayers)
            setPlayers(res.data.eventPlayers)
        }).catch((err)=> {
            console.log(err)
        })
    }

    return (
        <BaseLayout>
            <div className={'overflow-y-auto w-full'}>
                <h2 className={"text-3xl mb-4"}>Votes</h2>
                <div className={'bg-white rounded-md shadow mb-3 px-4 py-2'}>
                    {
                        eventPlayers(players)
                    }
                </div>
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Instagram user
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <div className={'flex items-center'}>
                                    Profile link
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 ml-1" aria-hidden="true"
                                         fill="currentColor" viewBox="0 0 320 512">
                                        <path
                                            d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/>
                                    </svg>
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <div className={'flex items-center'}>
                                    Contestant
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 ml-1" aria-hidden="true"
                                         fill="currentColor" viewBox="0 0 320 512">
                                        <path
                                            d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/>
                                    </svg>
                                </div>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            votes.data.map((vote, index, playerVotes) => (
                                <tr className={`bg-white dark:bg-gray-800 ${playerVotes.length - 1 !== index ? "border-b dark:border-gray-700" : ""}`} key={index}>
                                    <th scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {vote.iusr}
                                    </th>
                                    <td className="px-6 py-4 hover:underline">
                                        <Link href={`https://instagram.com/${vote.iusr}`} target={'_blank'} rel={'noopener noreferrer'}>
                                            https://instagram.com/{vote.iusr}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4">
                                        {vote.playerVoted}
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>

                <div className="flex flex-col items-center mt-4">
                    <span className="text-sm text-gray-700 dark:text-gray-400">
                        Showing <span className="font-semibold text-gray-900 dark:text-white">{votes.from}</span> to <span
                        className="font-semibold text-gray-900 dark:text-white">{votes.to}</span> of <span
                        className="font-semibold text-gray-900 dark:text-white">{votes.total}</span> Entries
                    </span>
                    <div className="inline-flex mt-2 xs:mt-0">
                        <button
                            onClick={handlePrevVotes}
                            disabled={votes.prevPageUrl === null}
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                      d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                                      clipRule="evenodd"></path>
                            </svg>
                            Prev
                        </button>
                        <button
                            onClick={handleNextVotes}
                            disabled={votes.nextPageUrl === null}
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            Next
                            <svg aria-hidden="true" className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                      clipRule="evenodd"></path>
                            </svg>
                        </button>
                    </div>
                </div>


            </div>
        </BaseLayout>
    )
}

export default Votes

export const getServerSideProps = async ({params}) => {
    let {event, page} = params
    const response = await axios.get(`/event/${event}/vote?${page ?? ""}`).catch(err => {})
    // const totalVotesRes =
    return {
        props: {
            votes: response.data.votes,
            eventPlayers: response.data.eventPlayers
        }
    }
}
