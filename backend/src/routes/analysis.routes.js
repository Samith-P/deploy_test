import {Router} from "express"
import { jdanalysis } from "../controller/resume.jdanalysis.js";
const router=Router()
router.route("/jdanalysis").post(jdanalysis)
export default router