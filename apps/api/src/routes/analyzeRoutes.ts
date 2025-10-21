import { FileSchema } from "@monorepo/schemas"
import { Router } from "express"
import { getAnalyze } from "../controllers/getAnalyseController"
import { validateFile } from "../middleware/validateFile"

const router: Router = Router()

router.post("/", validateFile(FileSchema), getAnalyze)

export default router
