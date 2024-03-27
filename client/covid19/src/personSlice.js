import {createSlice } from "@reduxjs/toolkit";
const initialState={
    person:{address:{}}
    
}
 const personSlice=createSlice({
    name:"personSlice",
    initialState,
    reducers:{
        setPerson:(state,action)=>{
            state.person=action.payload;
    
        },
        
        resetPerson:(state)=>{
            state.person={address:{}};
            
            
        },
       
       
    
    }
})
 export const {setPerson,resetPerson}=personSlice.actions;
 export default personSlice.reducer;