import prisma from "../../../lib/prisma";

const handler = async (req, res) => {
    try {
        switch (req.method) {
            case "GET":
                const sponsors = await prisma.sponsor.findMany()
                return res.json(sponsors)
            case "POST":
                const {firstName, lastName, middleName, title, links} = req.body
                if (!(firstName && lastName)) return res.status(400).json({message: "Invalid Input"})
                let data
                if (links){
                    data = {
                        firstName, lastName, middleName, title, links: {
                            create: links.map(link => {return {url: link}})
                        }
                    }
                } else {
                    data = {
                        firstName, lastName, middleName, title
                    }
                }
                const sponsor = await prisma.sponsor.create({
                    data
                })
                return res.status(201).json({message: "Success", sponsor})
            default:
                return res.status(405).json({message: "Method not allowed"})
        }
    } catch (e) {
        res.status(500).json({message: "Internal server error", error: e.error, errorMessage: e.message})
    }
}

export default handler