import { bitacoraController } from "../controllers/bitacoras.proyectores.controller.js";
import { Router } from "express";
import bodyParser from "body-parser";
import multer from "multer";

const router = Router();

const jsonParser = bodyParser.json();

const urlencodedParser = bodyParser.urlencoded({ extended: false });

const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * @openapi
 * '/api/bitacora/create':
 *  post:
 *     tags:
 *     - Bitacora
 *     summary: Crear Bitacora
 *     requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *           schema:
 *            type: object
 *            required:
 *              -fecha
 *              - equipo
 *              - horaUso
 *              - nombreEntre
 *              - nombreReci
 *              - entregaEntre
 *              - entregaReci
 *              - observacion
 *            properties:
 *              fecha:
 *                type: string
 *                default: 01/09/2022
 *              equipo:
 *                type: string
 *                default: Poyector M63870
 *              horaUso:
 *                type: 3 horas
 *                default: 1
 *              nombreEntre:
 *                type: string
 *                default: Montserrat
 *              nombreReci:
 *                type: string
 *                default: Alfredo
 *              entregaEntre:
 *                type: string
 *                default: Alfredo
 *              entregaReci:
 *                type: string
 *                default: Montserrat
 *              observacion:
 *                type: string
 *                default: Todo bien
 *     responses:
 *      200:
 *        description: Create
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */

router.post("/create", upload.single("name"), (req, res) =>
  bitacoraController.Bitacora_create(req, res, upload)
);
/**
 * @openapi
 * '/api/bitacora/update':
 *  put:
 *     tags:
 *     - Bitacora
 *     summary: actualizar Bitacora
 *     requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *           schema:
 *            type: object
 *            required:
 *              -id
 *              - fecha
 *              - equipo
 *              - horaUso
 *              - nombreEntre
 *              - nombreReci
 *              - entregaEntre
 *              - entregaReci
 *              - observacion
 *            properties:
 *              id:
 *                type: UUID
 *                default:
 *              fecha:
 *                type: string
 *                default: 01/09/2022
 *              equipo:
 *                type: string
 *                default: Poyector M63870
 *              horaUso:
 *                type: 3 horas
 *                default: 1
 *              nombreEntre:
 *                type: string
 *                default: Montserrat
 *              nombreReci:
 *                type: string
 *                default: Alfredo
 *              entregaEntre:
 *                type: string
 *                default: Alfredo
 *              entregaReci:
 *                type: string
 *                default: Montserrat
 *              observacion:
 *                type: string
 *                default: Todo bien
 *     responses:
 *      200:
 *        description: update
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */
router.put("/update", upload.single("name"), (req, res) =>
  bitacoraController.Bitacora_update(req, res, upload)
);

/**
 * @openapi
 * '/api/bitacora/view':
 *  get:
 *     tags:
 *     - Bitacora
 *     summary: visualizar bitacora
 *     responses:
 *      200:
 *        description: update
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */
router.get("/view", (req, res) => bitacoraController.Bitacora_view(req, res));

/**
 * @openapi
 * '/api/bitacora/delete':
 *  delete:
 *     tags:
 *     - Bitacora
 *     summary: eliminar bitacora
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            required:
 *              -id
 *            properties:
 *              id:
 *                type: UUID
 *                default: fc1ea539-6af5-428b-9fd1-2b71fddead23
 *     responses:
 *      200:
 *        description: update
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */
router.delete("/delete", (req, res) => bitacoraController.Bitacora_delete(req, res, upload));
export default router;