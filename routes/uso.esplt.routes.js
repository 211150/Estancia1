import { usoController } from "../controllers/uso.esplt.controller.js";
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
 * '/api/uso/create':
 *  post:
 *     tags:
 *     - Uso
 *     summary: Crear Uso
 *     requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *           schema:
 *            type: object
 *            required:
 *              -area
 *              - periodo
 *              - fecha
 *              - usuario
 *              - gradoGrup
 *              - firma
 *              - materia
 *              - equipoUtil
 *              - tiempoUso
 *              - horaEntra
 *              - horaSali
 *              - observacion
 *            properties:
 *              area:
 *                type: string
 *                default: Ing en desarrollo de software
 *              periodo:
 *                type: string
 *                default: Sep-Dic
 *              fecha:
 *                type: descripción del producto
 *                default: 25/08/2022
 *              usuario: 
 *                type: string
 *                default: Alfredo Alvarez
 *              gradoGrup:
 *                type: string
 *                default: 4 "A"
 *              firma:
 *                type: string
 *                default: Alfredo...
 *              materia:
 *                type: string
 *                default: Algoritmo
 *              equipoUtil:
 *                type: string
 *                default: Computador Model:L3453
 *              tiempoUso:
 *                type: string
 *                default: 3 horas
 *              horaEntra:
 *                type: string
 *                default: 9:00 am
 *              horaSali:
 *                type: string
 *                default: 12:00 pm
 *              observacion:
 *                type: string
 *                default: Todo correcto
 *     responses:
 *      200:
 *        description: Create
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */

router.post("/create", upload.single("name"), (req, res) =>
  usoController.Uso_create(req, res, upload)
);
/**
 * @openapi
 * '/api/uso/update':
 *  put:
 *     tags:
 *     - Uso
 *     summary: actualizar Uso
 *     requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *           schema:
 *            type: object
 *            required:
 *              -id
 *              - prograAca
 *              - numero
 *              - description
 *              - unidad
 *              - cantidad
 *              - observacion
 *            properties:
 *              id:
 *                type: UUID
 *                default:
 *              area:
 *                type: string
 *                default: Ing en desarrollo de software
 *              periodo:
 *                type: string
 *                default: Sep-Dic
 *              fecha:
 *                type: descripción del producto
 *                default: 25/08/2022
 *              usuario: 
 *                type: string
 *                default: Alfredo Alvarez
 *              gradoGrup:
 *                type: string
 *                default: 4 "A"
 *              firma:
 *                type: string
 *                default: Alfredo...
 *              materia:
 *                type: string
 *                default: Algoritmo
 *              equipoUtil:
 *                type: string
 *                default: Computador Model:L3453
 *              tiempoUso:
 *                type: string
 *                default: 3 horas
 *              horaEntra:
 *                type: string
 *                default: 9:00 am
 *              horaSali:
 *                type: string
 *                default: 12:00 pm
 *              observacion:
 *                type: string
 *                default: Todo correcto
 *     responses:
 *      200:
 *        description: update
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */
router.put("/update", upload.single("name"), (req, res) =>
  usoController.Uso_update(req, res, upload)
);

/**
 * @openapi
 * '/api/uso/view':
 *  get:
 *     tags:
 *     - Uso
 *     summary: visualizar Uso
 *     responses:
 *      200:
 *        description: update
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */
router.get("/view", (req, res) => usoController.Uso_view(req, res));

/**
 * @openapi
 * '/api/uso/delete':
 *  delete:
 *     tags:
 *     - Uso
 *     summary: eliminar Uso
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
router.delete("/delete", (req, res) => usoController.Uso_delete(req, res, upload));
export default router;