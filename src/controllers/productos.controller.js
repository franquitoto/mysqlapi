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
  const sqlQuery = `SELECT DISTINCT ${filtro} FROM productos`;
  try {
    const [rows] = await pool.query(sqlQuery);
    res.json(rows);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const filtrar = async (req, res) => {
  try {
    const filtros = req.body; // Los filtros enviados desde Angular

    // Inicializar la consulta SQL y los valores de los filtros
    let consultaSQL = 'SELECT * FROM productos WHERE';
    const valores = [];

    // Construir la parte de la consulta SQL para la categoría si se selecciona
    if (filtros.categoria.length > 0) {
      consultaSQL += ' categoria IN (';
      for (let i = 0; i < filtros.categoria.length; i++) {
        consultaSQL += '?';
        valores.push(filtros.categoria[i]);
        if (i < filtros.categoria.length - 1) {
          consultaSQL += ', ';
        }
      }
      consultaSQL += ') AND';
    }

    // Construir la parte de la consulta SQL para la marca si se selecciona
    if (filtros.marca.length > 0) {
      consultaSQL += ' marca IN (';
      for (let i = 0; i < filtros.marca.length; i++) {
        consultaSQL += '?';
        valores.push(filtros.marca[i]);
        if (i < filtros.marca.length - 1) {
          consultaSQL += ', ';
        }
      }
      consultaSQL += ') AND';
    }

     // Construir la parte de la consulta SQL para la color si se selecciona
     if (filtros.color.length > 0) {
      consultaSQL += ' color IN (';
      for (let i = 0; i < filtros.color.length; i++) {
        consultaSQL += '?';
        valores.push(filtros.color[i]);
        if (i < filtros.color.length - 1) {
          consultaSQL += ', ';
        }
      }
      consultaSQL += ') AND';
    }

     // Construir la parte de la consulta SQL para la capacidad si se selecciona
     if (filtros.capacidad.length > 0) {
      consultaSQL += ' capacidad IN (';
      for (let i = 0; i < filtros.capacidad.length; i++) {
        consultaSQL += '?';
        valores.push(filtros.capacidad[i]);
        if (i < filtros.capacidad.length - 1) {
          consultaSQL += ', ';
        }
      }
      consultaSQL += ') AND';
    }

    // Eliminar 'AND' adicional al final de la consulta
    consultaSQL = consultaSQL.slice(0, -4);

    // Ejecutar la consulta SQL utilizando el cliente de base de datos (en este caso, asumiendo PostgreSQL)
    const [rows] = await pool.query(consultaSQL, valores);

    // Responder con los resultados de la consulta en formato JSON
    console.log(consultaSQL, valores)
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

