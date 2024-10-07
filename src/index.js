import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import testRoutes from './routes/testRoutes.js';
import viajeRoutes from './routes/viajeRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import usersViajesRoutes from './routes/usersViajesRoutes.js';
import mapboxRoutes from './routes/mapboxRoutes.js';
import amigoRoutes from './routes/amigoRoutes.js';
import costDistributionRoutes from './routes/costDistributionRoutes.js';
import { testConnection, sequelize } from './db.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { insertInitialUserData } from './start_data.js'; // Solo se usa para poblar inicialmente la DB

// Configurar variables de entorno
dotenv.config();

// Configuración para obtener __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Crear instancia de Express
const app = express();

const allowedOrigins = [
  'http://localhost:4200',
  'https://proyecto-final-rho-one.vercel.app' // Dominio de Vercel
];

app.use(cors({
  credentials: true,
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      const msg = 'El CORS policy no permite el origen solicitado.';
      return callback(new Error(msg), false);
    }
  }
}));

// Middleware para analizar cookies
app.use(cookieParser());

// Middleware para analizar el cuerpo de las solicitudes con formato JSON
app.use(express.json());

// Middleware para analizar el cuerpo de las solicitudes con datos de formulario
app.use(express.urlencoded({ extended: true })); // Para analizar datos de formularios en el cuerpo de la solicitud

// Servir archivos estáticos desde la carpeta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configurar rutas
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/test', testRoutes);
app.use('/viaje', viajeRoutes);
app.use('/event', eventRoutes);
app.use('/users-viajes', usersViajesRoutes);
app.use('/mapbox', mapboxRoutes);
app.use('/friends', amigoRoutes);
app.use('/cost-distributions', costDistributionRoutes);

// Función asíncrona para sincronizar la base de datos y iniciar el servidor
const startServer = async () => {
  try {
    // Probar la conexión a la base de datos
    await testConnection();

    // Sincronizar los modelos con la base de datos
    await sequelize.sync({ alter: true });
    console.log('Modelos sincronizados con la base de datos');

    // Insertar datos iniciales si es necesario (descomentar si es necesario)
    // await insertInitialUserData();

    // Iniciar el servidor en el puerto especificado (puede ser configurado en .env)
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor iniciado en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1); // Salir del proceso con error
  }
};

// Iniciar el servidor
startServer();
