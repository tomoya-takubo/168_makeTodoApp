import './style.css';
import { useState } from 'react';
// ↑オートで挿入されなかった

export const Todo = () => {

  const [todoText, setTodoText] = useState("")
  const [incompleteTodos, setIncompleteTodos] = useState([])
  const [incompleteTodoId, setIncompleteTodoId] = useState(incompleteTodos.length + 1)
  const [completeTodos, setCompleteTodos] = useState([])
  const [completeTodoId, setCompleteTodoId] = useState(completeTodos.length + 1)

  const onChangeTodoText = (event) => setTodoText(event.target.value)

  const onClickAdd = () => {
    if(todoText === "") return
    const newTodos= [...incompleteTodos, {incompleteTodoId, todoText}]
    setIncompleteTodos(newTodos)
    setTodoText("")

    setIncompleteTodoId(incompleteTodoId + 1)
    console.log(newTodos)
  }

  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos]
    newTodos.splice(index, 1)
    setIncompleteTodos(newTodos)
  }

  const onClickComplete = (index) => {
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]]
    setCompleteTodos(newCompleteTodos)

    const newIncompleteTodos = [...incompleteTodos]
    newIncompleteTodos.splice(index, 1)
    setIncompleteTodos(newIncompleteTodos)
    setCompleteTodoId(completeTodoId + 1)

    console.log(completeTodoId)
  }

  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos]
    newCompleteTodos.splice(index, 1)

    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]]
    setCompleteTodos(newCompleteTodos)
    setIncompleteTodos(newIncompleteTodos)
  }

  return (
    <>
      <div className='input-area'>
        <input placeholder='TODOを入力' value={todoText} onChange={onChangeTodoText}/>
        <button onClick={onClickAdd}>追加</button>
      </div>

      <div className='incomplete-area'>
        <p className='title'>未完了のTODO</p>
        <ul>
          {incompleteTodos.map((todo) => {
            return(
              <li key={todo.incompleteTodoId} style={{listStyle: 'none'}}>
                <div className='list-row'>
                  <p className='todo-item'>{todo.incompleteTodoId}. {todo.todoText}</p>
                  <button onClick={() => onClickComplete(todo.incompleteTodoId)}>完了</button>
                  <button onClick={() => onClickDelete(todo.incompleteTodoId)}>削除</button>
                </div>
              </li>
            )
          })}
        </ul>
      </div>

      <div className='complete-area'>
        <p className='title'>完了のTODO</p>
        <ul>
          {completeTodos.map((todo, index) => {
            return (
              <li key={todo}>
                <div className='list-row'>
                  <p className='todo-item'>{todo}</p>
                  <button onClick={() => onClickBack(index)}>戻す</button>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
