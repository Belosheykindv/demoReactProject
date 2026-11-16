import type { Todo } from 'types/todo'

import { useState } from 'react'
import { connect } from 'react-redux'
import { withAuthRedirect } from '@hoc/withAuthRedirect'
import { withRouter } from '@hoc/withRouter'
import { addNewTodo, checkTodo, delNewTodo } from '@redux/todoReducer'
import { Form as AntDForm, Button, Input } from 'antd'
import { compose } from 'redux'

import s from '@components/ToDO/todo.module.scss'

type TodoFormValues = {
  postInput: string
}

type TodoListProps = {
  toDos: Todo[]
  addNewTodo: (text: string) => void
  checkTodo: (event: React.ChangeEvent<HTMLInputElement>) => void
  delNewTodo: (todo: Todo) => void
}

const ToDolist = (props: TodoListProps) => {
  const [isActive, setIsActive] = useState(false)
  const [form] = AntDForm.useForm<TodoFormValues>()

  const onFinish = (values: TodoFormValues) => {
    props.addNewTodo(values.postInput)
    form.resetFields(['postInput'])
    setIsActive(false)
  }

  const onFinishFailed = (
    errorInfo: Parameters<NonNullable<React.ComponentProps<typeof AntDForm>['onFinishFailed']>>[0],
  ) => {
    console.log('Failed:', errorInfo)
  }

  const buttonHandler = (value: string) => {
    setIsActive(value !== '')
  }

  return (
    <div className={s.todoMain}>
      <h1>ToDo List</h1>
      <div>
        <AntDForm
          className={s.todoInputBlock}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
        >
          <AntDForm.Item name='postInput' className={s.todoInput}>
            <Input
              name='postInput'
              showCount={true}
              placeholder='Введите новую задачу'
              onInput={(event) => buttonHandler(event.currentTarget.value)}
            />
          </AntDForm.Item>
          <AntDForm.Item className={s.todoBtnBlock}>
            <Button type='primary' disabled={!isActive} htmlType='submit'>
              Добавить
            </Button>
          </AntDForm.Item>
        </AntDForm>
        {props.toDos.length > 0 ? (
          <div>
            <ul>
              {props.toDos.map((todo) => (
                <div key={todo.id} className={s.todoList}>
                  <div className={s.todoItemStandart}>
                    <input
                      className={s.inputCB}
                      type='checkbox'
                      checked={todo.isChecked}
                      id={todo.id}
                      onChange={props.checkTodo}
                    />
                    <li>{todo.text}</li>
                    <Button ghost={true} onClick={() => props.delNewTodo(todo)}>
                      ❌
                    </Button>
                  </div>
                </div>
              ))}
            </ul>
          </div>
        ) : (
          <p>Всё сделано? Такого быть не может, добавь задачу!</p>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = (state: { todo: { toDos: Todo[] } }) => ({
  toDos: state.todo.toDos,
})

export const TodoComponent = compose(
  connect(mapStateToProps, { addNewTodo, delNewTodo, checkTodo }),
  withRouter,
  withAuthRedirect,
)(ToDolist) as React.ComponentType
