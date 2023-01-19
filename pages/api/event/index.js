import prisma from "../../../lib/prisma";

const handler = async (req, res) => {
    try {
        switch (req.method) {
            case "GET":
                const events = await prisma.event.findMany({
                    include: {
                        eventSponsors: {
                            select: {
                                sponsor: {
                                    include:{
                                        links: true
                                    }
                                },
                            }
                        },
                        eventPlayers: {
                            orderBy:{
                              votes: {
                                  _count: 'desc'
                              }
                            },
                            select: {
                                player: true,
                                _count: {
                                    select: {
                                        votes: true
                                    }
                                }
                            }
                        }
                    }
                })
                return res.json({events})
            case "POST":
                const {title, school, start, end, players, sponsor} = req.body
                if (!(title && school && start && end)) return res.status(400).json({message: "Invalid Input"})
                const startDate = new Date(start)
                const endDate = new Date(end)
                if (isNaN(startDate) || isNaN(endDate)) return res.status(400).json({message: "Invalid start or end date"})
                if (startDate > endDate) return res.status(400).json({message: "End Date is supposed to be after Start Date"})

                const event = await prisma.event.create({
                    data: {
                        title, schoolId: school, start: startDate, end: endDate
                    }
                })
                console.log(event)

                const eventSponsor = await prisma.eventSponsor.create({
                    data: {
                        eventId: event.eid,
                        sponsorId: sponsor.sid,
                    }
                })
                console.log(eventSponsor)
                const many = players.map(player => {
                    return {eventId: event.eid, playerId: player.pid}
                })
                console.log(many)
                const eventPlayers = await prisma.eventPlayer.createMany({
                    data: many
                })

                return res.status(201).json({message: "success", event})
            default:
                return res.status(405).json({message: "Method not allowed"})
        }
    } catch (e) {
        console.log(e)
        return res.status(500).json({message: "Internal server error", error: e.error, errorMessage: e.message})
    }
}

export default handler