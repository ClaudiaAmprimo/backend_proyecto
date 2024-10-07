import express from 'express';
import cookieParser from "cookie-parser";
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
import { insertInitialUserData } from './start_data.js'; // solo se usa para poblar inicialmente la DB

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

sequelize.sync({ alter: true }).then(() => {
  console.log('Modelos sincronizados con la base de datos');
}).catch(error => {
  console.error('Error al sincronizar los modelos con la base de datos:', error);
});

// Configuración de CORS: Permitir tanto localhost como Vercel en producción
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
  : ['http://localhost:4200'];

app.use(cors({
  credentials: true,
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS policy no permite el origen: ${origin}`), false);
    }
  }
}));

app.use(cookieParser());

// Middleware para analizar el cuerpo de las solicitudes con formato JSON
app.use(express.json());

// Middleware para analizar el cuerpo de las solicitudes con datos de formulario
app.use(express.urlencoded({ extended: true }));

await testConnection();

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
