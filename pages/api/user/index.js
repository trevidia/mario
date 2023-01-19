import bcrypt from "bcrypt";
import prisma from "../../../lib/prisma";

const handler = async (req, res) => {
    try {
        switch (req.method) {
            case "GET":
                return res.json(["admins"])
            case "POST":
                const {firstName, lastName, username, password, role, email, middleName} = req.body
                if (!(firstName && lastName && username && password)) return res.status(400).json({message: "Invalid Input"})

                const hash = await bcrypt.hash(password, 10)
                const oldUser = await prisma.user.findUnique({
                    where: {
                        username
                    }
                })
                if (oldUser) res.status(409).json({message: "User already exist"})
                const user = await prisma.user.create({
                    data: {
                        username, firstName,lastName, middleName, role, email, password: hash
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