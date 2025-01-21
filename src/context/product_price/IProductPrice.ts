import { IColor } from "../color/IColor";
import { IProduct } from "../product/IProduct";

export interface IProductPrice {
    id?: number,
    price: number,
    isSelected: boolean,
    productId: number,
    product?: IProduct,
    colorId: number,
    color?: IColor
}