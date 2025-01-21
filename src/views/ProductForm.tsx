import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useProductContext } from "../hooks/useProductContext"
import { IProduct } from "../context/product/IProduct";
import { useNavigate } from "react-router";
import ColorModal, { Item } from "../components/ColorModal";

export default function ProductForm() {

  const navigate = useNavigate();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectOptions, setSelectOptions] = useState<Item[]>([]);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  
  const { productDetail, addNewProduct, updateProduct } = useProductContext();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IProduct>({
    defaultValues: {...productDetail}
  });

  const onSubmit:SubmitHandler<IProduct> = (product:IProduct) => {
    if(!product.id)
      addNewProduct(product);
    else
      updateProduct(product);
    
    navigate(-1);
  }

  return (
    <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label className="form-label fw-bolder">Nombre del producto</label>
                <input type="text" className="form-control" {...register('name', {required: 'El Nombre del product es requerido.'})} />
                {errors.name && <div className="alert alert-danger mt-2">{errors.name.message}</div>}
            </div>

            <div className="mb-3">
                <label className="form-label fw-bolder">Color del producto</label>
                <div className="input-group">
                    <select className="form-select" >
                        <option disabled={true} selected={true}>--Seleccione un color--</option>
                        {selectOptions.map((option) => (
                            <option key={option.colorId} value={option.colorId}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                    <button type="button" className="btn btn-primary" onClick={handleShowModal}>
                        <i className="bi bi-plus-circle"></i>
                    </button>
                </div>
            </div>
            {errors.name && <div className="alert alert-danger mt-2">{errors.name.message}</div>}

            <div className="d-flex justify-content-center mb-5">
                <button type="submit" className="btn btn-success me-2 w-25">
                    <i className="bi bi-floppy2-fill me-2"></i>
                    Guardar
                </button>
            </div>
        </form>

        <ColorModal show={showModal} onClose={handleCloseModal} sendParent={setSelectOptions} checkOptions={selectOptions}/>
    </div>
  )
}
