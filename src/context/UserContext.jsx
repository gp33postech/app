import { createContext, useState, useContext} from "react";

const initialUser = {
    id: 1,
    name: "Filipe Costa",
    email: "filipe@teste",
    isAdmin: true,
};


export const UserContext = createContext()

export const UserProvider = ({ children}) => {
    const [user, setUser] = useState(initialUser);
    return (
        <UserContext.Provider value={{ user }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
}