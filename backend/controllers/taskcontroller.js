const Taskmodel = require("../models/Taskmodel.js");


const createTask = async(req, res)=>{
     const data = req.body
    try{
       
       const model = new Taskmodel(data);
       await model.save()
       res.status(201).json({message:"task is created",success:true})
    }
    catch(err){
        res.status(500).json({message:"failed to create task",success:false})
    }
}

const getAllTasks = async(req, res)=>{
    try{
        const tasks = await Taskmodel.find()
        res.status(201).json({message:"all tasks ",success:true,tasks})
    }
    catch(err){
        res.status(500).json({message:"failed to fetch tasks",success:false})
    }
}
  
const updateTaskByID = async(req, res)=>{
     
    try{
       const id = req.params.id
       const data = req.body
       const obj = {$set:{...data}}
       const model = await Taskmodel.findByIdAndUpdate(id,obj);
       
       res.status(200).json({message:"task is updated",success:true})
    }
    catch(err){
        res.status(500).json({message:"failed to update task",success:false})
    }
}

const DeleteTaskByID = async(req, res)=>{
    
    try{
       const id = req.params.id
       const model = await Taskmodel.findByIdAndDelete(id);
       
       res.status(200).json({message:"task is deleted",success:true})
    }
    catch(err){
        res.status(500).json({message:"failed to delete task",success:false})
    }
}

module.exports = {createTask , getAllTasks , updateTaskByID , DeleteTaskByID}