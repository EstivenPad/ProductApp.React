import { useContext } from "react"
import { ColorContext } from "../context/color/ColorContext";

export function useColorContext() {
    const context = useContext(ColorContext);

    //Check the value returned by context, if context doesn't find a
    //provider will return null, then 'useColorContext' will throw
    //an Error
    
    if(!context){
        throw new Error(
            "useColorContext must be used within ColorProvider"
        );
    }

    return context;
}