const express= require("express");
const openai = require("openai");
const Task = require("../model/task.model");
const router = express.Router();

router.post("/ask", async (req, res) => {
    try {
        
        const tasks = await Task.find( {});

        console.log(tasks)
    } catch (error) {
        console.error(error);
    res.status(500).json({ error: "Failed to get response from GPT" });
    }
})


module.exports = router