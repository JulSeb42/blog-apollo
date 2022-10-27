/*=============================================== Server ===============================================*/

import { ApolloServer } from "apollo-server"
import cors from "cors"
import express from "express"
import cookieParser from "cookie-parser"

import typeDefs from "./graphql/typeDefs"
import resolvers from "./graphql/resolvers"
import context from "./graphql/context"

import "./db"

import { PORT } from "./utils/consts"

import app from "./routes/uploader"

const initServer = async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context,
    })

    app.use(
        cors({
            credentials: true,
            origin: process.env.ORIGIN || "http://localhost:3000",
            // allowedHeaders: "*",
            // @ts-expect-error
            "Content-Type": "application/json",
        })
    )
    // app.set("trust proxy", 1)
    // app.use(express.json())
    // app.use(express.urlencoded({ extended: false }))
    // app.use(cookieParser())

    await server
        .listen({ port: PORT })
        .then(({ url }) => console.log(`🚀 Apollo server running at ${url}`))
        .catch(err => console.log(err))
}

initServer()
