/*=============================================== Auth context ===============================================*/

import { ApolloError } from "apollo-server"
import bcrypt from "bcryptjs"
import { getRandomString, emailRegex, passwordRegex } from "ts-utils-julseb"
import jwt from "jsonwebtoken"

import sendMail from "../../utils/send-mail"

import User from "../../models/User.model"
import { UserType } from "../../types"

import { SALT_ROUNDS, JWT_CONFIG, TOKEN_SECRET } from "../../utils/consts"

const AuthContext = {
    getUserByToken: async ({ token }: UserType) => {
        return await User.findOne({ token })
    },

    login: async ({ email, password }: UserType) => {
        if (!email) {
            throw new ApolloError("Email is required", "EMAIL_REQUIRED")
        }

        if (!password) {
            throw new ApolloError("Password is required", "PASSWORD_REQUIRED")
        }

        const foundUser: any = await User.findOne({ email })

        if (foundUser) {
            if (await bcrypt.compare(password, foundUser.password)) {
                // @ts-expect-error
                const token = jwt.sign(foundUser._doc, TOKEN_SECRET, JWT_CONFIG)

                foundUser.token = token

                await User.findByIdAndUpdate(
                    foundUser._id,
                    { token: token },
                    { new: true }
                )

                return foundUser._doc
            } else {
                throw new ApolloError(
                    "Incorrect password",
                    "INCORRECT_PASSWORD"
                )
            }
        } else {
            throw new ApolloError(
                "This user does not exist.",
                "USER_NON_EXISTENT"
            )
        }
    },

    forgotPassword: async ({ email }: UserType) => {
        const foundUser = await User.findOne({ email })

        if (foundUser) {
            const resetToken = getRandomString(20)

            const res = await User.findOneAndUpdate(
                { email },
                { resetToken: resetToken },
                { new: true }
            ).then((res: any) => {
                sendMail(
                    email,
                    "Reset your password on our app",
                    `Hello,<br /><br />To reset your password, <a href="${process.env.ORIGIN}/reset-password/${resetToken}/${res._id}">click here</a>.`
                )

                return res
            })

            return res
        } else {
            throw new ApolloError("User not found.", "USER_NOT_FOUND")
        }
    },

    resetPassword: async ({ _id, resetToken, password }: UserType) => {
        const foundUser = await User.findById(_id)

        if (foundUser) {
            if (foundUser.resetToken === resetToken) {
                const updatedUser: any = {}

                if (password) {
                    if (!passwordRegex.test(password)) {
                        throw new ApolloError(
                            "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
                            "PASSWORD_NOT_VALID"
                        )
                    }

                    const salt = bcrypt.genSaltSync(SALT_ROUNDS)
                    const hashedPassword = bcrypt.hashSync(password, salt)

                    updatedUser.password = hashedPassword

                    return User.findByIdAndUpdate(_id, updatedUser, {
                        new: true,
                    })
                } else {
                    throw new ApolloError(
                        "Password is required",
                        "PASSWORD_REQUIRED"
                    )
                }
            } else {
                throw new ApolloError("Wrong reset token.", "WRONG_TOKEN")
            }
        } else {
            throw new ApolloError("User not found.", "USER_NOT_FOUND")
        }
    },
}

export { AuthContext }
