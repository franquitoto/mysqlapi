import { SECRET } from "../config.js";
import jwt from "jsonwebtoken";
import {pool} from '../db.js'



// este middleware va a chequear que el token que tiene el usuario se valido para el programa
export const verifyToken = async (req, res, next) =>{
  try{
    // Guardamos el token que nos envia el usuario en una variable
    const token = req.headers["token"];
    console.log(token)

    // Si el token no existe le enviamos un 403
    if(!token) {
      console.log("NO EXISTE TOKEN", token)
      return res.status(403).json({mensaje: 'Se necesita un token'});
    }
    console.log(jwt.verify(token, SECRET),"hola")
    // Si el token existe lo verificamos con jsonwebtoken pasnadole tambien la configuracion secret
    const decoded = jwt.verify(token, SECRET);

    // Si el token se logra verificar vamos a obtener el ID que trae el token
    req.userId = decoded.id;

    console.log(decoded.id, "decoded bro", req.userId)
    // Ese ID deberia corresponder a un usuario, chequeamos en la db de usuarios que sea asi
    const [user] = await pool.query('SELECT username FROM usuarios WHERE id = ?', [req.userId]);
    
    // Si no existe devolvemos un 404
    if (user.length <= 0) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    // Si existe le damos via libre para que siga
    next()
  }catch(error){
    return res.status(401).json({mensaje: error});
  }
}
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTU2NDcyNjUsImV4cCI6MTY5NTczMzY2NX0.QGoNoNer05StxuDv-qceHFHdHzYco7UtzPyTSgGYdkM
export const isAdmin = async (req, res, next) => {
  try {
    // Consulta el rol del usuario a partir de su ID
    const [usuario] = await pool.query('SELECT rol_id FROM usuarios WHERE id = ?', [req.userId]);

    // Verifica si se encontró el usuario
    if (usuario.length <= 0) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    // Consulta el nombre del rol a partir de su ID
    const [rol] = await pool.query('SELECT nombre FROM roles WHERE id = ?', [usuario[0].rol_id]);
    console.log(rol[0])

    // Verifica si el rol del usuario es 'admin'
    if (rol.length > 0 && rol[0].nombre === 'admin') {
      // El usuario tiene el rol de administrador, puedes continuar
      next();
    } else {
      return res.status(403).json({ mensaje: 'Requiere rol de admin' });
    }
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error de servidor' });
  }
};
export const isSuperAdmin = async (req, res, next) => {
  try {
    // Consulta el rol del usuario a partir de su ID
    const [usuario] = await pool.query('SELECT rol_id FROM usuarios WHERE id = ?', [req.userId]);

    // Verifica si se encontró el usuario
    if (usuario.length <= 0) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    // Consulta el nombre del rol a partir de su ID
    const [rol] = await pool.query('SELECT nombre FROM roles WHERE id = ?', [usuario[0].rol_id]);
    console.log(rol[0])

    // Verifica si el rol del usuario es 'admin'
    if (rol.length > 0 && rol[0].nombre === 'superadmin') {
      // El usuario tiene el rol de administrador, puedes continuar
      next();
    } else {
      return res.status(403).json({ mensaje: 'Requiere rol de superadmin' });
    }
  } catch (error) {
    return res.status(500).json({ mensaje: 'Error de servidor' });
  }
};

export const esadmin = (req, res) =>{
  res.json({mensaje: "admin"});
}
export const logeado = (req, res) =>{
  res.json({mensaje: "logueado"});  
}
