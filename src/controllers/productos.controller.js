import { pool } from "../db.js";
import { nanoid } from "nanoid";

export const obtenerProductos = async(req, res) =>{
  try {
    const rows = await pool.query('SELECT * FROM productos'); 
    console.log(rows[0])
    res.json({Productos:rows[0]});
  } catch (error) {
    res.json(error);
  }
}

export const obtenerProducto = async (req, res) =>{
  try {
    const id = req.params.id;
    const [rows] = await pool.query('SELECT * FROM productos WHERE id = ?', [id])
    console.log([rows]);
    res.json(rows[0])
  } catch (error) {
    res.json(error)
  }
  
}

export const crearProducto = async (req, res) => {
  try {
    console.log(req.body)
    const idUnico = nanoid(10);
    const nombreArchivo = req.file.filename;
    
    const rutaArchivo = req.file.path;
    console.log(rutaArchivo)
    const urlImg =  `http://localhost:3000/${rutaArchivo.slice(47, 86)}`;
    console.log(`http://localhost:3000/${rutaArchivo.slice(54, 86)}`)
    const nombreImg = nombreArchivo;
    const pathImg = rutaArchivo.slice(49, 70)
    const {
      nombre,
      categoria,
      precio,
      descripcion,
      modelo,
      capacidad,
      marca,
      color,
      destacado,
    } = req.body;

    const [rows] = await pool.query(
      "INSERT INTO productos (id,imagen_url,imagen_nombre,imagen_path,nombre,categoria,precio,descripcion,modelo,capacidad,marca,color,destacado) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        idUnico,
        urlImg,
        nombreImg,
        pathImg,
        nombre,
        categoria,
        precio,
        descripcion,
        modelo,
        capacidad,
        marca,
        color,
        destacado,
      ]
    );
    console.log([rows], "aca debe ir algo");
    res.json({ mensaje: "creando productos" });
  } catch (error) {
    res.status(404).json({mensaje:error.message});
  }
};
