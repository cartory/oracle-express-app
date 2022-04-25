import { Response } from "express"
import { Controller, Get, Response as Res } from "@decorators/express"

import { findAll } from "../services/usuarioxcanal.service"

@Controller("/usuariocanals")
export class UsuarioxCanalController {
	@Get("/")
	async findAll(@Res() res: Response): Promise<Response> {
		try {
			const data = await findAll({})
			return res.status(200).json(data)
		} catch (errorData) {
			return res.status(500).json(JSON.parse(errorData))
		}
	}
}
