/* eslint-disable @typescript-eslint/no-explicit-any */
import { v1 } from 'uuid'

const ADD_TODO = 'ADD_TODO'
const DEL_TODO = 'DEL_TODO'
const CHECK_TODO = 'CHECK_TODO'
const initialReducer = {
  toDos: [],
}

const todoReducer = (state = initialReducer, action: any) => {
  switch (action.type) {
    case ADD_TODO: {
      const newTodo = {
        id: v1(),
        text: action.data,
        isChecked: false,
      }
      return {
        ...state,
        toDos: [...state.toDos, newTodo],
        newTodo: '',
      }
    }
    case DEL_TODO: {
      return {
        ...state,
        toDos: state.toDos.filter((p: any) => p.id != action.data.id),
      }
    }
    case CHECK_TODO: {
      const stateCopy = {
        ...state,
        toDos: [...state.toDos],
      }
      const toDo: any = stateCopy.toDos.find((p: any) => p.id === action.data.currentTarget.id)
      console.log('todo', state)
      if (toDo.isChecked === false) {
        toDo.isChecked = true
      } else {
        toDo.isChecked = false
      }

      return stateCopy
    }
    default:
      return state
  }
}
export const addTodoAC = (data: any) => {
  return { type: ADD_TODO, data }
}
export const delTodoAC = (data: any) => {
  return { type: DEL_TODO, data }
}
export const checkedTodo = (data: any) => {
  return { type: CHECK_TODO, data }
}
export const addNewTodo = (todo: any) => (dispatch: any) => {
  dispatch(addTodoAC(todo))
}
export const delNewTodo = (todo: any) => (dispatch: any ) => {
  dispatch(delTodoAC(todo))
}
export const checkTodo = (todo: any) => (dispatch: any) => {
  dispatch(checkedTodo(todo))
}
export default todoReducer
