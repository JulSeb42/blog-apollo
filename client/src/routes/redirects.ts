/*=============================================== Redirects ===============================================*/

type RedirectRoute = {
    path: string
    to: string
}

const redirects: RedirectRoute[] = [
    {
        path: "/dashboard/posts", // Path of the route to redirect
        to: "/dashboard", // Path where you want the route to be redirected
    },
]

export default redirects
