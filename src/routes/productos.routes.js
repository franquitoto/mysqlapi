import { Router } from "express";
import { crearProducto, eliminarProducto, filtrar, obtenerFiltros, obtenerProducto, obtenerProductos } from "../controllers/productos.controller.js";
const router = Router();

router.get('/productos', obtenerProductos);

router.get('/productos/:id', obtenerProducto);

router.get('/productos/filtro/:filtro', obtenerFiltros);

router.get('/productos/filtro/aca', (req, res) =>{
    console.log('entro')
})

router.post('/productos', crearProducto);

router.post('/productos/filtro', filtrar);

router.delete('/productos/:id', eliminarProducto);










export default router;