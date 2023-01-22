import prisma from "../../../../lib/prisma";

const handler = async (req, res) => {
    try {
        let {event, page} = req.query
        let length = 10
        page = !isNaN(parseInt(page)) ? parseInt(page) : 1
        const currentEvent = await prisma.event.findFirst({
            where: {
                slug: event
            }
        })
        if (!currentEvent) return res.status(400).json("Invalid event")

        let condition = {
            player: {
                event: {
                    slug: event
                }
            }
        }

        const voteDetails = await prisma.vote.findMany({
            where: condition, orderBy: {
                vid: 'desc'
            },
        })
        const count = voteDetails.length
        const pages = Math.ceil(count / length)
        // next cursor is current page multiplied by
        const firstPage = page === 1
        const lastPage = pages === page
        let index = lastPage ? count - 1 : (page * length) - 1
        const cursor = firstPage ? undefined : voteDetails[index]?.vid

        let votes = []
        if ((firstPage || cursor)){
            votes = await prisma.vote.findMany({
                take: length,
                // skip: 1,
                cursor: cursor && {
                    vid: cursor
                },
                where: condition,
                orderBy: {
                    vid: 'desc'
                },
                include: {
                    player: {
                        select: {
                            player: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    }
                }
            })
            votes = votes.map(vote => {
                return {
                    vid: vote.vid,
                    iusr: vote.iusr,
                    playerVoted: vote.player.player.name
                }
            })
        }

        switch (req.method) {
            case "GET":
                const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/event/${event}/vote`
                return res.json({
                    total: count,
                    perPage: length,
                    currentPage: page,
                    lastPage: pages,
                    firstPageUrl: `${url}?page=1`,
                    lastPageUrl: `${url}?page=${pages}`,
                    prevPageUrl: page > 1 ? `${url}?page=${page - 1}` : null,
                    nextPageUrl: page < pages ? `${url}?page=${page + 1}` : null,
                    from: page === 1 ? 1 : page === pages && index + 1 % length !== 0 ? Math.trunc(((index + 1) / length)) * length + 1 :  index + 2 - length,
                    to: index + 1,
                    data: votes,
                })
            case "POST":
                const {vote} = req.body
                if (!(vote)) return res.status(400).json({message: "Invalid Input"})

                return res.status(201).json({message: "Success", vote})
            default:
                return res.status(405).json({message: "Method not allowed"})
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({message: "Internal server error", error: e.error, errorMessage: e.message})
    }
}

export default handler

