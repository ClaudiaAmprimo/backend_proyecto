import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import Viaje from './viajeModel.js';

const Event = sequelize.define('Event', {
  id_event: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  viaje_id: {
    type: DataTypes.INTEGER(6),
    allowNull: false,
    references: {
      model: Viaje,
      key: 'id_viaje'
    }
  },
  titulo: {
    type: DataTypes.STRING(40),
    allowNull: false
  },
  ubicacion: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  latitud: {
    type: DataTypes.DECIMAL(9, 6),
    allowNull: true
  },
  longitud: {
    type: DataTypes.DECIMAL(9, 6),
    allowNull: true
  },
  fecha_inicio: {
    type: DataTypes.DATE,
    allowNull: false
  },
  fecha_fin: {
    type: DataTypes.DATE,
    allowNull: false
  },
  costo: {
    type: DataTypes.DECIMAL(7, 2),
    allowNull: true
  },
  comentarios: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  user_id_create: {
    type: DataTypes.INTEGER(11).UNSIGNED,
    allowNull: false
  },
  user_id_paid: {
    type: DataTypes.INTEGER(11).UNSIGNED,
    allowNull: true
  }
}, {
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at'
});

Viaje.hasMany(Event, { foreignKey: 'viaje_id' });
Event.belongsTo(Viaje, { foreignKey: 'viaje_id' });

export default Event;
