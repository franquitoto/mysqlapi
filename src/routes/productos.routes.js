import { Router } from "express";
import { crearProducto, obtenerProductos } from "../controllers/productos.controller.js";
const router = Router();

router.get('/productos', obtenerProductos)

router.post('/productos', crearProducto);
router.post('/imagen', (req, res) =>{
  console.log(req.file,"aca deberia ir algo")
})









export default router;