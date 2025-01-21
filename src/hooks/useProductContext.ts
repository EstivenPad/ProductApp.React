import { useContext } from "react"
import { ProductContext } from "../context/product/ProductContext";

export function useProductContext() {
    const context = useContext(ProductContext);

    //Check the value returned by context, if context doesn't find a
    //provider will return null, then 'useProductContext' will throw
    //an Error
    
    if(!context){
        throw new Error(
            "useProductContext debe ser usado dentro de ProductProvider"
        );
    }

    return context;
}