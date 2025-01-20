import { Link } from "react-router";
import { IColor } from "../context/color/IColor";
import { useColorContext } from "../hooks/useColorContext";
import { useEffect } from "react";
import Swal from "sweetalert2";

export default function ColorPage() {
  
  const { colors, setColorDetail, getAllColors, deleteColor } = useColorContext();
  
  useEffect(() => {
    getAllColors();
  }, []);

  const handleAdd = (): void => {
    setColorDetail({
      name: ""
    });
  };

  const handleEdit = (color: IColor) => {
    setColorDetail({...color});
  };

  const handleDelete = (colorId:number = 0) : void => {
    Swal.fire({
      title: "¿Está seguro que desea eliminar este color?",
      text: "¡No será capaz de revertir este cambio!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar",
      cancelButtonText: "Cancelar"
    }).then(async(result) => {
        if (result.isConfirmed) {
            let isDeleted:boolean = await deleteColor(colorId);
            
            if(isDeleted)
              Swal.fire({
                  title: "Exito",
                  text: "Color eliminado exitosamente.",
                  icon: "success"
              });
        }
    });
  };

  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-between">
            <h2>Colores</h2>
            
            <Link to="/colors/form" className="btn btn-success mb-2" onClick={handleAdd}>
              <i className="bi bi-plus-circle"></i> Crear Nuevo Color
            </Link>
        </div>
        
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {colors.map((entity:IColor) => (
              <tr key={entity.id}>
                <td>{entity.id}</td>
                <td>{entity.name}</td>
                <td>
                    <Link to={`/colors/${entity.id}`} onClick={() => handleEdit(entity)} className="btn btn-warning me-2">
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

