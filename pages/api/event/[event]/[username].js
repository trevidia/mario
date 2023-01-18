import prisma from "../../../../lib/prisma";

const handler = async (req, res) => {
    try {
        switch (req.method) {
            case "GET":
                const {event, username} = req.query
                console.log(username, event)
                const vote = await prisma.event.findFirst({
                    where: {
                        slug: event,
                        eventPlayers: {
                            some: {
                                votes: {
                                    some: {
                                        iusr: username
                                    }
                                }
                            }
                        }
                    }
                })
                // const vote = prisma.vote.findMany()

                return res.json({hasVoted: vote !== null})
            default:
                return res.status(405).json({message: "Method not allowed"})
        }

    } catch (e) {
        return res.status(500).json({message: "Internal server error", error: e.error, errorMessage: e.message})
    }
}

export default handler