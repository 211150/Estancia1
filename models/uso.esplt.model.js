import { getData } from '../config/connection.config.js';
import { DataTypes } from 'sequelize';

const Uso = getData.sequelizeClient.define('tab_uso', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    area: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Ingrese el área'
            }
        }
    },
    periodo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Ingrese el periodo'
            }
        }
    },
    fecha: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    usuario: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    gradoGrup: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    firma: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    materia: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    equipoUtil: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    tiempoUso: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    horaEntra: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    horaSali: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    observacion: {
        type: DataTypes.STRING,
        allowNull: false,
    },

},{
    tableName: 'tab_uso',
    freezeTableName: true,
});

export const getUso = { Uso };

