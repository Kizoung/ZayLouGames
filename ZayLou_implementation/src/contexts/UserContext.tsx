import { createContext, useContext, useState, type ReactNode } from "react";

interface Utilisateur{
    idUtilisateur: string;
    email: string;
    nom: string;
   // jeux: string[];
}

interface UserContextType {
    token: string;
    setToken: (token: string) => void;
    utilisateur: Utilisateur | null;
    setUtilisateur: (utilisateur: Utilisateur | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState('');
    const [utilisateur, setUtilisateur] = useState<Utilisateur | null>(null);

    return (
        <UserContext.Provider value={{ token, setToken, utilisateur, setUtilisateur }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}