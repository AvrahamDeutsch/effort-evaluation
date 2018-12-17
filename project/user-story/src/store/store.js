import { createStore } from 'redux'
import { createNewProject, getData, saveData, editData, deleteData } from './axios.js'



const state = {
    projects: [],
    category: [],
    taskContainer: []

}

const reduser = function (state = state, action) {
    var newState = { ...state }
    switch (action.type) {

        case "GET_ALL_PROJECTS":
            var url = `http://10.2.2.114:5000/api/project/allProjects`
            getData(url, "SAVE_ALL_DATA")
            return newState;

        case "SAVE_ALL_PROJECTS":
            var arr = []
            action.payload.arrayResult.map(elm => { arr.push({ type: elm, component: [] }) });
            newState.category = arr
            console.log('category :', newState.category);
            
            getData(url, 'FILL_CATEGORY')
            return newState;

    //     case 'FILL_CATEGORY':
    //         newState.category.map(category => {
    //             action.payload.arrayResult.map(component => {
    //                 if (component.category === category.type) {
    //                     category.component.push(component)
    //                 }
    //             })
    //             console.log(newState.category);
    //         })
    //         return newState

    //     case "SAVE_TASK_CONTAINER_DATA":
    //         var url = `http://10.2.1.106:8080/cm/save`
    //         saveData(url)
    //         console.log(action.payload);
    //         return newState;

    //     case "CREATE_NEW_PROJECT":
    //         console.log(action.payload);
    //         var url = `http://10.2.1.106:8080/cm/new_project`
    //         createNewProject(url, action.payload)
    //         return newState;


    // }
}
}
var store = createStore(reduser, state)
export default store

