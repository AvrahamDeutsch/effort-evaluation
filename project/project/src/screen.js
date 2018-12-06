


const redux = require('redux')
const createStore = redux.createStore;
const initialState = {component:[
    { category: 'web',
component:'Build Chat room\'s',
low_complexity: 2,
med_complexity: 3,
high_complexity: 4}]}



const rootReducer = (state = initialState,action)=>{
    return state;
};


store.dispatch ({type: 'PRINT_JSON'})


const store = createStore(rootReducer);
console.log(store.getState());


