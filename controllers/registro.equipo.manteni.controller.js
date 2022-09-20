import path from "path";
import dotenv from "dotenv";
import { dataEnv } from "../config/env.config.js";
import { fileURLToPath } from "url";
import { getEquipo } from "../models/registro.equipo.manteni.model.js";
import { PutObjectCommand, S3Client, GetObjectCommand } from "@aws-sdk/client-s3";



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const data = dotenv.config({
  path: path.resolve(__dirname, `../environments/.env.${process.env.NODE_ENV}`),
});


const Equipo_view = async function (req, res) {
    getEquipo.equipo
      .findAll()
      .then((r) => {
        res.send(r);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  };
  
  const bucketName = dataEnv.parsed.BUCKET_NAME
  
  
  const Equipo_create = async function (req, res) {
      
    getEquipo.equipo.create(
      {
        numero: req.body.numero,
        descriptionP: req.body.descriptionP,
        unidad: req.body.unidad,
        serie: req.body.serie,
        cantidad: req.body.cantidad,
        ajuste:req.body.ajuste,
        calibracion:req.body.calibracion,
        remplazo:req.body.remplazo,
        manto:req.body.manto,
        fechaProg:req.body.fechaProg,
        observacion:req.body.observacion,
    
      },
      {
        fields: ["numero", "descriptionP", "unidad", "serie", "cantidad", "ajuste", "calibracion", "remplazo", "manto", "fechaProg", "observacion"],
      }
    )
      .then((equipos) => {
        res.send(equipos);
      })
      .catch((err) => {
        console.log(err);
      });
      
  };
  
  const Equipo_update = async function (req, res, upload) {
     const numero = req.body.numero;
     const descriptionP = req.body.descriptionP;
     const unidad = req.body.unidad;
     const serie = req.body.serie;
     const cantidad = req.body.cantidad;
     const ajuste = req.body.ajuste;
     const calibracion = req.body.calibracion;
     const remplazo = req.body.remplazo;
     const manto = req.body.manto;
     const fechaProg = req.body.fechaProg;
     const observacion = req.body.observacion;
  
    getEquipo.equipo
      .findOne({ where: { numero: numero } })
      .then((equipos) => {
        equipos.update({
          numero: numero,
          descriptionP: descriptionP,
          unidad: unidad,
          serie:serie,
          cantidad: cantidad,
          ajuste: ajuste,
          calibracion: calibracion,
          remplazo: remplazo,
          manto: manto,
          fechaProg: fechaProg,
          observacion: observacion,
        });
        res.status(200).json({ successfully: "Datos Actualizados" });
      })
      .catch((err) => {
        err.status(400).json({ err: "Error al actualizar" });
      });
  };
  
  const Equipo_delete = async function (req, res) {
    const numero = req.body.numero;
    getEquipo.equipo
      .destroy({ where: { numero: numero } })
      .then((r) => {
        res.status(200).json({ message: "Deleted successfully" });
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  };
  
  
  
  export const equipoController = {
   Equipo_create,
   Equipo_update,
   Equipo_view,
   Equipo_delete

  };
  