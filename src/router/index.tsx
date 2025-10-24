import { useRoutes } from "react-router-dom"
import SideMenu from '../layouts/dashboardnav'
import GeneralGuard from './generalGuard'
import UserGuard from './userGuard'
import Dashboard from '../pages/dashboard'
import LandingPage from '../pages/landing'
import CoverLetter from "../pages/coverletter"
import Resume from "../pages/resume"
import Profile from "../pages/profile"
import Settings from "../pages/settings"
import Notifications from "../pages/notifications"
import Applications from "../pages/applications"
import JobSearch from "../pages/jobsearch"
import Analytics from "../pages/analytics"
import Help from "../pages/help"
import LoginPage from "../pages/auth/login"
import SignupPage from "../pages/auth/createaccount"
import ResetPage from "../pages/auth/resetpasword"
const Router = () => {
    const routes = [
        {
            path: "/",
            element: (
                <GeneralGuard>
                    <LandingPage />
                </GeneralGuard>
            ),
        },
        {
            path: "/login",
            element: (

                <LoginPage />

            ),
        },
        {
            path: "/signup",
            element: (

                <SignupPage />

            ),
        },
        {
            path: "/reset-password",
            element: (

                <ResetPage />

            ),
        },
        {
            path: "user",
            element: <UserGuard>
                <SideMenu />
            </UserGuard>,
            children: [
                {
                    path: "dashboard",
                    element: <Dashboard />
                },
                {
                    path: "cover-letter",
                    element: <CoverLetter />
                },
                {
                    path: "resume",
                    element: <Resume />
                },
                {
                    path: "profile",
                    element: <Profile />
                },
                {
                    path: "settings",
                    element: <Settings />
                },
                {
                    path: "notifications",
                    element: <Notifications />
                },
                {
                    path: "help",
                    element: <Help />
                },
                {
                    path: "applications",
                    element: <Applications />
                },
                {
                    path: "job-search",
                    element: <JobSearch />
                },
                {
                    path: "analytics",
                    element: <Analytics />
                }
            ]
        },
    ]
    return useRoutes(routes)
}

export default Router