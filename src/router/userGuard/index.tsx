import { Navigate, useLocation } from "react-router-dom"
import { user } from "../../utils/user"


const Main = ({ children }: { children: React.ReactNode }) => {



    // use locaction to redirect to desired route
    const location = useLocation()

    if (!user) {

        // if the user is not logged
        // Redirect to login page
        return <Navigate to={"/"} replace state={{ from: location }} />

    }
    // Go to desired page if user is already logged
    return <>{children}</>
}

export default Main

