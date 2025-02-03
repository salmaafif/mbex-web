import express from "express";
import BoothController from "../controllers/BoothController.js";
const router = express.Router()

router.get('/', BoothController.getBooth)
router.get('/:id', BoothController.getBoothById)
router.post('/create', BoothController.createBooth)
router.put('/:id', BoothController.updateBooth)
router.delete('/:id', BoothController.deleteBooth)

export default router