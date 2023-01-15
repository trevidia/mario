import prisma from "../../../lib/prisma";

const handler = async (req, res) => {
    try {
        switch (req.method) {
            case "GET":
                const players = await prisma.player.findMany()
                return res.json(players)
            case "POST":
                const {firstName, lastName, middleName, image, school} = req.body
                if (!(firstName && lastName && image && school)) return res.status(400).json({message: "Invalid Input"})

                const player = await prisma.player.create({
                    data: {
                        firstName, lastName, middleName, image, schoolId: parseInt(school)
                    }
                })

                return res.status(201).json({message: "Success", player})
            default:
                return res.status(405).json({message: "Method not allowed"})
        }
    } catch (e) {
        res.status(500).json({message: "Internal server error", error: e.error, errorMessage: e.message})
    }
}

export default handler