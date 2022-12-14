/*=============================================== Setup ===============================================*/

import { ApolloError } from "apollo-server"
import bcrypt from "bcryptjs"
import { emailRegex, passwordRegex, getRandomString } from "ts-utils-julseb"
import jwt from "jsonwebtoken"

import User from "../../models/User.model"
import Global from "../../models/Global.model"
import Contact from "../../models/Contact.model"
import ThankYou from "../../models/ThankYou.model"
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

        const newGlobal = new Global({
            name,
            cover,
            language,
            email,
        })

        return await newGlobal.save().then(() => {
            const newContact = new Contact({
                title: "Contact",
                body: "You can contact us here.",
                hideContact: true,
                showForm: false,

                labelName: "Your name",
                labelEmail: "Your email",
                labelSubject: "Subject of the message",
                labelMessage: "Your message",
                labelButton: "Send message",

                header: false,
                orderHeader: 0,
                footer: false,
                orderFooter: 0,
            })

            return newContact?.save().then(() => {
                const newThankYou = new ThankYou({
                    title: "Thank you for your message!",
                    body: "Your message has been sent.",
                })

                return newThankYou.save()
            })
        })
    },

    setupGlobal: async ({ _id }: GlobalType) => {
        const global = await Global.findById(_id)

        if (global) {
            const updatedGlobal = await Global.findByIdAndUpdate(
                _id,
                {
                    isGlobalSetup: true,
                },
                { new: true }
            )

            return updatedGlobal?.save()
        } else {
            throw new ApolloError("Global data not found", "GLOBAL_NOT_FOUND")
        }
    },
}
