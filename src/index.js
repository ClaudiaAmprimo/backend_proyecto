// app.js
import express from 'express';
import cookieParser from "cookie-parser";
import cors from 'cors'; //para poder hacer puts, y tal desde el cliente al servidor
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import testRoutes from './routes/testRoutes.js';
import viajeRoutes from './routes/viajeRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import usersViajesRoutes from './routes/usersViajesRoutes.js';
import { testConnection, sequelize } from './db.js';
import dotenv from 'dotenv';
import { insertInitialUserData } from './start_data.js'; // solo se usa para poblar inicialmente la DB
dotenv.config();

const app = express();

sequelize.sync({ alter: true }).then(() => {
  console.log('Modelos sincronizados con la base de datos');
}).catch(error => {
  console.error('Error al sincronizar los modelos con la base de datos:', error);
});

// Configura el middleware CORS para que peuda recibir solicitudes de POST, PUT, DELETE, UPDATE, etc.
app.use(cors({
  credentials: true,
  origin: 'http://localhost:4200'
}));

//header and populate req.cookies with an object keyed by the cookie names
app.use(cookieParser());

// Middleware para analizar el cuerpo de las solicitudes con formato JSON
app.use(express.json());

// Middleware para analizar el cuerpo de las solicitudes con datos de formulario
app.use(express.urlencoded({ extended: true })); // Para analizar datos de formularios en el cuerpo de la solicitud

await testConnection();
// await insertInitialUserData(); // solo se usa para poblar la DB con start_data

// Configurar rutas
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/test', testRoutes);
app.use('/viaje', viajeRoutes);
app.use('/event', eventRoutes);
app.use('/users-viajes', usersViajesRoutes);

// Iniciar el servidor
app.listen(3000, () => {
  console.log("Servidor iniciado en el puerto 3000");
});
