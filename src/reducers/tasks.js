import * as types from './../contains/ActionType'
import { v1 as uuidv1 } from 'uuid';
let data = JSON.parse(localStorage.getItem('tasks'));
var initialState = data ? data : [];
var index = 0
var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LIST_ALL:
            return state;
        case types.SAVE_TASK:
            var task = {
                id: action.task.id,
                name: action.task.name,
                status: action.task.status
            }
            if (!task.id) {
                task.id = uuidv1();
                state.push(task);
            }else {
                index = state.findIndex(item => item.id === task.id);
                state[index] = task;
            }
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        case types.UPDATE_STATUS_TASK:
            console.log(action);
            index = state.findIndex(item => item.id === action.id);
            state[index] = {
                ...state[index],
                status: !state[index].status
            };
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        case types.DELETE_TASK:
            index = state.findIndex(item => item.id === action.id);
            state.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        default:
            return state;
    }

}

export default myReducer;