import prisma from "../../../lib/prisma";

const handler = async (req, res) => {
    try {
        switch (req.method) {
            case "GET":
                const schools = await prisma.school.findMany()
                const sponsor = await prisma.sponsor.findMany(
                    {
                        include: {
                            links: true
                        }
                    }
                )
                return res.json({schools, sponsor})
            default:
                return res.status(405).json({message: "Method not allowed"})
        }

    } catch (e) {
        return res.status(500).json({message: "Internal server error", error: e.error, errorMessage: e.message})
    }
}

export default handler