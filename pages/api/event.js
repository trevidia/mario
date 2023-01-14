const handler = (req, res)=>{
    try {
        switch (req.method) {
            case "GET":
                return res.json(["events"])
            case "POST":
                return res.status(201).json({message: "success", event: {}})
            default:
                return res.status(405).json({message: "Method not allowed"})
        }
    } catch (e) {
        return res.status(500).json({message: "Internal server error", error: e.error, errorMessage: e.message})
    }
}

export default handler