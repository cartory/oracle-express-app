import morgan from "morgan"

import app from "./src/app"

const PORT = process.env.PORT

app.use(morgan("dev")).listen(PORT, () => {
	console.log(new Date())
	console.log(`Server runnning on http://localhost:${PORT}/`)
})
