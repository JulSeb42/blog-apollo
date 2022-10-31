/*=============================================== CheckCircle ===============================================*/

import React from "react"
import { ThemeLight } from "tsx-library-julseb"

const CheckCircle = ({ color = "success", size = 16 }: Props) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20Z"
                fill={
                    color === "danger"
                        ? ThemeLight.Danger500
                        : ThemeLight.Success500
                }
            />
            <path
                d="M9.99902 13.587L7.70002 11.292L6.28802 12.708L10.001 16.413L16.707 9.707L15.293 8.293L9.99902 13.587Z"
                fill={
                    color === "danger"
                        ? ThemeLight.Danger500
                        : ThemeLight.Success500
                }
            />
        </svg>
    )
}

export default CheckCircle

interface Props {
    color?: "success" | "danger"
    size?: number
}
