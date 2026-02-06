const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const TaskSchema = new Schema({
    TaskName:{
        type:String,
        required:true
    },
    isDone:{
        type:Boolean,
        required:true
    },

})

const Taskmodel = mongoose.model('TASKS', TaskSchema)

module.exports = Taskmodel;
