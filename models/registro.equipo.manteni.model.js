import { getData } from '../config/connection.config.js';
import { DataTypes } from 'sequelize';

const equipo = getData.sequelizeClient.define(
    "tab_equipo",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      numero: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descriptionP: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      unidad: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      serie: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cantidad: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ajuste: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      calibracion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      remplazo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      manto: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fechaProg: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      observacion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },{
      tableName: 'tab_equipo',
      freezeTableName: true,
    }
  );
  
  export const getEquipo = { equipo };