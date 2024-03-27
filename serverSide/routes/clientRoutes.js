import express  from "express";
import * as clientController  from "../controllers/client.js";
const router=express.Router();
router.get("/",clientController.getClients)
router.get("/:id",clientController.getClientByID)
router.post("/",clientController.addClient)
router.put("/:id",clientController.updateClient)
router.put("/vac/:id",clientController.addVaccine)
router.put("/rec/:id",clientController.updateClientRecovery)
router.put("/pos/:id",clientController.updateClientPositive)
router.delete("/:id",clientController.deleteClient)
export default router;
