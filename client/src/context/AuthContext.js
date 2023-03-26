import { faL } from "@fortawesome/free-solid-svg-icons";
import { createContext,  useReducer } from "react"

const INITIAL={
    user:null,
    loading:false,
    error:false

};

export const AuthContext=createContext(INITIAL)
export const AuthReducer=(state,action)=>{
    switch(action.type){
     case "LOGIN_STARTED":
        return {
            user:null,
            loading:true,
            error:false

        };
    case "LOGIN_SUCCESS":
        return {
            user:action.payload,
            loading:false,
            error:false

        };
        case "LOGIN_FAIL":
        return {
            user:null,
            loading:false,
            error:action.payload

        };
        case "LOGOUT":
        return {
            user:null,
            loading:false,
            error:false

        };
        default:
            return state

    }
}

    export const AuthContextProvider=({children})=>{
    const[state,dispatch]=useReducer(AuthReducer,INITIAL);
     return(
        <AuthContext.Provider 
        value={{
            user:state.user,
            loading:state.loading,
            error:state.error,
            dispatch
        }}>
            {children}
        </AuthContext.Provider>
     )
    }

