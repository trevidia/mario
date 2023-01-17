import prisma from "../../../../lib/prisma";

const handler = async (req, res) => {
    try {
        switch (req.method) {
            case "GET":
                const eventSlug = req.query.event
                const event = await prisma.event.findFirst({
                    where: {
                        slug: eventSlug
                    },
                    include: {
                        school: true,
                        eventPlayers: {
                            select: {
                                id: true,
                                player: true
                            }
                        },
                    }
                })
                if (!event) return res.status(404).json({message: "Event not found"})
                let links = await prisma.link.findMany()

                return res.json({event, links})
            default:
                return res.status(405).json({message: "Method not allowed"})
        }

    } catch (e) {
        return res.status(500).json({message: "Internal server error", error: e.error, errorMessage: e.message})
    }
}

export default handler