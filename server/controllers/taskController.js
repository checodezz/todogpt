const Task = require("../model/task.model");

exports.getAllTasks = async (req,res) => {
    try {
        const tasks = await Task.find();
        return res.status(200).json(tasks);
    } catch (error) {
       console.log(error)
        res.status(500).json({ message: error.message });
    }
}

exports.createTask = async (req, res) => {
    const {title, description, status} = req.body;
    try {
        const newTask = new Task({title, description, status});
        await newTask.save();
        res.status(201).json({message : "Task Created Successfully", newTask})
    } catch (error) {
        console.log(error);
        res.status(500).json({message :error.message})
    }
}


exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    try {
        const updatedTask = await Task.findByIdAndUpdate(

            id,
            { title, description, status },
            { new: true }  
        );
        if (!updatedTask) return res.status(404).json({ message: 'Task not found' });
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) return res.status(404).json({ message: 'Task not found' });
        res.status(200).json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};