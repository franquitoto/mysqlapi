import { Router } from "express";
import { crearProducto, eliminarProducto, obtenerFiltros, obtenerProducto, obtenerProductos } from "../controllers/productos.controller.js";
const router = Router();

router.get('/productos', obtenerProductos);

router.get('/productos/:id', obtenerProducto);

router.get('/productos/filtro/:filtro', obtenerFiltros);

router.post('/productos', crearProducto);

router.delete('/productos/:id', eliminarProducto);










export default router;