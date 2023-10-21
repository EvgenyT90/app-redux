import { useLocation, Navigate } from "react-router-dom";

export const RequireAuth = ({ children }: { children: any }) => {
    const location = useLocation();
    console.log(location);

    const isAuth = localStorage.getItem("auth");

    if (!isAuth) {
        return <Navigate to="/login" />;
    }

    return children;
};
