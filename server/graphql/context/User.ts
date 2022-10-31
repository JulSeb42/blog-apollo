/*=============================================== User context ===============================================*/

import { ApolloError } from "apollo-server"
import bcrypt from "bcryptjs"
import { passwordRegex, emailRegex, getRandomString, getRandomAvatar } from "ts-utils-julseb"
import jwt from "jsonwebtoken"

import User from "../../models/User.model"
import { UserType } from "../../types"

import { SALT_ROUNDS, TOKEN_SECRET, JWT_CONFIG } from "../../utils/consts"
import sendMail from "../../utils/send-mail"

const UserContext = {
    users: async () => await User.find(),
    user: async ({ fullName }: UserType) => {
        const user = await User.findOne({ fullName })

        if (user) {
            return user
        } else {
            throw new ApolloError("User not found", "USER_NOT_FOUND")
        }
    },
    userById: async ({ _id }: UserType) => {
        const user = await User.findById(_id)

        if (user) {
            return user
        } else {
            throw new ApolloError("User not found", "USER_NOT_FOUND")
        }
    },

    addUser: async ({ fullName, email, role }: UserType) => {
        if (!fullName) {
            throw new ApolloError("Full name is required", "FULL_NAME_REQUIRED")
        }

        if (!email) {
            throw new ApolloError("Email is required", "FULL_NAME_REQUIRED")
        }

        if (!emailRegex.test(email)) {
            throw new ApolloError("Email is not valid.", "EMAIL_NOT_VALID")
        }

        const foundUser = await User.findOne({ email })

        if (!foundUser) {
            const password = getRandomString(10)
            const salt = bcrypt.genSaltSync(SALT_ROUNDS)
            const hashedPassword = bcrypt.hashSync(password, salt)

            const newUser: any = new User({
                fullName,
                email,
                password: hashedPassword,
                generatedPassword: hashedPassword,
                role,
                approved: true,
                imageUrl: getRandomAvatar("other")
            })

            const token = jwt.sign(
                newUser._doc,
                TOKEN_SECRET,
                // @ts-expect-error
                JWT_CONFIG
            )

            newUser.token = token
            
            const res = await newUser.save().then((res: any) => {
                sendMail(
                    email,
                    "You were added on our blog!",
                    `An account has been created for you on our blog. Please <a href="${process.env.ORIGIN}/login">login</a> with your email and this password: ${password}. Then change this password to fully access the dashboard.`
                )

                return res
            })

            return res

        } else {
            throw new ApolloError("A user with this email already exists", "USER_ALREADY_EXISTS")
        }
    },

    editUser: async ({ _id, fullName, bio, imageUrl }: UserType) => {
        if (!fullName) {
            throw new ApolloError(
                "Your full name is required",
                "FULL_NAME_REQUIRED"
            )
        }

        const user = await User.findByIdAndUpdate(
            _id,
            { fullName, bio, imageUrl },
            {
                new: true,
            }
        )

        return user
    },

    editPassword: async ({
        _id,
        oldPassword,
        newPassword,
    }: EditPasswordType) => {
        const user: UserType | null = await User.findById(_id)

        if (user) {
            if (await bcrypt.compare(oldPassword, user.password)) {
                if (passwordRegex.test(newPassword)) {
                    const salt = bcrypt.genSaltSync(SALT_ROUNDS)
                    const hashedPassword = bcrypt.hashSync(newPassword, salt)

                    return await User.findByIdAndUpdate(
                        _id,
                        { password: hashedPassword },
                        {
                            new: true,
                        }
                    )
                } else {
                    throw new ApolloError(
                        "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
                        "PASSWORD_NOT_VALID"
                    )
                }
            } else {
                throw new ApolloError(
                    "The old password does not match",
                    "PASSWORD_NOT_MATCHING"
                )
            }
        } else {
            throw new ApolloError("User not found", "USER_NOT_FOUND")
        }
    },

    deleteUser: async ({ _id }: UserType) => {
        if (!_id) {
            throw new ApolloError("ID is missing", "ID_MISSING")
        }

        await User.findByIdAndDelete(_id)
        return `User ${_id} was deleted successfully`
    },

    setUserRole: async ({ _id, role }: UserType) => {
        const user = await User.findById(_id)

        if (user) {
            return await User.findByIdAndUpdate(_id, { role }, { new: true })
        } else {
            throw new ApolloError("User not found", "USER_NOT_FOUND")
        }
    },

    featureUser: async ({ _id, featured }: UserType) => {
        const user = await User.findById(_id)

        if (user) {
            return await User.findByIdAndUpdate(
                _id,
                { featured },
                { new: true }
            )
        } else {
            throw new ApolloError("User not found", "USER_NOT_FOUND")
        }
    },

    approveUser: async ({ _id, approved }: UserType) => {
        const user = await User.findById(_id)

        if (user) {
            return await User.findByIdAndUpdate(
                _id,
                { approved },
                { new: true }
            )
        } else {
            throw new ApolloError("User not found", "USER_NOT_FOUND")
        }
    },
}

export { UserContext }

type EditPasswordType = {
    _id: string
    oldPassword: string
    newPassword: string
}
