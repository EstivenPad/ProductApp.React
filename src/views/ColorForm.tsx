import { SubmitHandler, useForm } from "react-hook-form";
import { useColorContext } from "../hooks/useColorContext"
import { IColor } from "../context/color/IColor";
import { useNavigate } from "react-router";

export default function ColorForm() {

  const navigate = useNavigate();
  const { colorDetail, addNewColor, updateColor } = useColorContext();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IColor>({
    defaultValues: {...colorDetail}
  });

  const onSubmit:SubmitHandler<IColor> = (color:IColor) => {
    if(!color.id)
      addNewColor(color);
    else
      updateColor(color);
    
    navigate(-1);
  }

  return (
    <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label className="form-label fw-bolder">Nombre del color</label>
                <input type="text" className="form-control" {...register('name', {required: 'El Nombre del color es requerido.'})} />
                {errors.name && <div className="alert alert-danger mt-2">{errors.name.message}</div>}
            </div>

            <div className="d-flex justify-content-center mb-5">
                <button type="submit" className="btn btn-success me-2 w-25">
                    <i className="bi bi-floppy2-fill me-2"></i>
                    Guardar
                </button>
            </div>
        </form>
        </div>
  )
}
