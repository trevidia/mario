import prisma from "../../../lib/prisma";

const handler = async (req, res) => {
    let sponsors
    try {
        switch (req.method) {
            case "GET":
                sponsors = await prisma.sponsor.findMany()
                return res.json(sponsors)
            case "POST":
                const {name, links} = req.body
                if (!(name)) return res.status(400).json({message: "Invalid Input"})
                let data
                if (links){
                    data = {
                        name, links: {
                            create: links.map(link => {return {url: link}})
                        }
                    }
                } else {
                    data = {
                        name
                    }
                }
                await prisma.sponsor.create({
                    data
                })
                sponsors = await prisma.sponsor.findMany()
                return res.status(201).json({message: "Success", sponsors })
            default:
                return res.status(405).json({message: "Method not allowed"})
        }
    } catch (e) {
        res.status(500).json({message: "Internal server error", error: e.error, errorMessage: e.message})
    }
}

export default handler