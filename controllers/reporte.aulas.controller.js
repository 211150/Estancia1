import path from "path";
import dotenv from "dotenv";
import { dataEnv } from "../config/env.config.js";
import { fileURLToPath } from "url";
import { getReporte } from "../models/reporte.aulas.model.js";
import { PutObjectCommand, S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import e from "cors";



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const data = dotenv.config({
  path: path.resolve(__dirname, `../environments/.env.${process.env.NODE_ENV}`),
});


const Reporte_view = async function (req, res) {
    getReporte.reporte
      .findAll()
      .then((r) => {
        res.send(r);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  };
  
  const bucketName = dataEnv.parsed.BUCKET_NAME
  
  
  const Reporte_create = async function (req, res) {
      
    getReporte.reporte.create(
      {
        cubiculo: req.body.cubiculo,
        numeroAula: req.body.numeroAula,
        energiaElec: req.body.energiaElec,
        infraestructura: req.body.infraestructura,
      },
      {
        fields: ["cubiculo","numeroAula", "energiaElec", "infraestructura"],
      }
    )
      .then((reportes) => {
        res.send(reportes);
      })
      .catch((err) => {
        console.log(err);
      });
      
  };
  
  const Reporte_update = async function (req, res, upload) {
    const id = req.body.id;
    const cubiculo = req.body.cubiculo;
     const numeroAula = req.body.numeroAula;
     const energiaElec = req.body.energiaElec;
     const infraestructura = req.body.infraestructura;
  
    getReporte.reporte
      .findOne({ where: { id: id } })
      .then((reportes) => {
        reportes.update({
          id: id,
          cubiculo: cubiculo,
          numeroAula: numeroAula,
          energiaElec: energiaElec,
          infraestructura: infraestructura,
        });
        res.status(200).json({ successfully: "Datos Actualizados" });
      })
      .catch((err) => {
        err.status(400).json({ err: "Error al actualizar" });
      });
  };
  
  const Reporte_delete = async function (req, res) {
    const id = req.body.id;
    getReporte.reporte
      .destroy({ where: { id: id} })
      .then((r) => {
        res.status(200).json({ message: "Deleted successfully" });
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  };
  
  
  
  export const reporteController = {
    Reporte_create,
    Reporte_view,
    Reporte_update,
    Reporte_delete

  };
  