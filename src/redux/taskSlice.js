import { createSlice } from "@reduxjs/toolkit";


const taskSlice= createSlice({
    name:"Task",
    initialState:{
        taskList:[
            {
                id: "bf918610-762b-11ed-8566-0bc33375a453",
                title: "Explore Javascript",
                status: "C",
              },
              {
                id: "cd2c57a0-762b-11ed-8566-0bc33375a453",
                title: "Explore React.js",
                status: "P",
              },
        ]
    },
    reducers:{
        addTask:(state, action)=>{
            state.taskList.push(action.payload)
        },
        deleteTask: (state, action) => {
            const updatedList = state.taskList.filter(
              (ele) => ele.id !== action.payload
            );
            state.taskList = [...updatedList];
          },
          completeTask: (state, action) => {
            const updatedList = state.taskList.map((ele) =>
              ele.id === action.payload ? { ...ele, status: "C" } : ele
            );
            state.taskList = [...updatedList];
          },
    }
})

export const { addTask, deleteTask, completeTask} = taskSlice.actions;

export default taskSlice.reducer