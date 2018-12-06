import { createStore } from 'redux'
import { createNewProject, getData, saveData, editData, deleteData } from './axios.js'

import projectManager from "../projectManager.js"


const state = {
    projects: [],
    category: []

}

const reduser = async function (state = state, action) {
    var newState = { ...state }
    switch (action.type) {

        case "GET_ALL_DATA":
            var url = `http://10.2.1.106:8080/app/category_value_list`
            getData(url, "SAVE_ALL_DATA")
            return newState;

        case "SAVE_ALL_DATA":
            var arr = []
            action.payload.arrayResult.map(elm => {arr.push({ [elm]: [] }) });
            newState.category = arr
            console.log('category :', newState.category);
            var url =  'http://10.2.1.106:8080/app'
            await getData(url,'FILL_CATEGORY')
            return newState;

        case 'FILL_CATEGORY':
    //    "" לסדר את הפונקציה הזו שתמלא את מערך הקטגוריות עם קומפוננטות בהתאמה.""
            action.payload.arrayResult.map(elm=>elm.category === newState.category ? newState.category.push(elm):null
                
            )
           
            
            
        return newState

        case "SAVE_TASK_CONTAINER_DATA":
            var url = `http://10.2.1.106:8080/cm/save`
            saveData(url)
            console.log(action.payload);
            return newState;

        case "CREATE_NEW_PROJECT":
            console.log(action.payload);
            var url = `http://10.2.1.106:8080/cm/new_project`
            createNewProject(url, action.payload)
            return newState;


    }
}

var store = createStore(reduser, state)
export default store

