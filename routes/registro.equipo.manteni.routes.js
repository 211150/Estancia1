import { equipoController } from "../controllers/registro.equipo.manteni.controller.js";
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
 * '/api/equipo/create':
 *  post:
 *     tags:
 *     - Equipo
 *     summary: Crear Equipo
 *     requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *           schema:
 *            type: object
 *            required:
 *              -numero
 *              - descriptionP
 *              - unidad
 *              - serie
 *              - cantidad
 *              - ajuste
 *              - calibracion
 *              - remplazo
 *              - manto
 *              - fechaProg
 *              - observacion
 *            properties:
 *              numero:
 *                type: string
 *                default: 1
 *              descriptionP:
 *                type: descripción del producto
 *                default: 1
 *              unidad:
 *                type: string
 *                default: 4
 *              serie:
 *                type: string
 *                default: L453
 *              cantidad:
 *                type: string
 *                default: 4
 *              ajuste:
 *                type: string
 *                default: No expecifico
 *              calibracion:
 *                type: string
 *                default: No
 *              remplazo:
 *                type: string
 *                default: L458
 *              manto:
 *                type: string
 *                default: No
 *              fechaProg:
 *                type: string
 *                default: 26/09/22
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
  equipoController.Equipo_create(req, res, upload)
);
/**
 * @openapi
 * '/api/equipo/update':
 *  put:
 *     tags:
 *     - Equipo
 *     summary: actualizar equipo
 *     requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *           schema:
 *            type: object
 *            required:
 *              -id
 *              - numero
 *              - descriptionP
 *              - unidad
 *              - serie
 *              - cantidad
 *              - ajuste
 *              - calibracion
 *              - remplazo
 *              - manto
 *              - fechaProg
 *              - observacion
 *            properties:
 *              id:
 *                type: UUID
 *                default:
 *              numero:
 *                type: string
 *                default: 1
 *              descriptionP:
 *                type: descripción del producto
 *                default: 1
 *              unidad:
 *                type: string
 *                default: 4
 *              serie:
 *                type: string
 *                default: L453
 *              cantidad:
 *                type: string
 *                default: 4
 *              ajuste:
 *                type: string
 *                default: No expecifico
 *              calibracion:
 *                type: string
 *                default: No
 *              remplazo:
 *                type: string
 *                default: L458
 *              manto:
 *                type: string
 *                default: No
 *              fechaProg:
 *                type: string
 *                default: 26/09/22
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
  equipoController.Equipo_update(req, res, upload)
);

/**
 * @openapi
 * '/api/equipo/view':
 *  get:
 *     tags:
 *     - Equipo
 *     summary: visualizar equipo
 *     responses:
 *      200:
 *        description: update
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */
router.get("/view", (req, res) => equipoController.Equipo_view(req, res));

/**
 * @openapi
 * '/api/equipo/delete':
 *  delete:
 *     tags:
 *     - Equipo
 *     summary: eliminar Equipo
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            required:
 *              -numero
 *            properties:
 *              numero:
 *                type: UUID
 *                default: 1
 *     responses:
 *      200:
 *        description: update
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */
router.delete("/delete", (req, res) => equipoController.Equipo_delete(req, res, upload));
export default router;