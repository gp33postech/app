import { createContext, useState, useContext, useEffect } from "react";
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebaseConfig';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
            try {
                if (authUser) {
                    const userDocRef = doc(db, 'users', authUser.uid);
                    const userDoc = await getDoc(userDocRef);

                    let displayName = authUser.displayName; 
                    let role = 'estudante'; 

                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        displayName = userData.displayName || displayName;
                        role = userData.role || role; 
                    }
                    
                    setUser({
                        uid: authUser.uid,
                        email: authUser.email,
                        displayName: displayName,
                        role: role, 
                    });
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error("Erro ao verificar autenticação e dados do Firestore:", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        });

        return unsubscribe;
    }, []);
        
    const value = {
        user, 
        isAuthenticated: !!user, 
        loading, 
    };

    return (
        <UserContext.Provider value={value}>
            
            {children}
        </UserContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useAuth deve ser usado dentro de um UserProvider');
    }
    return context;
};