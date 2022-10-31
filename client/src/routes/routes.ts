/*=============================================== Routes ===============================================*/

import { FC } from "react"

import Homepage from "../pages/Homepage"
import NotFound from "../pages/NotFound"

import AllAuthors from "../pages/author/AllAuthors"
import AuthorDetail from "../pages/author/AuthorDetail"

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
import Categories from "../pages/dashboard/Categories"
import EditProfile from "../pages/dashboard/users/EditProfile"
import Comments from "../pages/dashboard/Comments"
import AllPages from "../pages/dashboard/pages/AllPages"
import NewPage from "../pages/dashboard/pages/NewPage"
import EditPage from "../pages/dashboard/pages/EditPage"
import GlobalData from "../pages/dashboard/GlobalData"
import UsersPage from "../pages/dashboard/users/UsersPage"
import AddUser from "../pages/dashboard/users/AddUser"
import ChangePassword from "../pages/dashboard/users/ChangePassword"
import ThankYou from "../pages/dashboard/users/ThankYou"

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
    {
        path: "/dashboard/categories",
        element: Categories,
        protected: true,
    },
    {
        path: "/dashboard/edit-profile",
        element: EditProfile,
        protected: true,
        edit: true,
    },
    {
        path: "/dashboard/comments",
        element: Comments,
        protected: true,
    },
    {
        path: "/dashboard/pages",
        element: AllPages,
        protected: true,
    },
    {
        path: "/dashboard/pages/new-page",
        element: NewPage,
        protected: true,
    },
    {
        path: "/dashboard/pages/:id",
        element: EditPage,
        protected: true,
    },
    {
        path: "/dashboard/global-data",
        element: GlobalData,
        protected: true,
    },
    {
        path: "/dashboard/users",
        element: UsersPage,
        protected: true,
    },
    {
        path: "/dashboard/users/new-user",
        element: AddUser,
        protected: true,
    },
    {
        path: "/dashboard/change-password",
        protected: true,
        element: ChangePassword,
    },
    {
        path: "/dashboard/thank-you",
        protected: true,
        element: ThankYou,
    },
]

export default routes
