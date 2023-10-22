import { useLocation, Navigate } from "react-router-dom";
import { UserContext } from "../contexts/User";
import { useContext } from "react";

export const RequireAuth = ({ children }: { children: any }) => {
    const location = useLocation();
    // console.log(location);
    const { username } = useContext(UserContext);

    const isAuth = username ? true : false;
    //localStorage.getItem("auth")

    if (!isAuth) {
        return <Navigate to="/login" />;
    }

    return children;
};
