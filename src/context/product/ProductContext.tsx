import { createContext, useState } from "react";
import { IProductContext } from "./IProductContext";
import { IProduct } from "./IProduct";
import { productAPI } from "../../api/productAPI";
import axios from "axios";
import Swal from "sweetalert2";

interface ProductContextProviderProps {
    children: React.ReactNode;
}

export const ProductContext = createContext<IProductContext | null>(null);

export const ProductProvider = ({children}:ProductContextProviderProps) => {

    const [products, setProducts] = useState<IProduct[] | []>([]);
    const [productDetail, setProductDetail] = useState<IProduct | null>(null);

    const getAllProducts = async() => {
        try {
            const { data } = await productAPI.get<IProduct[]>('/product');
            const updatedProducts = data.map((product) => {
                const selectedPrice = product.productPrices?.find((price) => price.isSelected === true);
    
                return {
                    ...product,
                    price: selectedPrice ? selectedPrice.price : 0,
                };
            });
    
            setProducts(updatedProducts);
        } catch (error) {
            console.log(error);
        }
    };
    
    const getProductDetail = async(productId:number) => {
        try {
            const { data } = await productAPI.get<IProduct>(`/product/${productId}`);
            setProductDetail(data);
        } catch (error) {
            console.log(error);
        }
    };

    const addNewProduct = async(product: IProduct) => {
        try {
            const {data} = await productAPI.post('/product', product);
            
            setProducts([{ id: data.id, ...product }, ...products]);
        } catch (error) {
            console.error(error);
        }
    };

    const updateProduct = async(productToUpdate: IProduct) => {
        try {
            await productAPI.put('/product/', productToUpdate);
            
            const newProductArray = products.map(product => {
                if(product.id !== productToUpdate.id)
                    return product;

                return productToUpdate;
            });

            setProducts(newProductArray);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteProduct = async(productId: number):Promise<boolean> => {
        try {
            await productAPI.delete(`/product/${productId}`)
            
            const newProductArray = products.filter(product => product.id !== productId);

            setProducts(newProductArray);
            
            return true;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                Swal.fire({
                    icon: "error",
                    title: error.response?.data.title,
                    text: `Error ${error.response?.status}: ${error.response?.data.message}`
                  });
            } else {
                console.error(error);
            }

            return false;
        }
    };

    const contextValue: IProductContext = {
        products,
        productDetail,
        setProductDetail,
        getAllProducts,
        getProductDetail,
        addNewProduct,
        updateProduct,
        deleteProduct
    };

    return (
        <ProductContext.Provider value={contextValue}>
            {children}
        </ProductContext.Provider>
    );
}