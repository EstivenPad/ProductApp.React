import { IColor } from "./IColor";

export interface IColorContext {
    colors: IColor[],
    colorDetail: IColor | null,
    setColorDetail: React.Dispatch<React.SetStateAction<IColor | null>>,
    getAllColors: () => Promise<void> 
    getColorDetail: (colorId: number) => Promise<void>,
    addNewColor: (color: IColor) => Promise<void>,
    updateColor: (color: IColor) => Promise<void>,
    deleteColor: (colorId: number) => Promise<boolean>
}