import { IProduct } from "./IProduct";

export interface IProductContext {
    products: IProduct[],
    productDetail: IProduct | null,
    setProductDetail: React.Dispatch<React.SetStateAction<IProduct | null>>,
    getAllProducts: () => Promise<void> 
    getProductDetail: (productId: number) => Promise<void>,
    addNewProduct: (product: IProduct) => Promise<void>,
    updateProduct: (product: IProduct) => Promise<void>,
    deleteProduct: (productId: number) => Promise<boolean>
}