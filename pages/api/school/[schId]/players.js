import prisma from "../../../../lib/prisma";


const handler = async (req, res) => {
    try {
        switch (req.method) {
            case "GET":
                const schoolId = parseInt(req.query.schId);
                console.log(schoolId)
                const players = await prisma.player.findMany({
                    where: {
                        schoolId: schoolId
                    }
                })

                return res.json({players})
            default:
                return res.status(405).json({message: "Method not allowed"})
        }

    } catch (e) {
        return res.status(500).json({message: "Internal server error", error: e.error, errorMessage: e.message})
    }
}

export default handler