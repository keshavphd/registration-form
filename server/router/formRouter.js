import { Router } from "express";
import formControllers from "../controller/formController.js";

const router = Router();

router.route("/get-all-data").get(formControllers.allData); 
router.route("/post-data").post(formControllers.storeData)

export default router;
