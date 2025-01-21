import './index.css';
import Home from './Home';
import ColorPage from './pages/ColorPage';
import ProductPage from './pages/ProductPage';
import ColorForm from './views/ColorForm';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import { ColorProvider } from './context/color/ColorContext';
import { ProductProvider } from './context/product/ProductContext';
import ProductForm from './views/ProductForm';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ColorProvider>
      <ProductProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>} >
              <Route path="colors">
                <Route index element={<ColorPage/>}/>
                <Route path=":form" element={<ColorForm/>}/>
              </Route>
              <Route path="products">
                <Route index element={<ProductPage/>}/>
                <Route path=":form" element={<ProductForm/>}/>
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ProductProvider>
    </ColorProvider>
  </StrictMode>,
)
