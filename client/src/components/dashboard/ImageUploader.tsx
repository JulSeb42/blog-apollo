/*=============================================== ImageUploader ===============================================*/

import React from "react"
import { InputImage } from "tsx-library-julseb"

import cloudinaryService from "../../api/file-upload.service"

const ImageUploader = ({
    imageUrl,
    setImageUrl,
    setIsLoading,
    label,
    cover,
}: Props) => {
    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()

        const uploadData = new FormData()
        setIsLoading(true)

        // @ts-expect-error
        uploadData.append("imageUrl", e.target.files[0])

        cloudinaryService
            .uploadImage(uploadData)
            .then(res => {
                setImageUrl(res.secure_url)
                setIsLoading(false)
            })
            .catch(err => console.log(err))

        // @ts-expect-error
        if (e.target.files[0]) {
            // @ts-expect-error
            setImageUrl(e.target.files[0])
            const reader = new FileReader()
            reader.addEventListener("load", () => {
                // @ts-expect-error
                setImageUrl(reader.result)
            })
            // @ts-expect-error
            reader.readAsDataURL(e.target.files[0])
        }
    }

    return (
        <InputImage
            id="img-uploader"
            img={{
                src: imageUrl,
            }}
            onChange={(e: any) => handleImage(e)}
            label={label}
            width={cover ? "100%" : 64}
            height={cover ? 250 : 64}
            icons={{
                empty: cover ? "image-add" : "user",
            }}
            borderRadius="m"
        />
    )
}

export default ImageUploader

interface Props {
    imageUrl: string
    setImageUrl: (imageUrl: string) => void
    setIsLoading: (isLoading: boolean) => void
    label?: string
    cover?: boolean
}
