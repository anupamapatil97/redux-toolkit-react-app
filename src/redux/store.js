import { configureStore } from "@reduxjs/toolkit";
import TaskReducer from "./taskSlice"

export default configureStore({
    reducer:{
        task : TaskReducer
    }
})

