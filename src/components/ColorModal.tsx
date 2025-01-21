import { useEffect, useState } from "react";
import { useColorContext } from "../hooks/useColorContext";
import { SubmitHandler, useForm } from "react-hook-form";

interface ColorModalProps {
    show: boolean;
    onClose: () => void;
    sendParent: React.Dispatch<React.SetStateAction<Item[]>>;
    checkOptions: Item[];
}

export interface Item {
    isChecked: boolean;
    name: string;
    price: number;
    colorId: number;
}

interface IColorList {
    colorItems: Item[];
}

export default function ColorModal({ show, onClose, sendParent, checkOptions}: ColorModalProps): JSX.Element {
    const { colors, getAllColors } = useColorContext();
    const [mappedColors, setMappedColors] = useState<Item[]>([]);

    const mapColors = (): void => {
        const colorsMapped: Item[] = colors.map((c) => {
            const checkItem = checkOptions.find((item) => item.colorId === c.id);
    
            return {
                isChecked: checkItem ? true : false,
                name: c.name,
                price: checkItem ? parseFloat(checkItem.price) : 0,
                colorId: c.id,
            };
        });
        setMappedColors(colorsMapped);
    };

    useEffect(() => {
        if (show) {
            getAllColors();
            mapColors();
        }
    }, [show]);

    const { register, handleSubmit, reset } = useForm<IColorList>({
        defaultValues: {
            colorItems: [],
        },
    });

    useEffect(() => {
        reset({ colorItems: mappedColors });
    }, [mappedColors, reset]);

    const onSubmit: SubmitHandler<IColorList> = (data) => {
        const selectOptions = data.colorItems.filter(c => c.isChecked);
        sendParent(selectOptions);
        onClose();
    };

    return (
        <>
            {show && (
                <div className="modal fade show d-block" tabIndex={-1}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Agregar colores al menú desplegable</h5>
                                <button type="button" className="btn-close" onClick={onClose}></button>
                            </div>
                            <div className="modal-body">
                                <div className="overflow-scroll">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        {mappedColors.map((color, index) => (
                                            <div className="d-flex gap-2 align-items-center mb-1" key={index}>
                                                <span>
                                                    <input {...register(`colorItems.${index}.isChecked` as const )} className="form-check-input me-1" type="checkbox" />
                                                </span>
                                                <span>
                                                    <input {...register(`colorItems.${index}.price` as const)} className="form-control w-100" type="number" step="0.01" />
                                                </span>
                                                <span>
                                                    <input className="form-control me-1" readOnly value={color.name} />
                                                    <input {...register(`colorItems.${index}.colorId` as const)} type="hidden" value={color.colorId} />
                                                </span>
                                            </div>
                                        ))}
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" onClick={onClose}>Cerrar</button>
                                            <button type="submit" className="btn btn-primary">Guardar</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
