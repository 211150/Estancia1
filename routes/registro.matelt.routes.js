import { registroController } from "../controllers/registro.matelt.controller.js";
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
 * '/api/registro/create':
 *  post:
 *     tags:
 *     - Registro
 *     summary: Crear Registro
 *     requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *           schema:
 *            type: object
 *            required:
 *              -prograAca
 *              - numero
 *              - description
 *              - unidad
 *              - cantidad
 *              - observacion
 *            properties:
 *              prograAca:
 *                type: string
 *                default: Ing en desarrollo de software
 *              numero:
 *                type: string
 *                default: 1
 *              description:
 *                type: descripción del producto
 *                default: 1
 *              unidad:
 *                type: string
 *                default: 4
 *              cantidad:
 *                type: string
 *                default: 6
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
  registroController.Register_create(req, res, upload)
);
/**
 * @openapi
 * '/api/registro/update':
 *  put:
 *     tags:
 *     - Registro
 *     summary: actualizar Registro
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
  *              prograAca:
 *                type: string
 *                default: Ing en desarrollo de software
 *              numero:
 *                type: string
 *                default: 1
 *              description:
 *                type: descripción del producto
 *                default: 1
 *              unidad:
 *                type: string
 *                default: 4
 *              cantidad:
 *                type: string
 *                default: 6
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
  registroController.Register_update(req, res, upload)
);

/**
 * @openapi
 * '/api/registro/view':
 *  get:
 *     tags:
 *     - Registro
 *     summary: visualizar Registro
 *     responses:
 *      200:
 *        description: update
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */
router.get("/view", (req, res) => registroController.Register_view(req, res));

/**
 * @openapi
 * '/api/registro/delete':
 *  delete:
 *     tags:
 *     - Registro
 *     summary: eliminar Registro
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
router.delete("/delete", (req, res) => registroController.Register_delete(req, res, upload));
export default router;