import bcrypt from "bcrypt";
import { pool } from "../db.js";
import { SECRET } from "../config.js";
import { nanoid } from 'nanoid';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const [rows] = await pool.query(
      "SELECT password, id FROM usuarios WHERE username = ?",
      [username]
    );

    // Verifica si se encontró una fila con el nombre de usuario
    if (rows.length > 0) {
      const hashPassword = rows[0].password;
      console.log("Hash de contraseña:", hashPassword);

      // Comparar la contraseña proporcionada con el hash almacenado.
      bcrypt.compare(password, hashPassword, (err, result) => {
        if (err) {
          // Error al comparar contraseñas
          console.error(err);
        } else if (result) {
          // Contraseña válida
          console.log("Contraseña válida");
          // Genera un token JWT con una vigencia de 24 horas
          const token = jwt.sign({ id: rows[0].id }, SECRET, { expiresIn: '24h' });
          res.status(200).json({
            token
          });
        } else {
          // Contraseña incorrecta
          console.log("Contraseña incorrecta");
        }
      });
    } else {
      // Si no se encuentra el usuario en la base de datos
      res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

export const registro = async(req, res) => {
  try {
    const { username, password, email} = req.body;
    // Genera un hash seguro del password
    const hashedPassword = await bcrypt.hash(password, 10);
    const idUnico = nanoid(10);
    const [rows] = await pool.query('INSERT INTO usuarios (id, username, password,email, rol_id) VALUES (?,?,?,?,?)', [idUnico, username, hashedPassword,email, 2]);
    console.log([rows], 'aca debe ir algo')
    res.json({
      id: idUnico,
      username
    });
  } catch (error) {
    res.status(404).json({ mensaje: error.message });
  }
}
