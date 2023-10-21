import React, { createContext } from "react";

const User: any = {
    role: "user",
    name: "",
};

export const UserContext = createContext(User);
