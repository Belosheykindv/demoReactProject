import { v1 } from 'uuid'
const ADD_TODO = 'ADD_TODO';
const DEL_TODO = 'DEL_TODO';
const CHECK_TODO = 'CHECK_TODO'
let initialReducer = {
    toDos: []
}

const todoReducer = (state = initialReducer, action) => {

    switch (action.type) {
        case ADD_TODO: {
            let newTodo = {
                id: v1(),
                text: action.data,
                isChecked: false
            };
            return {
                ...state,
                toDos: [...state.toDos, newTodo],
                newTodo: ''
            };
        }
        case DEL_TODO: {
            return {
                ...state,
                toDos: state.toDos.filter(p => p.id != action.data.id)
            }
        }
        case CHECK_TODO: {
            let stateCopy = {
                ...state,
                toDos: [...state.toDos]
            };
            let toDo = stateCopy.toDos.find(p => p.id === action.data.currentTarget.id)
            if (toDo.isChecked === false) { toDo.isChecked = true } else  { toDo.isChecked = false }

            return stateCopy;
        }
        default: return state;
    }
}
export const addTodoAC = (data) => {
    return { type: ADD_TODO, data }
}
export const delTodoAC = (data) => {
    return { type: DEL_TODO, data }
}
export const checkedTodo = (data) => {
    return { type: CHECK_TODO, data }
}
export const addNewTodo = (todo) => (dispatch) => {
    dispatch(addTodoAC(todo))
}
export const delNewTodo = (todo) => (dispatch) => {
    dispatch(delTodoAC(todo))
}
export const checkTodo = (todo) => (dispatch) => {
    dispatch(checkedTodo(todo))
}
export default todoReducer;
