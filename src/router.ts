import { Router } from "express"
import { attachControllers } from "@decorators/express"

import { UsuarioxCanalController } from "./controllers/usuarioxcanal.controller"

const router = Router()

attachControllers(router, [
	//
	UsuarioxCanalController,
])

export default router
