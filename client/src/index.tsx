/*=============================================== Index ===============================================*/

import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { ApolloProvider } from "@apollo/client"
import { Toaster } from "react-hot-toast"
import { ThemeLight, Shadows, Spacers } from "tsx-library-julseb"

import { AuthProviderWrapper } from "./context/auth"
import client from "./graphql/apollo-client"
import { GlobalProviderWrapper } from "./context/global"

import App from "./App"

import reportWebVitals from "./tests/reportWebVitals"

import "tsx-library-julseb/index.css"
import "./styles/index.css"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
    <>
        <ApolloProvider client={client}>
            <BrowserRouter>
                <AuthProviderWrapper>
                    <GlobalProviderWrapper>
                        <App />
                    </GlobalProviderWrapper>
                </AuthProviderWrapper>
            </BrowserRouter>
        </ApolloProvider>

        <Toaster
            position="bottom-right"
            toastOptions={{
                duration: 3000,
                style: {
                    background: ThemeLight.White,
                    color: ThemeLight.Black,
                    boxShadow: Shadows.S,
                    padding: Spacers.M,
                },
            }}
        />
    </>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
