import prisma from "../../../../lib/prisma";

const handler = async (req, res) => {
    try {
        let {event} = req.query
        const currentEvent = await prisma.event.findFirst({
            where: {
                slug: event
            },
            include: {
                players: true
            }
        })
        if (!currentEvent) return res.status(400).json("Invalid event")
        switch (req.method) {
            case "GET":
                return res.json(currentEvent)
            case "POST":
                const {player} = req.body
                if (!(player)) return res.status(400).json({message: "Invalid Input"})

                const eventPlayer = await prisma.eventPlayer.create({
                    data: {
                        eventId: currentEvent.eid, playerId: parseInt(player)
                    }
                })

                return res.status(201).json({message: "Success", eventPlayer})
            default:
                return res.status(405).json({message: "Method not allowed"})
        }
    } catch (e) {
        res.status(500).json({message: "Internal server error", error: e.error, errorMessage: e.message})
    }
}

export default handler