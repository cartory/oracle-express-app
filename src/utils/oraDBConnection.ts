import oracledb from "oracledb"

export interface OraPoolAttributes extends oracledb.PoolAttributes {
	tag?: string
}

export interface OraResultCallback<T> {
	(result: oracledb.Result<T>): Promise<T | T[]>
}

export interface OraExecuteOptions<T> extends oracledb.ExecuteOptions {
	sql: string
	resultCallback: OraResultCallback<T>
	bindParams?: oracledb.BindParameters
}

export class OraDBConnection {
	private static _instance: OraDBConnection

	public static get instance(): OraDBConnection {
		if (!OraDBConnection._instance) {
			OraDBConnection._instance = new OraDBConnection()
		}

		return OraDBConnection._instance
	}

	private poolAttributes: OraPoolAttributes = {
		tag: "default",
	}

	public setConnection(poolAttributes: OraPoolAttributes): OraDBConnection {
		const { tag, poolAlias } = poolAttributes

		this.poolAttributes = {
			...poolAttributes,
			tag: tag ?? this.poolAttributes.tag,
			poolAlias: poolAlias ?? this.poolAttributes.poolAlias,
		}

		return this
	}

	private async getConnection(): Promise<oracledb.Connection> {
		let pool: oracledb.Pool
		const { tag, poolAlias } = this.poolAttributes

		try {
			pool = oracledb.getPool(poolAlias)
		} catch (err) {
			pool = await oracledb.createPool(this.poolAttributes)
		}

		return pool.getConnection({ tag })
	}

	public async query<T>(oraExecuteOptions: OraExecuteOptions<T>) {
		const { sql, bindParams = [] } = oraExecuteOptions

		try {
			const connection = await this.getConnection()

			const result = await connection.execute<T>(sql, bindParams, oraExecuteOptions)
			const oraResult = await oraExecuteOptions.resultCallback(result)

			await connection.close()

			return oraResult
		} catch (error) {
			throw new Error(error)
		}
	}

	public async querySelect<T>(sql: string, bindParams?: oracledb.BindParameters) {
		return await this.query<T>({
			sql: sql,
			resultSet: true,
			bindParams: bindParams,
			outFormat: oracledb.OUT_FORMAT_OBJECT,
			resultCallback: (result) => result.resultSet.getRows(),
		})
	}
}
