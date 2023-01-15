import prisma from "../../../lib/prisma";

const handler = async (req, res) => {
    try {
        switch (req.method) {
            case "GET":
                const events = await prisma.event.findMany()
                return res.json(events)
            case "POST":
                const {title, school, start, end} = req.body
                if (!(title && school && start && end)) return res.status(400).json({message: "Invalid Input"})
                const startDate = new Date(start)
                const endDate = new Date(end)
                if (isNaN(startDate) || isNaN(endDate)) return res.status(400).json({message: "Invalid start or end date"})
                if (startDate > endDate) return res.status(400).json({message: "End Date is supposed to be after Start Date"})

                const event = await prisma.event.create({
                    data: {
                        title, schoolId: school, start: startDate, end: endDate
                    }
                })

                return res.status(201).json({message: "success", event})
            default:
                return res.status(405).json({message: "Method not allowed"})
        }
    } catch (e) {
        return res.status(500).json({message: "Internal server error", error: e.error, errorMessage: e.message})
    }
}

export default handler