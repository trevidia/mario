import AWS from "aws-sdk";

const s3Client = new AWS.S3({
    region: "eu-west-3",
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY
    }
})

export default s3Client