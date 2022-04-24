import { Response } from "express"
import { Controller, Get, Response as Res } from "@decorators/express"

import { OraDBConnection } from "../utils/oraDBConnection"

@Controller("/usuariocanals")
export class UsuarioCanalController {
	@Get("/")
	async findAll(@Res() res: Response<any[]>): Promise<Response<any[]>> {
		try {
			const rows = await OraDBConnection.instance.querySelect<any>("SELECT * FROM GANANET.CAS_USUARIOXCANAL WHERE CODUSUARIO = TO_CHAR('521')")
			return res.status(200).json(rows)
		} catch (error) {
			console.error(error)
		}

		return res.status(500).json([])
	}
}
