import prisma from "../../../../lib/prisma";
import s3Client from "../../../../lib/aws";
import formidable from "formidable";
import * as fs from 'node:fs'


const formParser = (req)=>{
    return new Promise(async (resolve, reject) => {
        const form = formidable()
        let imageUrl
        await form.parse(req, async (err, fields, files) => {
            const {image} = files
            const {title, school, start, end, players, sponsor} = fields
            if (!(title && school && start && end && players && sponsor )) return reject('Invalid Input')
            const startDate = new Date(start)
            const endDate = new Date(end)
            if (isNaN(startDate) || isNaN(endDate)) return reject("Invalid start or end date")
            if (startDate > endDate) return reject("End Date is supposed to be after Start Date")

            const key = `${req.query.event}/${image.originalFilename}`
            console.log(key)
            await s3Client.putObject({
                Bucket: "ballonmario",
                Key: key,
                Body: fs.createReadStream(image.filepath)
            }, async (err, data) => {
                if (err){
                    console.log(err, "err")
                    reject("fima")
                } else {
                   try {
                       let event = await prisma.event.findFirst({
                           where: {
                               slug: req.query.event
                           }
                       })
                       event = await prisma.event.update({
                           where: {
                               eid: event.eid
                           },
                           data: {
                               title, schoolId: parseInt(school), image: key, start: startDate, end: endDate
                           }
                       })

                       await prisma.$transaction([
                           prisma.eventPlayer.deleteMany({
                               where: {
                                   eventId: event.eid
                               }
                           }),
                           prisma.eventPlayer.createMany({
                               data: JSON.parse(players).map(player => {return {eventId: event.eid, playerId: player.pid}})
                           })
                       ])
                       resolve(event.slug)
                   } catch (err){
                       console.log(err)
                       reject(err.message)
                   }
                }
            })
        })
    })
}


const handler = async (req, res) => {
    try {
        const eventSlug = req.query.event
        switch (req.method) {
            case "GET":
                const event = await prisma.event.findFirst({
                    where: {
                        slug: eventSlug
                    },
                    include: {
                        school: true,
                        eventSponsors: {
                            include: {
                                sponsor: {
                                    include: {
                                        links: true
                                    }
                                }
                            }
                        },
                        eventPlayers: {
                            select: {
                                id: true,
                                player: true
                            }
                        },
                    }
                })
                if (!event) return res.status(404).json({message: "Event not found"})
                const schools = await prisma.school.findMany()
                let links = await prisma.link.findMany()

                return res.json({event, links, schools})
            case "POST":
                const slug = await formParser(req)
                return res.json({message: "success", slug})
            default:
                return res.status(405).json({message: "Method not allowed"})
        }

    } catch (e) {
        return res.status(500).json({message: "Internal server error", error: e.error, errorMessage: e.message})
    }
}

export const config = {
    api: {
        bodyParser: false
    }
}

export default handler