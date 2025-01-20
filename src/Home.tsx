import { NavLink, Outlet } from "react-router"

function Home() {
  return (
    <>
      <div className="container mb-3">
        <div className="text-center">
          <h1 className="align-self-center mb-4">Product App</h1>
          <NavLink to="/colors" className="btn btn-lg btn-outline-primary me-4">
            <i className="bi bi-palette-fill"></i> Colores
          </NavLink>
          <NavLink to="/products" className="btn btn-lg btn-outline-warning">
            <i className="bi bi-box-fill"></i> Productos
          </NavLink>
        </div>
      </div>
      <Outlet/>
    </>
  )
}

export default Home
