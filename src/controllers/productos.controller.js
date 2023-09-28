import { pool } from "../db.js";
import { nanoid } from "nanoid";

export const obtenerProductos = async(req, res) =>{
  try {
    const rows = await pool.query('SELECT * FROM productos'); 
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
    const idUnico = nanoid(10);
    const nombreArchivo = req.file.filename;
    
    const rutaArchivo = req.file.path;
    // const urlImg =`http://localhost:3000/${rutaArchivo.slice(48 , 86)}`
    const nombreImg = nombreArchivo;
    console.log(`http://localhost:3000/img/${nombreImg}`);
    const urlImg =  `http://localhost:3000/img/${nombreImg}`;
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
    if (rows.affectedRows === 1)  {
      console.log('ok')
      return res.json({
        nombre,
        urlImg,
        idUnico 
      });
    } 
    console.log('no entro al if');
  } catch (error) {
    console.log('hubo un error', error);
    res.status(404).json({mensaje:error.message});
  }
};

export const eliminarProducto = async (req, res) =>{
  try {
    const id = req.params = req.params.id;

    const [rows] = await pool.query('DELETE FROM productos WHERE id = ?',[id]);
    console.log(rows);
    console.log(rows[0]);
    if (rows.affectedRows === 0) return res.status(404).json({ mensaje: 'Producto no encontrado' });
    res.json('producto eliminado correctamente');
    
  } catch (error) {
    res.status(404).json({error});    
  }
  
};

export const obtenerFiltros = async (req, res) => {
  const filtro = req.params.filtro;
  console.log(filtro, 'filtro')
  const sqlQuery = `SELECT DISTINCT ${filtro} FROM productos`;

  try {
    const [rows] = await pool.query(sqlQuery);
    res.json(rows);
  } catch (error) {
    res.status(404).json(error);
  }
};
