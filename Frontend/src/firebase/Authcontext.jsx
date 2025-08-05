import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./firebase.config";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

const AuthContext = createContext();
export const useAuth = () => {
    return useContext(AuthContext)
}

const googleProvider = new GoogleAuthProvider();

//for authprovider
export const AuthProvide = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //registerUser
    const registerUser = async (email, password) => {
        return await createUserWithEmailAndPassword(auth, email, password)
    }

    //loginUser
    const loginUser = async (email, password) => {
        return await signInWithEmailAndPassword(auth, email, password)
    }

    //withgoogle
    const signInWithGoogle = async () => {
        return await signInWithPopup(auth, googleProvider)
    }

    //logout
    const logout = () => {
        return signOut(auth)
    }

    // manageUser
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);

            if (user) {
                const { email, displayName, photoURL } = user;
                const userData = {
                    email, username: displayName, photo: photoURL
                }
            }
        })
        return () => unsubscribe();
    }, [])
    const value = {
        currentUser,
        registerUser,
        loginUser,
        signInWithGoogle,
        logout
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}