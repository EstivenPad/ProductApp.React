# ProductApp.React

## Descripción

Esta aplicación frontend está desarrollada con **React 18** y permite interactuar con el backend llamado ```ProductApp.Backend```. Proporciona una interfaz de usuario para gestionar colores, gestionar productos, asignar precios por color a productos.

---

## Funcionalidades

- **Gestión de Productos (CRUD):**
  - Crear, leer, actualizar y eliminar productos.
  - Asignar múltiples precios a un producto según el color.
  
- **Consulta de Productos:**
  - Visualización de productos y precios.
  - Selección de un color para mostrar el precio asociado.

- **Modal Dinámico:**
  - Agregar y editar colores con sus precios desde un modal interactivo.

---

## Instalación y Configuración

### Prerrequisitos

- Node.js (v22 o superior)
- npm, yarn o pnpm

### Pasos para Configurar

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/EstivenPad/ProductApp.React.git
   cd ProductApp.React

2. Restaurar las dependencias:
    ```bash
    npm install

    // o usando yarn
    yarn install

    // o usando pnpm
    pnpm i
    ```
    
3. Crear un archivo .env en la raíz del proyecto para configurar la URL base de la API:
    ```bash
    VITE_API_URL=https://localhost:5000/api
    ```
    
4. Iniciar la aplicación en modo desarrollo:
    ```bash
    npm run dev

    // o usando yarn
    yarn dev

    // o usando pnpm
    pnpm run dev
    ```
### Tecnologías Utilizadas
  - React 18
  - TypeScript
  - Bootstrap
  - Axios
  - React Hook Form
  - React Router
  - SweetAlert2
    
## AVISO⚠️: ***PARA UTILIZAR CORRECTAMENTE ESTE PROYECTO **'ProductApp.React'**, EL PROYECTO **'ProductApp.Backend'** TAMBIÉN DEBE ESTAR EJECUTANDOSE.***
