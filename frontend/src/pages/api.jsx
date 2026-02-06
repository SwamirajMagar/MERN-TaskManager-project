import { API_URL } from "./utilis"



export const CreateTask = async(taskobj)=>{
    const url = `${API_URL}/add`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(taskobj)
    };
    try{
        const result = await fetch (url, options);
        const data = await result.json();
        return data;
    }
    catch(err){
        console.log("error while creating task ", err);
    }
}

export const GetAllTasks = async()=>{

    const url = `${API_URL}/all`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try{
        const result = await fetch (url, options);
        const data = await result.json();
        return data;
    }
    catch(err){
        console.log("error while fetching all tasks ", err);
    }
}

export const deletetasksbyID = async(id)=>{
    const url = `${API_URL}/delete/${id}`;
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try{
        const result = await fetch (url, options);
        const data = await result.json();
        return data;
    }
    catch(err){
        console.log("error while fetching all tasks ", err);
    }
}

export const UpdateTaskByID = async(id, updatedTask)=>{
    const url = `${API_URL}/edit/${id}`;
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTask)
    };
    try{
        const result = await fetch (url, options);
        const data = await result.json();
        return data;
       

    }
    catch(err){
        console.log("error while updating task ", err);
    }
}