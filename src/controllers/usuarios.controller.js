import {pool} from '../db.js';
import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';


// Obtiene todos los usuarios de la base de datos y los devuelve como JSON.
export const obtenerUsuarios = async (req, res) => {
  try {
    const [usuarios] = await pool.query('SELECT * FROM usuarios');
    res.json({ usuarios });
  } catch (error) {
    res.status(404).json({ mensaje: error.message });
  }
};

// Obtiene un usuario específico por su ID y lo devuelve como JSON.
export const obtenerUsuario = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [req.params.id]);
    console.log(rows);
    if (rows.length <= 0) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(404).json({ mensaje: error.message });
  }
};

// Crea un nuevo usuario en la base de datos y devuelve los detalles del usuario creado.
export const crearUsuario = async (req, res) => {
  console.log(req.body)
  try {
    const { username, password, email} = req.body;
    const rol_id = parseInt(req.body.rol)
    
    
    // Genera un hash seguro del password
    const hashedPassword = await bcrypt.hash(password, 10);
    const idUnico = nanoid(10);
    const [rows] = await pool.query('INSERT INTO usuarios (id, username, password,email, rol_id) VALUES (?,?,?,?,?)', [idUnico, username, hashedPassword, email, rol_id]);
    console.log([rows], 'aca debe ir algo')
    res.json({
      id: idUnico,
      username,
      rol_id,
    });
  } catch (error) {
    res.status(404).json({ mensaje: error.message });
  }
};

// Actualiza un usuario existente en la base de datos y responde con un mensaje de éxito.
export const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, rol } = req.body;
    const [result] = await pool.query('UPDATE usuarios SET username = IFNULL(?, username), rol = IFNULL(?, rol) WHERE id = ?', [username, rol, id]);
    if (result.affectedRows === 0) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.json({ mensaje: 'Recibido' });
  } catch (error) {
    res.status(404).json({ mensaje: error.message });
  }
};

// Elimina un usuario de la base de datos y responde con un mensaje de éxito.
export const eliminarUsuario = async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);
    if (result.affectedRows <= 0) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(404).json({ mensaje: error.message });
  }
};
