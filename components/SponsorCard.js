import Link from "next/link";

const SponsorCard = ({sponsor}) => {
    return (
        <div className={'mb-3'}>
            <h5 className={"text-xl mb-2"}>
                {sponsor.name}
            </h5>
            <div>
                {
                    sponsor.links.map((link, index)=>{
                        return (
                            <div className={"flex"}>
                                <span className={'flex-1 text-sky-500 underline truncate'}>
                                    <Link href={link.url} target={'_blank'} rel={'noopener noreferrer'}>
                                        {link.url}
                                    </Link>
                                </span>
                                <span className={''}>
                                    clicked {link.clicked} times
                                </span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default SponsorCard