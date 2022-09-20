import { getData } from '../config/connection.config.js';
import { DataTypes } from 'sequelize';

const reporte = getData.sequelizeClient.define(
    "tab_reporte",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      cubiculo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      numeroAula: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      energiaElec: {
        type: DataTypes.STRING,
        allowNull: false,
        
      },
      infraestructura: {
        type: DataTypes.STRING,
        allowNull: false,
        
      },
    },{
      tableName: 'tab_reporte',
      freezeTableName: true,
    }
  );
  
  export const getReporte = { reporte };