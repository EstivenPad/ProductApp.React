import { Link } from "react-router";
import { IProduct } from "../context/product/IProduct";
import { useProductContext } from "../hooks/useProductContext";
import { useEffect } from "react";
import Swal from "sweetalert2";

export default function ProductPage() {
  const { products, setProductDetail, getAllProducts, deleteProduct } = useProductContext();
  
  useEffect(() => {
    getAllProducts();
  }, []);

  const handleAdd = (): void => {
    setProductDetail({
      name: "",
      productPrices: []
    });
  };

  const handleEdit = (product: IProduct) => {
    setProductDetail({...product});
  };

  const handleDelete = (productId:number = 0) : void => {
    Swal.fire({
      title: "¿Está seguro que desea eliminar este producto?",
      text: "¡No será capaz de revertir este cambio!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonProduct: "#3085d6",
      cancelButtonProduct: "#d33",
      confirmButtonText: "Si, Eliminar",
      cancelButtonText: "Cancelar"
    }).then(async(result) => {
        if (result.isConfirmed) {
            let isDeleted:boolean = await deleteProduct(productId);
            
            if(isDeleted)
              Swal.fire({
                  title: "Exito",
                  text: "Producto eliminado exitosamente.",
                  icon: "success"
              });
        }
    });
  };

  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-between">
            <h2>Productos</h2>
            
            <Link to="/products/form" className="btn btn-success mb-2" onClick={handleAdd}>
              <i className="bi bi-plus-circle"></i> Crear Nuevo Producto
            </Link>
        </div>
        
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((entity:IProduct) => (
              <tr key={entity.id}>
                <td>{entity.id}</td>
                <td>{entity.name}</td>
                <td>{entity.price}</td>
                <td>
                    <Link to={`/products/${entity.id}`} onClick={() => handleEdit(entity)} className="btn btn-warning me-2">
                        <i className="bi bi-pencil-square me-1"></i>
                        Editar
                    </Link>
                    <button className="btn btn-danger" onClick={() => handleDelete(entity.id)}>
                        <i className="bi bi-trash-fill me-1"></i>
                        Eliminar
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}


