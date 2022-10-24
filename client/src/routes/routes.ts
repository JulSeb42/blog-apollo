/*=============================================== Routes ===============================================*/

import { FC } from "react"

import Homepage from "../pages/Homepage"
import NotFound from "../pages/NotFound"

import AllAuthors from "../pages/author/AllAuthors"
import AuthorDetail from "../pages/author/AuthorDetail"

import Signup from "../pages/auth/Signup"
import ThankYou from "../pages/auth/ThankYou"
import Verify from "../pages/auth/Verify"
import Login from "../pages/auth/Login"
import ForgotPassword from "../pages/auth/ForgotPassword"
import ForgotSent from "../pages/auth/ForgotSent"
import ResetPassword from "../pages/auth/ResetPassword"
import Goodbye from "../pages/auth/Goodbye"

import AllPosts from "../pages/posts/AllPosts"
import PostDetail from "../pages/posts/PostDetail"

import AllCategories from "../pages/categories/AllCategories"
import CategoryDetail from "../pages/categories/CategoryDetail"
import RedirectCategory from "../pages/categories/RedirectCategory"

import Dashboard from "../pages/dashboard/Dashboard"
import NewPost from "../pages/dashboard/posts/NewPost"
import EditPost from "../pages/dashboard/posts/EditPost"

type RouteType = {
    path: string
    element: FC | any
    protected?: boolean
    anon?: boolean
    edit?: boolean
}

const routes: RouteType[] = [
    {
        path: "/",
        element: Homepage,
    },
    {
        path: "*",
        element: NotFound,
    },

    {
        path: "/signup",
        element: Signup,
        anon: true,
    },
    {
        path: "/thank-you",
        element: ThankYou,
    },
    {
        path: "/verify/:token/:id",
        element: Verify,
        edit: true,
    },
    {
        path: "/login",
        element: Login,
        anon: true,
    },
    {
        path: "/login/forgot-password",
        element: ForgotPassword,
        anon: true,
    },
    {
        path: "/login/forgot-password/email-sent",
        element: ForgotSent,
        anon: true,
    },
    {
        path: "/reset-password/:token/:id",
        element: ResetPassword,
        anon: true,
    },
    {
        path: "/goodbye",
        element: Goodbye,
        anon: true,
    },

    {
        path: "/posts",
        element: AllPosts,
    },
    {
        path: "/posts/:category/:slug",
        element: PostDetail,
    },

    {
        path: "/categories",
        element: AllCategories,
    },
    {
        path: "/categories/:name",
        element: CategoryDetail,
    },
    {
        path: "/posts/:category",
        element: RedirectCategory,
    },

    {
        path: "/authors",
        element: AllAuthors,
    },
    {
        path: "/authors/:fullName",
        element: AuthorDetail,
    },

    {
        path: "/dashboard",
        element: Dashboard,
        protected: true,
    },
    {
        path: "/dashboard/posts/new-post",
        element: NewPost,
        protected: true,
    },
    {
        path: "/dashboard/posts/:id",
        element: EditPost,
        protected: true,
    },
]

export default routes
