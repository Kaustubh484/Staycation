import { createContext, useContext, useReducer } from "react"

const INITIAL={
    city:undefined,
    date:[],
    options:{
        adult:undefined,
        children:undefined,
        room:undefined
    }

};

export const SearchContext=createContext(INITIAL)
export const SearchReducer=(state,action)=>{
    switch(action.type){
     case "NEW":
        return action.payload;
    case "RESET":
        return INITIAL;
        default:
            return state

    }
}

    export const SearchContextProvider=({children})=>{
    const[state,dispatch]=useReducer(SearchReducer,INITIAL);
     return(
        <SearchContext.Provider 
        value={{
            city:state.city,
            date:state.date,
            options:state.options,
            dispatch
        }}>
            {children}
        </SearchContext.Provider>
     )
    }

