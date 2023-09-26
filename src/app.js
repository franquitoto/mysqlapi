import express from 'express';
import cors from 'cors';
import usuariosRoutes from './routes/usuarios.routes.js';
import indexRoute from './routes/index.routes.js';
import autenticacionRoutes from './routes/autenticacion.routes.js';
import productosRoutes from './routes/productos.routes.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname} from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();

// Configuración de la ubicación y el nombre de almacenamiento de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define la carpeta donde se guardarán las imágenes
    const destinationPath = path.join(__dirname, 'public/img'); // Quita el segundo path.join
    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    // Define el nombre del archivo (puedes personalizarlo como desees)
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Crea una instancia de Multer con la configuración
const upload = multer({ storage });

// Configurar los middlewares antes de las rutas
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Asegúrate de configurar extended en true si es necesario

// Agrega Multer como middleware para manejar las imágenes
app.use(upload.single('imagen'));

// Declarar las rutas después de configurar los middlewares
app.use('/api', usuariosRoutes);
app.use('/api', autenticacionRoutes);
app.use('/api', productosRoutes);
app.use(indexRoute);

app.use(express.static(path.join(__dirname, 'public')));
console.log(path.join(__dirname, 'public'))

app.use((req, res, next) => {
  res.status(404).json({ mensaje: 'endpoint no encontrado' });
});

export default app;
