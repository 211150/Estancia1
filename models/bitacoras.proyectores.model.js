import { getData } from '../config/connection.config.js';
import { DataTypes } from 'sequelize';

const Bitacora = getData.sequelizeClient.define('tab_bitacora', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    fecha: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Ingrese la fecha'
            }
        }
    },
    equipo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Ingrese el equipo'
            }
        }
    },
    horaUso: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nombreEntre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nombreReci: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    entregaEntre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    entregaReci: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    observacion: {
        type: DataTypes.STRING,
        allowNull: false,
    },

},{
    tableName: 'tab_bitacora',
    freezeTableName: true,
});

export const getBitacora = { Bitacora };
