import React, { useState } from "react";
import { create, act } from "react-test-renderer";
import ProfileFuncStatus from "./ProfileStatus";
// const ProfileFuncStatus = (props) => {
//     const [editMode, setEditMode] = useState(false)
//     const [status, setStatus] = useState(props.status)
//     const activateEditMode = () => {
//         if (!props.userId) {
//             setEditMode(true)
//         }
//     }
//     const deActivateEditMode = () => {
//         setEditMode(false)
//         props.updateUserProfileStatus(status)
//     }
//     const onStatusChange = (e) => {
//         setStatus(e.currentTarget.value)
//     }
//     // useEffect(() => { setStatus(props.status) }, [props.status])
//     return <div>
//         {!editMode &&
//             <div>
//                 <span
//                     onClick={activateEditMode}
//                 ><b>Статус -</b> {props.status || 'пусто'}</span>
//             </div>
//         }
//         {
//             editMode &&
//             <div >
//                 <input
//                     onChange={onStatusChange}
//                     autoFocus={true}
//                     defaultValue={props.status}></input>
//                 <button onClick={deActivateEditMode}>Сохранить</button>
//             </div>
//         }
//     </div >
// }

describe('profileStatus component', () => {
    test('Span отрисовался', () => {
        const component = create(<ProfileFuncStatus status='Status from props' />)
        const instance = component.root
        const span = instance.findByType("span")
        // expect(span.props.children[1]).not.toBe('')
        expect(span).not.toBeNull()
    })
    test('Input не отрисовался', () => {
        const component = create(<ProfileFuncStatus status='Status from props' />)
        const instance = component.root

        // expect(span.props.children[1]).not.toBe('')
        expect(() => {
            let input = instance.findByType("input")
        }).toThrow()
    })
    test('пропсы прокидываются в статус', () => {
        const component = create(<ProfileFuncStatus status='Status from props' />)
        const instance = component.root
        const span = instance.findByType("span")
        const b = instance.findByType('b')
        const spanText = b.props.children + span.props.children[1]
        expect(spanText).toBe('Статус - ' + 'Status from props')
    })

    test('по нажатию на span происходит отображается инпут', () => {
        let component
        act(() => {
            component = create(<ProfileFuncStatus status='Bla Bla' />)
        })
        const instance = component.root
        const span = instance.findByType("span")
        const div = instance.findByType("div")
        act(() => {
            span.props.onClick()
        })
        const input = instance.findByType("input")
        expect(input.props.defaultValue).toBe('Bla Bla')
    })
    test('по нажатию на кнопку Сохранить исчезает инпут и появляется спан', () => {
        let component
        act(() => {
            component = create(<ProfileFuncStatus status='Bla Bla' updateUserProfileStatus={() => { }} />)
        })
        const instance = component.root
        let span = instance.findByType("span")
        act(() => {
            span.props.onClick()
        })
        const button = instance.findByType("button")
        act(() => {
            button.props.onClick()
        })
        let span2 = instance.findByType("span")
        expect(() => {
            let input = instance.findByType("input")
        }).toThrow()
        expect(span2).not.toBeNull()
    })
    test('Callback активировался', () => {
        const mockCallback = jest.fn()
        let component = create(<ProfileFuncStatus status='Status from props' updateUserProfileStatus={mockCallback} />)
        const instance = component.root
        let span = instance.findByType("span")
        act(() => {
            span.props.onClick()
        })
        const button = instance.findByType('button')
        act(()=>{
            button.props.onClick()
        })

        expect(mockCallback.mock.calls.length).toBe(1)
    })
})