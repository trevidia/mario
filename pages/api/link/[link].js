import prisma from "../../../lib/prisma";

const handler = async (req, res) => {
    try {
        const linkId = parseInt(req.query.link)
        switch (req.method) {
            case "GET":
                const link = await prisma.link.update({
                    where: {
                        lid: linkId,
                    },
                    data: {
                        clicked: {
                            increment: 1
                        }
                    }
                })
                return res.status(200).json({message: "success", link})
            default:
                return res.status(405).json({message: "Method not allowed"})
        }
    } catch (e) {
        return res.status(500).json({message: e.message})
    }
}

export default handler