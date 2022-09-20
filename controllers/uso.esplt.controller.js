import path from "path";
import dotenv from "dotenv";
import { dataEnv } from "../config/env.config.js";
import { fileURLToPath } from "url";
import { getUso } from "../models/uso.esplt.model.js";
import { PutObjectCommand, S3Client, GetObjectCommand } from "@aws-sdk/client-s3";



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const data = dotenv.config({
  path: path.resolve(__dirname, `../environments/.env.${process.env.NODE_ENV}`),
});


const Uso_view = async function (req, res) {
    getUso.Uso
      .findAll()
      .then((r) => {
        res.send(r);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  };
  
  const bucketName = dataEnv.parsed.BUCKET_NAME
  
  
  const Uso_create = async function (req, res, upload) {
      
    getUso.Uso.create(
      {
        area: req.body.area,
        periodo: req.body.periodo,
        fecha: req.body.fecha,
        usuario: req.body.usuario,
        gradoGrup: req.body.gradoGrup,
        firma: req.body.firma,
        materia: req.body.materia,
        equipoUtil: req.body.equipoUtil,
        tiempoUso: req.body.tiempoUso,
        horaEntra: req.body.horaEntra,
        horaSali: req.body.horaSali,
        observacion:req.body.observacion,
    
      },
      {
        fields: ["area","periodo", "fecha", "usuario", "gradoGrup", "firma", "materia", "equipoUtil","tiempoUso","horaEntra","horaSali", "observacion"],
      }
    )
      .then((usos) => {
        res.send(usos);
      })
      .catch((err) => {
        console.log(err);
      });
      
  };
  
  const Uso_update = async function (req, res, upload) {
    const id = req.body.id;
     const area = req.body.area;
     const periodo = req.body.periodo;
     const fecha = req.body.fecha;
     const usuario = req.body.usuario;
     const gradoGrup = req.body.gradoGrup;
     const firma = req.body.firma;
     const  materia = req.body.materia;
     const  equipoUtil = req.body.equipoUtil;
     const  tiempoUso = req.body.tiempoUso;
     const  horaEntra = req.body.horaEntra;
     const  horaSali = req.body.horaSali;
     const observacion = req.body.observacion;
  
    getUso.Uso
      .findOne({ where: { id: id } })
      .then((usos) => {
        usos.update({
          id: id,
          area: area,
          periodo: periodo,
          fecha: fecha,
          usuario: usuario,
          gradoGrup: gradoGrup,
          firma: firma,
          materia: materia,
          equipoUtil: equipoUtil,
          tiempoUso: tiempoUso,
          horaEntra: horaEntra,
          horaSali: horaSali,
          observacion: observacion,
        });
        res.status(200).json({ successfully: "Datos Actualizados" });
      })
      .catch((err) => {
        err.status(400).json({ err: "Error al actualizar" });
      });
  };
  
  const Uso_delete = async function (req, res) {
    const id = req.body.id;
    getUso.Uso
      .destroy({ where: { id: id } })
      .then((r) => {
        res.status(200).json({ message: "Deleted successfully" });
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  };
  
  
  
  export const usoController = {
   Uso_create,
   Uso_view,
   Uso_update,
   Uso_delete

  };
  