const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const openai = require("../openai");
const Task = require("../model/task.model");

router.get("/tasks", taskController.getAllTasks);
router.post("/tasks", taskController.createTask);
router.put("/tasks/:id", taskController.updateTask);
router.delete("/tasks/:id", taskController.deleteTask);

router.post("/ask", async (req, res) => {
    try {
        const tasks = await Task.find( {});

        let taskData = tasks.map(task => {
            return `Task: ${task.title}, Status: ${task.status}, Description: ${task.description}`
        }).join("\n")


    const prompt = `I am a task manager assistant. Here are some tasks: \n${taskData}\nUser's question: ${req.body.query}\nPlease answer the question based strictly on these tasks. Do not provide any information beyond this.`;


    const gptResponse = await openai.chat.completions.create({
        model : "gpt-3.5-turbo",
        messages :[
            {role : "system", content : "You are an assistant that helps with task management"},
            { role: "user", content: prompt }
        ],
    })

    console.log(gptResponse)
    res.json({ answer: gptResponse.choices[0].message.content });

    } catch (error) {
        console.error(error);
    res.status(500).json({ error: "Failed to get response from GPT" });
    }
})


module.exports = router