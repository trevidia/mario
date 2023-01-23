import {getSession} from "next-auth/react";
import PlayerVote from "../components/PlayerVote";

export const verifySession = (cb) => {
    return async (req, res) => {
        const session = await getSession({req})
        if (!session) return res.status(401).json({message: "Not authenticated"})
        return cb(req, res)
    }
}

export const eventPlayers = (players) => {
    return players.map(({player, _count}, index, players)=> {
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