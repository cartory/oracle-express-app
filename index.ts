import app from "./src/app"

const PORT = process.env.PORT

app.listen(PORT, () => {
	console.log(new Date())
	console.log(`Server runnning on http://localhost:${PORT}/`)
})
