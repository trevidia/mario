import prisma from "../../../lib/prisma";
import AWS from "aws-sdk"
import formidable from 'formidable'
import * as fs from 'node:fs'

const s3Client = new AWS.S3({
    region: "eu-west-3",
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY
    }
})

const formParser = (req)=>{
    return new Promise(async (resolve, reject) => {
        const form = formidable()
        let imageUrl
        await form.parse(req, async (err, fields, files) => {
            const {image} = files
            const {firstName, lastName, school, middleName} = fields
            if (!(firstName && lastName && image && school)) return reject('Invalid Input')
            const key = `${school}/${image.originalFilename}`
            s3Client.putObject({
                Bucket: "ballonmario",
                Key: key,
                Body: fs.createReadStream(image.filepath),
            }, async (err, data) => {
                // console.log(data, "data")
                if (err){
                    return reject
                } else {
                    const player = await prisma.player.create({
                        data: {
                            firstName, lastName, middleName, image: key, schoolId: parseInt(school)
                        }
                    })
                    const players = await prisma.player.findMany()
                    return resolve({player, players})
                }
            })
        })
    })
}

export const config = {
    api: {
        bodyParser: false
    }
}

const handler = async (req, res) => {
    try {
        switch (req.method) {
            case "GET":
                const players = await prisma.player.findMany()
                return res.json(players)
            case "POST":
                const resObject = await formParser(req)

                return res.status(201).json({message: "success", ...resObject})
            default:
                return res.status(405).json({message: "Method not allowed"})
        }
    } catch (e) {
        res.status(500).json({message: "Internal server error", error: e.error, errorMessage: e.message})
    }
}

export default handler