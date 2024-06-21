import { Navigate } from 'react-router-dom'

export const TodoList: React.FC = () => {
  const hasAuth = true
  if (!hasAuth) return <Navigate to='log_in' replace={true} />

  return (
    <>
      <div className='todolist_container'>
        <h1 className='visually_hidden'>TodoList</h1>
        <header className='todolist_header'>
          <img src='/images/logo.svg' alt='online todo list' />
          <div className='todolist_headerRight'>
            <p>王小明的待辦</p>
            <a href='/log_in'>登出</a>
          </div>
        </header>
        <main>
          <div className='addTodo_box'>
            <input type='text' name='addTodo_box_input' id='addTodo_input' className='addTodo_input' placeholder='新增待辦事項'/>
            <button name='addTodo_button' type='submit' className='addTodo_button'>
              <img src='/images/plus.svg' alt='Add todo' />
            </button>
          </div>
          <p className='noTodo_text'>目前尚無待辦事項</p>
          <img className='noTodo_img' src='/images/empty.svg' alt='There is currently no to-do list' />
        </main>
      </div>
    </>
  )
}