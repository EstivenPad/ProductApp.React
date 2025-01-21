import { IProductPrice } from "../product_price/IProductPrice";

export interface IProduct {
    id?: number,
    name: string,
    productPrices: IProductPrice[],
    price?: number
}