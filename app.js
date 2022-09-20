import { api } from './config/config.js';
import swaggerDocs from './config/swagger.config.js';
import middleware from './middlewares/token.middleware.js'
import { validate } from './config/mailer.js';
import express from 'express';
import cors from'cors';
import user from './routes/user.routes.js';
import email from './routes/email.routes.js';
import equipo from "./routes/registro.equipo.manteni.routes.js";
import registro from "./routes/registro.matelt.routes.js";
import reporte from "./routes/reporte.aulas.routes.js";
import uso from "./routes/uso.esplt.routes.js";
import bitacora from "./routes/bitacoras.proyectores.routes.js"


const app = express();
app.use(cors())

app.use(express.json());
// ROUTERS
app.use('/api/user', user);
app.use('/api/email', email);
app.use("/api/equipo", equipo);
app.use("/api/registro", registro);
app.use("/api/reporte", reporte);
app.use("/api/uso", uso);
app.use("/api/bitacora", bitacora);
// app.use('/api/profile', middleware, profile);



// SERVIDOR ACTIVO
app.listen(api.port, () => {
    console.log(`Servidor corriento en el puerto => ${api.port}`);
    swaggerDocs(app, api.port);
});

app.listen(validate.portEmail, () => {
    console.log(`Puerto De email => ${validate.port}`);
    console.log("Servicio de email Functional")

})

