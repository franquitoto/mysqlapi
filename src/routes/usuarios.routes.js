import { Router } from "express";
import {obtenerUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario, obtenerUsuario}  from "../controllers/usuarios.controller.js";
import { verifyToken, isAdmin, isSuperAdmin } from "../middlewares/autJwt.js";

const router = Router();

router.get('/user', obtenerUsuarios);
router.get('/user/:id', obtenerUsuario);
router.post('/user', crearUsuario);
router.patch('/user/:id', actualizarUsuario);
router.delete('/user/:id', eliminarUsuario);

export default router;