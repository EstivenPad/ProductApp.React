import { createContext, useState } from "react";
import { IColorContext } from "./IColorContext";
import { IColor } from "./IColor";
import { productAPI } from "../../api/productAPI";
import axios from "axios";
import Swal from "sweetalert2";

interface ColorContextProviderProps {
    children: React.ReactNode;
}

export const ColorContext = createContext<IColorContext | null>(null);

export const ColorProvider = ({children}:ColorContextProviderProps) => {

    const [colors, setColors] = useState<IColor[] | []>([]);
    const [colorDetail, setColorDetail] = useState<IColor | null>(null);

    const getAllColors = async() => {
        try {
            const { data } = await productAPI.get<IColor[]>('/color');
            setColors(data);
        } catch (error) {
            console.log(error);
        }
    };
    
    const getColorDetail = async(colorId:number) => {
        try {
            const { data } = await productAPI.get<IColor>(`/color/${colorId}`);
            setColorDetail(data);
        } catch (error) {
            console.log(error);
        }
    };

    const addNewColor = async(color: IColor) => {
        try {
            const {data} = await productAPI.post('/color', color);
            
            setColors([{ id: data.id, ...color }, ...colors]);
        } catch (error) {
            console.error(error);
        }
    };

    const updateColor = async(colorToUpdate: IColor) => {
        try {
            await productAPI.put('/color/', colorToUpdate);
            
            const newColorArray = colors.map(color => {
                if(color.id !== colorToUpdate.id)
                    return color;

                return colorToUpdate;
            });

            setColors(newColorArray);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteColor = async(colorId: number):Promise<boolean> => {
        try {
            await productAPI.delete(`/color/${colorId}`)
            
            const newColorArray = colors.filter(color => color.id !== colorId);

            setColors(newColorArray);
            
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

    const contextValue: IColorContext = {
        colors,
        colorDetail,
        setColorDetail,
        getAllColors,
        getColorDetail,
        addNewColor,
        updateColor,
        deleteColor,
    };

    return (
        <ColorContext.Provider value={contextValue}>
            {children}
        </ColorContext.Provider>
    );
}