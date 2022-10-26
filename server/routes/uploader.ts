import express, { Router } from "express"
import fileUploader from "../config/cloudinary.config"
import cors from "cors"

import { API_PORT } from "../utils/consts"

const app = express()
const router = Router()

router.put(
    "/upload-picture",
    fileUploader.single("imageUrl"),
    (req, res, next) => {
        if (!req.file) {
            next(new Error("No file uploaded"))
            return
        }

        console.log(`File ${req.file.path} uploaded successfully`)

        return res.json({ secure_url: req.file.path })
    }
)

app.use("/api", router)

app.listen(API_PORT, () =>
    console.log(`📥 Cloudinary API listening on port ${API_PORT}`)
)

export default app
