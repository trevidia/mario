import EventCard from "./EventCard";
import PlayerVote from "./PlayerVote";
import SponsorCard from "./SponsorCard";

const BaseLayout = ({children}) => {
    return (
        <div className={'h-screen w-screen bg-gray-100 flex flex-col text-zinc-900 sm:overflow-clip overflow-y-auto'}>
            <div className={"h-12 bg-white mb-8 shadow"}>
            </div>
            <div className={"h-[calc(100%-5rem)] sm:w-2/3 w-full sm:mx-auto px-3 sm:px-0 flex flex-col lg:overflow-y-clip overflow-y-auto"}>
                {
                    children
                }
            </div>
        </div>
    )
}

export default BaseLayout