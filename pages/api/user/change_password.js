import bcrypt from "bcrypt";
import prisma from "../../../lib/prisma";

const handler = async (req, res) => {
    try {
        switch (req.method) {
            case "GET":
                return res.json(["admins"])
            case "POST":
                const {password, username} = req.body
                if (!(password && username)) return res.status(400).json({message: "Invalid Input"})

                const hash = await bcrypt.hash(password, 10)
                const user = await prisma.user.update({
                    where: {
                        username
                    },
                    data: {
                        password: hash
                    }
                })
                return res.status(201).json({message: "success", admin: user})
            default:
                return res.status(405).json({message: "Method not allowed"})
        }
    } catch (e) {
        return res.status(500).json({message: e.message})
    }
}

export default handler