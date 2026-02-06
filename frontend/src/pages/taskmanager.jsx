import React, { useEffect } from "react";
import { FaCheck, FaPencilAlt, FaPlus, FaTrash, FaSearch } from "react-icons/fa";
import { ToastContainer } from 'react-toastify'
import { CreateTask, deletetasksbyID, GetAllTasks, UpdateTaskByID } from "./api";
import { notify } from "./utilis";




const TaskManager = () => {

    const [input, setInput] = React.useState("");
    const [tasks, setTasks] = React.useState([]);
    const [copyTasks, setCopyTasks] = React.useState([]);
    const [update1task, setupdate] = React.useState(null);
    const handletask = () => {
        if (update1task && input) {
            //update API call
            const obj = {
                TaskName: input,
                isDone: update1task.isDone
            }
            handleupdate(update1task._id, obj);
        }
        else if (!update1task && input)
            //create API call
            handleaddtask();


    }

    useEffect(() => {
        if (update1task) {
            setInput(update1task.TaskName)
        }
    }, [update1task])

    const handleaddtask = async () => {
        const obj = {
            TaskName: input,
            isDone: false
        }
        try {
            const data = await CreateTask(obj);
            console.log("task added successfully ", data);
            if (data.success) {
                notify("Task added successfully", 'success');
            } else {
                notify(data.message, 'error');
            }
            setInput("");
            fetchTASKS();
        }
        catch (err) {
            console.log("error while adding task ", err);
        }

    }

    const fetchTASKS = async () => {
        try {
            const data = await GetAllTasks();
            console.log(data);
            setTasks(data.tasks);
            setCopyTasks(data.tasks);

        }
        catch (err) {
            console.log("error while fetching TASKS ", err);
        }
    }
    useEffect(() => {
        fetchTASKS();
    }, [])

    const deletetasks = async (id) => {
        try {
            const { success, message } = await deletetasksbyID(id);
            if (success) {
                notify("TASK deleted successfully", 'success');
            } else {
                notify(message, 'error');
            }
            fetchTASKS();

        }
        catch (err) {
            console.log("error while deleting TASKS ", err);
        }
    }

    const updateTask = async (id) => {
        const { _id, isDone, TaskName } = tasks.find((task) => task._id === id);
        const updatedTask = {
            TaskName: TaskName,
            isDone: !isDone
        }
        try {
            const { success, message } = await UpdateTaskByID(_id, updatedTask);
            if (success) {
                notify("TASK updated successfully", 'success');
            } else {
                notify(message, 'error');
            }
            fetchTASKS();
        }
        catch (err) {
            console.log("error while updating TASKS ", err);
        }
    }

    const handleupdate = async (_id, updatedTask) => {


        try {
            const { success, message } = await UpdateTaskByID(_id, updatedTask);
            if (success) {
                notify("TASK updated successfully", 'success');
            } else {
                notify(message, 'error');
            }
            setupdate(null);
            setInput('')
            fetchTASKS();

        }
        catch (err) {
            console.log("error while updating TASKS ", err);
        }
    }


    const handlesearch = (e) => {
        const searchvalue = e.target.value;
        const filteredtasks = copyTasks.filter((task) => task.TaskName.toLowerCase().includes(searchvalue.toLowerCase()));
        setTasks(filteredtasks);
    }

    return (
        <>
            <div className="d-flex flex-column align-items-center w-50 m-auto mt-5  ">
                <h1>TASK MANAGER APP</h1>

                {/* input and search bar */}
                <div className="d-flex justify-content-between align-items-center mb-4 w-100">
                    <div className="input-group flex-grow-1 me-2">
                        <input type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Enter task name"
                            className="form-control" />
                        <button
                            onClick={handletask}
                            className="btn btn-success"><FaPlus /></button>
                    </div>
                    <div

                        className="input-group flex-grow-1 me-2">

                        <span

                            onPointerEnter={(e) => e.target.style.cursor = "pointer"}
                            className="input-group-text bg-black text-white">

                            <FaSearch />
                        </span>

                        <input
                            onChange={handlesearch}
                            type="text"
                            className="form-control" placeholder="Search Task" />
                    </div>
                </div>

                {/* list of items */}

                <div className="d-flex flex-column w-100">
                    {
                        tasks && tasks.map((items) => (
                            <div key={items._id} className="m-2 p-2 border bg-light w-100 rounded-3 d-flex justify-content-between align-items-center">
                                <span className={items.isDone ? "text-decoration-line-through" : ""}>{items.TaskName}</span>

                                <div className="">
                                    <button
                                        onClick={() => { updateTask(items._id) }}
                                        className="btn btn-success btn-sm me-2"
                                        type="button"
                                    ><FaCheck />
                                    </button>

                                    <button
                                        onClick={(e) => { setupdate(items) }}
                                        className="btn btn-primary btn-sm me-2"
                                        type="button"
                                    ><FaPencilAlt />
                                    </button>

                                    <button
                                        onClick={() => deletetasks(items._id)}
                                        className="btn btn-danger btn-sm me-2"
                                        type="button"
                                    ><FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                />
            </div>

        </>
    )

}
export default TaskManager