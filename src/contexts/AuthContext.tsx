import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, firebase } from "../services/firebase";


type User = {
    id: string,
    name: string,
    avatar: string
  }
  
  type AuthContextType = {
    user: User | undefined,
    signInWithGoogle: () => Promise<void>;
  }

  type AuthContextProviderProps = {
      children: ReactNode;
  }

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {

    const [user, setUser] = useState<User>();

    // assim que o component AuthContextProvider() for exibiido em tela vai executar esse código que vai no Firebase e vai monitorar se já existia um login desse usuário, se sim ele busca as infos e preenche o estado
      useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => { //eventListener
          if(user) {
            const { displayName, photoURL, uid} = user
    
            if(!displayName || !photoURL) {
              throw new Error('Missing information from Google Account.');
            }
    
            setUser({
              id: uid,
              name: displayName,
              avatar: photoURL
            })
          }
        }) 
    
        return () => {
          unsubscribe()
        } //faz o retorno de uma função que descadastre de todos EventListeners que me cadastrei
    
      }, [])
    
      async function signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
    
        const result = await auth.signInWithPopup(provider);
    
          if(result.user) {
            const { displayName, photoURL, uid} = result.user
    
          if(!displayName || !photoURL) {
            throw new Error('Missing information from Google Account.');
          }
    
          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
          })
        }
    
    }

    return (
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
            {props.children}
        </AuthContext.Provider>
    )
}