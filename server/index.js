require("dotenv").config();
const connectDB = require("./db/db.connect");
const express = require("express");
const taskRoutes = require("./routes/taskRoutes")
const app = express()
app.use(express.json())
connectDB()


app.get('/', (req, res) => {
    res.send("Hello, welcome to todogpt")
}) 

app.use("/api", taskRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})
