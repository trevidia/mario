
const handler = async (req, res) => {
    try {
        switch (req.method) {
            case "POST":
                const {iusr, playerId} = req.body
                if (!(iusr && playerId)) return res.status(400).json({message: "Invalid Input"})
                const player = await prisma.vote.create({
                    data: {
                        iusr, playerId: parseInt(playerId)
                    }
                })
                return res.status(201).json({message: "success", player})
            default:
                return res.status(405).json({message: "Method not allowed"})
        }
    } catch (e) {
        console.log(e)
        return res.status(500).json({message: "Internal server error", error: e.error, errorMessage: e.message})
    }
}

export default handler