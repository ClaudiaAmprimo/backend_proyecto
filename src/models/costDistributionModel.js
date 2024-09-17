import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import Event from './eventsModel.js';
import User from './userModel.js';

const CostDistribution = sequelize.define('CostDistribution', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  event_id: {
    type: DataTypes.INTEGER(11), 
    allowNull: false,
    references: {
      model: Event,
      key: 'id_event',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  user_id: {
    type: DataTypes.INTEGER(8).UNSIGNED,
    allowNull: false,
    references: {
      model: User,
      key: 'id_user',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  amount: {
    type: DataTypes.DECIMAL(7, 2),
    allowNull: false,
  },
}, {
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at'
});

Event.hasMany(CostDistribution, { foreignKey: 'event_id' });
CostDistribution.belongsTo(Event, { foreignKey: 'event_id' });

User.hasMany(CostDistribution, { foreignKey: 'user_id' });
CostDistribution.belongsTo(User, { foreignKey: 'user_id' });

export default CostDistribution;
