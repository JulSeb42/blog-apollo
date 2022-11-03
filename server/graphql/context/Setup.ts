/*=============================================== Setup ===============================================*/

import { ApolloError } from "apollo-server"
import bcrypt from "bcryptjs"
import { emailRegex, passwordRegex, getRandomString } from "ts-utils-julseb"
import jwt from "jsonwebtoken"

import User from "../../models/User.model"
import Global from "../../models/Global.model"
import { UserType, GlobalType } from "../../types"

import { SALT_ROUNDS, TOKEN_SECRET, JWT_CONFIG } from "../../utils/consts"

export const SetupContext = {
    createFirstAccount: async ({
        fullName,
        email,
        password,
        imageUrl,
        bio,
    }: UserType) => {
        if (!fullName) {
            throw new ApolloError("Full name is required", "FULL_NAME_REQUIRED")
        }

        if (!email) {
            throw new ApolloError("Email is required", "FULL_NAME_REQUIRED")
        }

        if (!emailRegex.test(email)) {
            throw new ApolloError("Email is not valid.", "EMAIL_NOT_VALID")
        }

        if (!passwordRegex.test(password)) {
            throw new ApolloError(
                "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
                "PASSWORD_NOT_VALID"
            )
        }

        const salt = bcrypt.genSaltSync(SALT_ROUNDS)
        const hashedPassword = bcrypt.hashSync(password, salt)
        const generatedHash = bcrypt.hashSync(getRandomString(10), salt)

        const newUser: any = new User({
            fullName,
            email,
            password: hashedPassword,
            approved: true,
            role: "admin",
            generatedPassword: generatedHash,
            imageUrl,
            bio,
        })

        const token = jwt.sign(
            newUser._doc,
            TOKEN_SECRET,
            // @ts-expect-error
            JWT_CONFIG
        )

        newUser.token = token

        return newUser.save()
    },

    createGlobal: async ({ name, cover, language, email }: GlobalType) => {
        if (!name) {
            throw new ApolloError("Name is required", "NAME_REQUIRED")
        }

        if (!language) {
            throw new ApolloError("Language is required", "LANGUAGE_REQUIRED")
        }

        if (!emailRegex.test(email || "")) {
            throw new ApolloError("Email is not valid", "EMAIL_NOT_VALID")
        }

        const newGlobal = new Global({
            name,
            cover,
            language,
            email,
        })

        return newGlobal.save()
    },
}
