const OpenAI = require("openai");
const express = require("express");
const router = express.Router()
const Task = require("../model/task.model")

const openai = new OpenAI({
    apiKey : process.env.OPENAI_API_KEY
});

let conversationHistory = [];

router.post("/completion", async (req, res) => {
    const query = req.body.query;

    const tasks = await Task.find({});

    const taskDataText = tasks.map(task => `Task: ${task.title}, Status: ${task.status}, Description: ${task.description}`).join("\n");

    if (conversationHistory.length === 0) {
        conversationHistory.push({
            role: "system",
            content: `You are a dedicated task management assistant. You should only answer questions that are directly related to task management, such as task status, updates, descriptions, or any specific details about the tasks provided. If a question is unrelated to the tasks or task management, politely respond that you can only provide assistance with task-related inquiries. Below is the current list of tasks:\n\n${taskDataText}\n\nUse only this information to answer user questions, and do not provide responses outside of the task context.`
        });
    }

    conversationHistory.push({ role: "user", content: query });

    try {
        const completion = await openai.chat.completions.create({
            messages: conversationHistory,
            model: "gpt-4o",
        });
        
        const assistantResponse = completion.choices[0].message.content;
        conversationHistory.push({ role: "assistant", content: assistantResponse });

        res.status(200).json({ response: assistantResponse });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});


module.exports = router

