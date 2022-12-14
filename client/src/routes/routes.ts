/*=============================================== Routes ===============================================*/

import { FC } from "react"

import Homepage from "../pages/Homepage"
import NotFound from "../pages/NotFound"
import GlobalPage from "../pages/GlobalPage"
import SearchResults from "../pages/SearchResults"

import Contact from "../pages/contact/Contact"
import ThankYouContact from "../pages/contact/ThankYou"

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
import ContactDashboard from "../pages/dashboard/contact/Contact"
import EditContact from "../pages/dashboard/contact/EditContact"
import EditThankYou from "../pages/dashboard/contact/EditThankYou"
import UsersPage from "../pages/dashboard/users/UsersPage"
import AddUser from "../pages/dashboard/users/AddUser"
import ChangePassword from "../pages/dashboard/users/ChangePassword"
import ThankYou from "../pages/dashboard/users/ThankYou"
import Navigation from "../pages/dashboard/Navigation"
import EditPassword from "../pages/dashboard/users/EditPassword"
import GetApproval from "../pages/dashboard/GetApproval"

import SetupAccount from "../pages/setup/SetupAccount"
import SetupGlobalData from "../pages/setup/SetupGlobalData"
import SetupUsers from "../pages/setup/SetupUsers"
import SetupCategories from "../pages/setup/SetupCategories"

type RouteType = {
    path: string
    element: FC | any
    protected?: boolean
    anon?: boolean
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
        path: "/:slug",
        element: GlobalPage,
    },
    {
        path: "/search",
        element: SearchResults,
    },

    {
        path: "/contact",
        element: Contact,
    },
    {
        path: "/contact/thank-you",
        element: ThankYouContact,
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
        path: "/dashboard/contact",
        element: ContactDashboard,
        protected: true,
    },
    {
        path: "/dashboard/contact/edit-contact",
        element: EditContact,
        protected: true,
    },
    {
        path: "/dashboard/contact/edit-thank-you",
        element: EditThankYou,
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
    {
        path: "/dashboard/navigation",
        protected: true,
        element: Navigation,
    },
    {
        path: "/dashboard/edit-profile/edit-password",
        protected: true,
        element: EditPassword,
    },
    {
        path: "/dashboard/get-approval",
        protected: true,
        element: GetApproval,
    },

    {
        path: "/setup/new-account",
        element: SetupAccount,
    },
    {
        path: "/setup/create-global-data",
        element: SetupGlobalData,
    },
    {
        path: "/setup/create-users",
        element: SetupUsers,
    },
    {
        path: "/setup/create-categories",
        element: SetupCategories,
    },
]

export default routes
