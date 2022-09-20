import path from "path";
import dotenv from "dotenv";
import { dataEnv } from "../config/env.config.js";
import { fileURLToPath } from "url";
import { getBitacora } from "../models/bitacoras.proyectores.model.js";
import { PutObjectCommand, S3Client, GetObjectCommand } from "@aws-sdk/client-s3";



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const data = dotenv.config({
  path: path.resolve(__dirname, `../environments/.env.${process.env.NODE_ENV}`),
});


const Bitacora_view = async function (req, res) {
    getBitacora.Bitacora
      .findAll()
      .then((r) => {
        res.send(r);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  };
  
  const bucketName = dataEnv.parsed.BUCKET_NAME
  
  
  const Bitacora_create = async function (req, res, upload) {
      
    getBitacora.Bitacora.create(
      {
        
        fecha: req.body.fecha,
        equipo: req.body.equipo,
        horaUso: req.body.horaUso,
        nombreEntre: req.body.nombreEntre,
        nombreReci: req.body.nombreReci,
        entregaEntre: req.body.entregaEntre,
        entregaReci: req.body.entregaReci,
        observacion:req.body.observacion,
    
      },
      {
        fields: ["fecha","equipo", "horaUso", "nombreEntre", "nombreReci", "entregaEntre", "entregaReci", "observacion"],
      }
    )
      .then((usos) => {
        res.send(usos);
      })
      .catch((err) => {
        console.log(err);
      });
      
  };
  
  const Bitacora_update = async function (req, res, upload) {
    const id = req.body.id;
    const fecha = req.body.fecha;
     const equipo = req.body.equipo;
     const horaUso = req.body.horaUso;
     const nombreEntre = req.body.nombreEntre;
     const nombreReci = req.body.nombreReci;
     const entregaEntre = req.body.entregaEntre;
     const entregaReci = req.body.entregaReci;
     const observacion = req.body.observacion;
  
    getBitacora.Bitacora
      .findOne({ where: { id: id } })
      .then((usos) => {
        usos.update({
          id: id,
          fecha: fecha,
          equipo: equipo,
          horaUso: horaUso,
          nombreEntre: nombreEntre,
          nombreReci: nombreReci,
          entregaEntre: entregaEntre,
          entregaReci: entregaReci,
          observacion: observacion,
        });
        res.status(200).json({ successfully: "Datos Actualizados" });
      })
      .catch((err) => {
        err.status(400).json({ err: "Error al actualizar" });
      });
  };
  
  const Bitacora_delete = async function (req, res) {
    const id = req.body.id;
    getBitacora.Bitacora
      .destroy({ where: { id: id } })
      .then((r) => {
        res.status(200).json({ message: "Deleted successfully" });
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  };
  
  
  
  export const bitacoraController = {
   Bitacora_create,
   Bitacora_view,
   Bitacora_update,
   Bitacora_delete

  };
  