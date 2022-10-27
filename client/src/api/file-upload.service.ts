/*=============================================== File uploader ===============================================*/

import axios from "axios"

const API_URI = process.env.REACT_APP_CLOUDINARY_URI || "http://localhost:4000"

const http = axios.create({
    baseURL: `${API_URI}/api`,
    withCredentials: true,
    headers: {
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Credentials": "true",
        "Content-Type": "application/json",
    },
})

const errorHandler = (err: any) => {
    throw err
}

const uploadImage = (file: any) => {
    return http
        .put("/upload-picture", file)
        .then(res => res.data)
        .catch(errorHandler)
}

// const createImage = (newImage: any) => {
//     return http
//         .post("/uploader/edit-picture", newImage)
//         .then(res => res.data)
//         .catch(errorHandler)
// }

const cloudinaryService = {
    uploadImage,
    // createImage,
}

export default cloudinaryService
