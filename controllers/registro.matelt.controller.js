import path from "path";
import dotenv from "dotenv";
import { dataEnv } from "../config/env.config.js";
import { fileURLToPath } from "url";
import { getRegistro } from "../models/registro.matelt.model.js";
import { PutObjectCommand, S3Client, GetObjectCommand } from "@aws-sdk/client-s3";



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const data = dotenv.config({
  path: path.resolve(__dirname, `../environments/.env.${process.env.NODE_ENV}`),
});


const Register_view = async function (req, res) {
    getRegistro.registro
      .findAll()
      .then((r) => {
        res.send(r);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  };
  
  const bucketName = dataEnv.parsed.BUCKET_NAME
  
  
  const Register_create = async function (req, res) {
      
    getRegistro.registro.create(
      {
        prograAca: req.body.prograAca,
        numero: req.body.numero,
        description: req.body.description,
        unidad: req.body.unidad,
        cantidad: req.body.cantidad ,
        observacion:req.body.observacion,
    
      },
      {
        fields: ["prograAca","numero", "description", "unidad", "cantidad", "observacion"],
      }
    )
      .then((registe) => {
        res.send(registe);
      })
      .catch((err) => {
        console.log(err);
      });
      
  };
  
  const Register_update = async function (req, res, upload) {
    const prograAca = req.body.prograAca;
     const numero = req.body.numero;
     const description = req.body.description;
     const unidad = req.body.unidad;
     const cantidad = req.body.cantidad;
     const observacion = req.body.observacion;
  
    getRegistro.registro
      .findOne({ where: { numero: numero } })
      .then((registros) => {
        registros.update({
          prograAca: prograAca,
          numero: numero,
          description: description,
          unidad: unidad,
          cantidad: cantidad,
          observacion: observacion,
        });
        res.status(200).json({ successfully: "Datos Actualizados" });
      })
      .catch((err) => {
        err.status(400).json({ err: "Error al actualizar" });
      });
  };
  
  const Register_delete = async function (req, res) {
    const numero = req.body.numero;
    getRegistro.registro
      .destroy({ where: { numero: numero } })
      .then((r) => {
        res.status(200).json({ message: "Deleted successfully" });
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  };
  
  
  
  export const registroController = {
    Register_create,
    Register_view,
    Register_update,
    Register_delete

  };
  