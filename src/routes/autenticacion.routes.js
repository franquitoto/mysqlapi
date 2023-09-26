import { Router } from "express";
import { login, registro } from "../controllers/autenticacion.controller.js";
import { verifyToken, isAdmin, esadmin, logeado } from "../middlewares/autJwt.js";
const router = Router();

router.get('/autenticacion',(req, res) => res.json({mensaje: "hola"}));
router.post('/login', login)
router.post('/registro', registro)
router.post('/isAdmin', verifyToken, isAdmin, esadmin ) // este es el endpoint del problema
router.post('/logueado', verifyToken, logeado)

export default router;