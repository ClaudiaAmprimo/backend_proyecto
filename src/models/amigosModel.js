import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import User from './userModel.js';

const Amigos = sequelize.define('Amigos', {
  user_id: {
    type: DataTypes.INTEGER(11).UNSIGNED,
    primaryKey: true,
    references: {
      model: User,
      key: 'id_user'
    }
  },
  amigo_id: {
    type: DataTypes.INTEGER(11).UNSIGNED,
    primaryKey: true,
    references: {
      model: User,
      key: 'id_user'
    }
  }
}, {
  timestamps: false
});

// User.belongsToMany(User, { as: 'UserFriends', through: Amigos, foreignKey: 'user_id', otherKey: 'amigo_id' });
User.belongsToMany(User, { as: 'Friends', through: Amigos, foreignKey: 'user_id', otherKey: 'amigo_id' });
User.belongsToMany(User, { as: 'FriendOf', through: Amigos, foreignKey: 'amigo_id', otherKey: 'user_id' });

export default Amigos;
