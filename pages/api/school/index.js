import prisma from "../../../lib/prisma";
const handler = async (req, res) => {
    let schools
    try {
        switch (req.method) {
            case "GET":
                schools = await prisma.school.findMany()
                return res.json(schools)
            case "POST":
                const {schoolName} = req.body
                if (!schoolName) return res.status(400).json({message: "Invalid Input"})
                const school = await prisma.school.create({
                    data: {
                        name: schoolName
                    }
                })
                schools = await prisma.school.findMany()
                return res.status(201).json({message: "Success", school, schools})
            default:
                return res.status(405).json({message: "Method not allowed"})
        }
    } catch (e) {
        res.status(500).json({message: "Internal server error", error: e.error, errorMessage: e.message})
    }
}

export default handler