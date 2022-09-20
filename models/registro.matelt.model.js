import { getData } from '../config/connection.config.js';
import { DataTypes } from 'sequelize';

const registro = getData.sequelizeClient.define(
    "tab_registro",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      prograAca: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      numero: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "ingrese el número",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        
      },
      unidad: {
        type: DataTypes.STRING,
        allowNull: false,
        
      },
      cantidad: {
        type: DataTypes.STRING,
        allowNull: false,
        
      },
      observacion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },{
      tableName: 'tab_registro',
      freezeTableName: true,
    }
  );
  
  export const getRegistro = { registro };