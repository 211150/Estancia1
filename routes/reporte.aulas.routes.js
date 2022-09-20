import { reporteController } from "../controllers/reporte.aulas.controller.js";
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
 * '/api/reporte/create':
 *  post:
 *     tags:
 *     - Reporte
 *     summary: Crear reporte
 *     requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *           schema:
 *            type: object
 *            required:
 *              -cubiculo
 *              - numeroAula
 *              - energiaElec
 *              - infraestructura
 *            properties:
 *              cubiculo:
 *                type: string
 *                default: Doc. Carlos
 *              numeroAula:
 *                type: string
 *                default: 1
 *              energiaElec:
 *                type: string
 *                default: Falla electrica
 *              infraestructura:
 *                type: string
 *                default: Ningun daño
 *     responses:
 *      200:
 *        description: Create
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */

router.post("/create", upload.single("name"), (req, res) =>
  reporteController.Reporte_create(req, res, upload)
);
/**
 * @openapi
 * '/api/reporte/update':
 *  put:
 *     tags:
 *     - Reporte
 *     summary: actualizar reporte
 *     requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *           schema:
 *            type: object
 *            required:
 *              -id
 *              - cubiculo
 *              - numeroAula
 *              - energiaElect
 *              - infraestructura
 *            properties:
 *              id:
 *                type: UUID
 *                default:
 *              cubiculo:
 *                type: string
 *                default: Doc. Carlos
 *              numeroAula:
 *                type: string
 *                default: 1
 *              energiaElec:
 *                type: string
 *                default: Falla electrica
 *              infraestructura:
 *                type: string
 *                default: Ningun daño
 *     responses:
 *      200:
 *        description: update
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */
router.put("/update", upload.single("name"), (req, res) =>
  reporteController.Reporte_update(req, res, upload)
);

/**
 * @openapi
 * '/api/reporte/view':
 *  get:
 *     tags:
 *     - Reporte
 *     summary: visualizar reporte
 *     responses:
 *      200:
 *        description: update
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */
router.get("/view", (req, res) => reporteController.Reporte_view(req, res));

/**
 * @openapi
 * '/api/reporte/delete':
 *  delete:
 *     tags:
 *     - Reporte
 *     summary: eliminar reporte
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
router.delete("/delete", (req, res) => reporteController.Reporte_delete(req, res, upload));
export default router;