import { FileSchema } from "@monorepo/schemas"
import { Router } from "express"
import { getAnalyze } from "../controllers/getAnalyseController"
import { validateData } from "../middleware/validateSchema"

const router: Router = Router()

router.post("/", validateData(FileSchema), getAnalyze)

export default router
