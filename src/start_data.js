// --->>> para poblar la DB 1 sola vez con datos iniciales, luego se comenta.
import User from './models/userModel.js';
import Viaje from './models/viajeModel.js';
import Event from './models/eventsModel.js';
import UsersViajes from './models/usersViajesModel.js';


const insertInitialUserData = async () => {
  // await UsersViajes.destroy({ where: {} });
  // await Event.destroy({ where: {} });
  // await Viaje.destroy({ where: {} });
  // await Book.destroy({ where: {} });
  // await User.destroy({ where: {} });

  const userData = [
    {
      email: 'ismael.academy@gmail.com',
      password: '$2b$10$tXrqo7VdSPCLAsIUhrVsYejYeMt9FLo9J4OchgCKwuDvpeDK6Xf1q', //pass: ismael123
      name: 'Ismael',
      roles: ['user']
    },
    {
      email: 'laura@hotmail.com',
      password: '$2b$10$tXrqo7VdSPCLAsIUhrVsYejYeMt9FLo9J4OchgCKwuDvpeDK6Xf1q', //pass: ismael123
      name: 'Laura',
      roles: ['user']
    },
    {
      email: 'maria@hotmail.com',
      password: '$2b$10$tXrqo7VdSPCLAsIUhrVsYejYeMt9FLo9J4OchgCKwuDvpeDK6Xf1q', //pass: ismael123
      name: 'Maria',
      surname: 'kale',
      roles: ['mod', 'admin']
    },
    {
      email: 'mod@hotmail.com',
      password: '$2b$10$tXrqo7VdSPCLAsIUhrVsYejYeMt9FLo9J4OchgCKwuDvpeDK6Xf1q', //pass: ismael123
      name: 'Moderador',
      surname: 'kale',
      roles: ['admin']
    },
    {
      email: 'admin@hotmail.com',
      password: '$2b$10$tXrqo7VdSPCLAsIUhrVsYejYeMt9FLo9J4OchgCKwuDvpeDK6Xf1q', //pass: ismael123
      name: 'Admin',
      surname: 'kale',
      roles: ['admin']
    }
  ];
  // Insertar datos con opción ignoreDuplicates
  // Para actualizar todas las filas: updateOnDuplicate: Object.keys(User.rawAttributes)
  await User.bulkCreate(userData, { ignoreDuplicates: true });

  const viajeData = [
    { titulo: 'Viaje a Paris', ubicacion: 'Paris, Francia', fecha_inicio: '2024-09-01', fecha_fin: '2024-09-10' },
    { titulo: 'Viaje a New York', ubicacion: 'New York, USA', fecha_inicio: '2024-09-01', fecha_fin: '2024-09-10' }
  ];
  const createdViajes = await Viaje.bulkCreate(viajeData, { ignoreDuplicates: true });

  const eventData = [
    { viaje_id: createdViajes[0].id_viaje, titulo: 'Tour por la Torre Eiffel', ubicacion: 'Torre Eiffel', fecha_inicio: '2024-09-01', fecha_fin: '2024-09-01', user_id_create: 1 },
    { viaje_id: createdViajes[1].id_viaje, titulo: 'Visita a Central Park', ubicacion: 'Central Park', fecha_inicio: '2024-09-02', fecha_fin: '2024-09-02', user_id_create: 2 },
    { viaje_id: createdViajes[0].id_viaje, titulo: 'Pasaje avión Barcelona-París', ubicacion: 'Barcelona, España', fecha_inicio: '2024-09-01', fecha_fin: '2024-09-01', user_id_create: 1 },
    { viaje_id: createdViajes[1].id_viaje, titulo: 'Pasaje avión Barcelona-New York', ubicacion: 'Barcelona, España', fecha_inicio: '2024-09-01', fecha_fin: '2024-09-01', user_id_create: 2 },
    { viaje_id: createdViajes[0].id_viaje, titulo: 'Hotel Paris', ubicacion: 'Paris, Francia', fecha_inicio: '2024-09-01', fecha_fin: '2024-09-14', user_id_create: 1 },
    { viaje_id: createdViajes[1].id_viaje, titulo: 'Hotel New York', ubicacion: 'New York, Usa', fecha_inicio: '2024-09-01', fecha_fin: '2024-09-14', user_id_create: 2 }
  ];
  await Event.bulkCreate(eventData, { ignoreDuplicates: true });

  const usersViajesData = [
    { user_id: 1, viaje_id: createdViajes[0].id_viaje },
    { user_id: 2, viaje_id: createdViajes[1].id_viaje }
  ];
  await UsersViajes.bulkCreate(usersViajesData, { ignoreDuplicates: true });

};
console.log('Datos iniciales insertados correctamente');

export { insertInitialUserData };
