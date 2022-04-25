import cors from "cors"
import morgan from 'morgan'
import express from "express"
import { config } from "dotenv"

import router from "./router"
import { OraDBConnection } from "./utils/oraDBConnection"

config()

OraDBConnection.instance.setConnection({
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	connectString: process.env.DB_CONN,
})

const app = express()

app
	//
	.use(cors())
	.use(morgan('dev'))
	.use(express.urlencoded({ extended: true }))
	.use(express.json())
	//
	.use("/api", router)
	.get("/", (_, res) => res.send("<h1>Welcome to Server 👋</h1>"))

export default app
