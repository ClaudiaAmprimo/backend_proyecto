import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import User from './userModel.js';
import Viaje from './viajeModel.js';

const UsersViajes = sequelize.define('UsersViajes', {
  user_id: {
    type: DataTypes.INTEGER(11).UNSIGNED,
    primaryKey: true,
    references: {
      model: User,
      key: 'id_user'
    }
  },
  viaje_id: {
    type: DataTypes.INTEGER(6),
    primaryKey: true,
    references: {
      model: Viaje,
      key: 'id_viaje'
    }
  }
}, {
  timestamps: false
});

User.belongsToMany(Viaje, { through: UsersViajes, foreignKey: 'user_id' });
Viaje.belongsToMany(User, { through: UsersViajes, foreignKey: 'viaje_id' });
UsersViajes.belongsTo(User, { foreignKey: 'user_id', as: 'User' });
UsersViajes.belongsTo(Viaje, { foreignKey: 'viaje_id', as: 'Viaje' });

export default UsersViajes;
