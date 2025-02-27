import React from "react";
import { useState } from "react";
import s from './todo.module.scss';
import { Button, Input, Form as AntDForm } from 'antd';
import { withRouter } from "../../Hoc/withRouter";
import { withAuthRedirect } from "../../Hoc/withAuthRedirect";
import { addNewTodo, delNewTodo, checkTodo } from "../../Redux/todoReducer";
import { compose } from "redux";
import { connect } from "react-redux";
import { Collapse } from "antd";
const { TextArea } = Input
const ToDolist = (props) => {
    const [isActive, setIsActive] = useState(false)
    const [form] = AntDForm.useForm();
    const onFinish = (values) => {
        props.addNewTodo(values.postInput);
        form.resetFields(['postInput'])
        setIsActive(false)
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    const buttonHandler = (e) => {
        if (e == '') { setIsActive(false) }
        else
            setIsActive(true)
    }

    return <div className={s.todoMain}>
        <h1>ToDo List</h1>
        <div >

            {/* <Input
                    showCount maxLength={60}
                    type='text'
                    onChange={(e) => setToDo(e.target.value)}
                    placeholder="Create new toDo"
                    name="todo"
                    value={props.toDos.text} />
                <button onClick={addToDo} > Add </button> */}
            <AntDForm className={s.todoInputBlock} onFinish={onFinish} onFinishFailed={onFinishFailed} form={form}  >
                <AntDForm.Item name={"postInput"} className={s.todoInput}>
                    <Input name={'postInput'} showCount={true} placeholder="Введите новую задачу" onInput={(e) => { buttonHandler(e.currentTarget.value) }} />
                    {/* <TextArea name={'postInput'} showCount onChange={(e) => { buttonHandler(e.currentTarget.value) }} placeholder="Введите новую задачу" /> */}
                </AntDForm.Item>
                <AntDForm.Item className={s.todoBtnBlock}>
                    <Button type='primary' disabled={isActive != true} htmlType="submit">Добавить</Button>
                </AntDForm.Item>
            </AntDForm>
            {props.toDos?.length > 0 ? (
                <div>
                    <ul >
                        {props.toDos.map((t) =>

                            <div key={t.id} className={s.todoList} >
                                <div className={s.todoItemStandart}>
                                    <input className={s.inputCB} type="checkbox" checked={t.isChecked} id={t.id} onChange={props.checkTodo} />

                                    <li >{t.text}</li>
                                    <Button ghost={true} onClick={() => props.delNewTodo(t)}>❌</Button>
                                </div>
                                {/* <div >
                                <Collapse  style={{ width: '700px' }} items={[{
                                    key: '1',
                                    label: `${t.text}`,
                                    children:
                                        <div key={t.id} className={s.todoItemCollapse}  >
                                            <input className={s.inputCB} type="checkbox" checked={t.isChecked} id={t.id} onChange={props.checkTodo} />
                                            <li >{t.text}</li>
                                            <Button ghost={true} onClick={() => props.delNewTodo(t)}>❌</Button>
                                        </div>,
                                }]} />
                            </div> */}
                            </div>
                        )}

                    </ul>
                </div>)
                : (<p>Всё сделано? Такого быть не может, добавь задачу!</p>)
            }
        </div>
    </div>

}
const mapStateToProps = (state) => ({
    toDos: state.todo.toDos
})
export default compose(
    connect(mapStateToProps, { addNewTodo, delNewTodo, checkTodo }),
    withRouter,
    withAuthRedirect
)(ToDolist)