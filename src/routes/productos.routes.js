import { Router } from "express";
import { crearProducto, obtenerProducto, obtenerProductos } from "../controllers/productos.controller.js";
const router = Router();

router.get('/productos', obtenerProductos)

router.post('/productos', crearProducto);

router.get('/productos/:id', obtenerProducto)








export default router;