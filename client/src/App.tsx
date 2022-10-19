/*=============================================== App ===============================================*/

import React, { useState } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { uuid } from "./utils"

import ProtectedRoutes from "./routes/ProtectedRoutes"
import AnonRoutes from "./routes/AnonRoutes"

import routes from "./routes/routes"
import redirects from "./routes/redirects"

const App = () => {
    const [edited, setEdited] = useState(false)

    return (
        <Routes>
            {routes.map(route => (
                <Route
                    path={route.path}
                    element={
                        route.protected ? (
                            <ProtectedRoutes>
                                <route.element
                                    edited={route.edit && edited}
                                    setEdited={route.edit && setEdited}
                                />
                            </ProtectedRoutes>
                        ) : route.anon ? (
                            <AnonRoutes>
                                <route.element
                                    edited={route.edit && edited}
                                    setEdited={route.edit && setEdited}
                                />
                            </AnonRoutes>
                        ) : (
                            <route.element
                                edited={route.edit && edited}
                                setEdited={route.edit && setEdited}
                            />
                        )
                    }
                    key={uuid()}
                />
            ))}

            {redirects.length > 0 &&
                redirects.map(({ path, to }) => (
                    <Route
                        path={path}
                        element={<Navigate to={to} />}
                        key={uuid()}
                    />
                ))}
        </Routes>
    )
}

export default App
