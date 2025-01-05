import { createContext, useState } from "react";

const AuthContext = createContext({});  // default values of null

export const AuthProvider = ({ children }) => { // the provider will be a component that wraps the rest of our application, providing authentication context to all its children
    const [auth, setAuth] = useState({});   

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;