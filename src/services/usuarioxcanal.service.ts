import { OraDBConnection } from "../utils/oraDBConnection"
import { CAS_USUARIOXCANAL } from "../models/CAS_USUARIOXCANAL"

export const findAll = async ({ page = 0, limit = 5 }) => {
	try {
		const [[count], rows] = await Promise.all([
			// query with pagination and rowCount
			OraDBConnection.instance.querySelect<Object[]>("SELECT COUNT(*) FROM GANANET.CAS_USUARIOXCANAL"),
			OraDBConnection.instance.querySelect<CAS_USUARIOXCANAL[]>(`SELECT * FROM GANANET.CAS_USUARIOXCANAL ORDER BY COD_USUARIOXCANAL OFFSET ${page * limit} ROWS FETCH NEXT ${limit} ROWS ONLY`),
		])

		return {
			page,
			limit,
			count: count["COUNT(*)"] as number,
			rows: rows as CAS_USUARIOXCANAL[],
		}
	} catch (error) {
		console.error(error)
		throw new Error(JSON.stringify({ page, limit, count: 0, rows: [] }))
	}
}
