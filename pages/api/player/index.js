import prisma from "../../../lib/prisma";
import AWS from "aws-sdk"
import formidable from 'formidable'
import * as fs from 'node:fs'
import s3Client from "../../../lib/aws";



const formParser = (req)=>{
    return new Promise(async (resolve, reject) => {
        const form = formidable()
        let imageUrl
        await form.parse(req, async (err, fields, files) => {
            const {image} = files
            const {department, school, name} = fields
            if (!(image && name && image && school)) return reject('Invalid Input')
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
                            name, department, image: key, schoolId: parseInt(school)
                        }
                    })
                    const players = await prisma.player.findMany({
                        where: {
                            schoolId: parseInt(school)
                        }
                    })
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
                const resObject = await formParser(req).catch((err)=>{
                    console.log(err)
                })

                return res.status(201).json({message: "success", ...resObject})
            default:
                return res.status(405).json({message: "Method not allowed"})
        }
    } catch (e) {
        res.status(500).json({message: "Internal server error", error: e.error, errorMessage: e.message})
    }
}

export default handler