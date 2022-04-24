import { Router } from "express"
import { attachControllers } from "@decorators/express"

import { UsuarioCanalController } from "./controllers/usuariocanal.controller"

const router = Router()

attachControllers(router, [
	//
	UsuarioCanalController,
])

export default router
