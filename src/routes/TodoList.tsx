import { Navigate, useNavigate } from 'react-router-dom'
import Img_Logo from '../assets/images/logo.svg'
import Img_Plus from '../assets/images/plus.svg'
import Img_Empty from '../assets/images/empty.svg'

export const TodoList: React.FC = () => {
  const navigate = useNavigate()
  const hasAuth = true
  if (!hasAuth) return <Navigate to='log_in' replace={true} />

  return (
    <>
      <div className='todolist_container'>
        <h1 className='visually_hidden'>TodoList</h1>
        <header className='todolist_header'>
          <img src={Img_Logo} alt='online todo list' />
          <div className='todolist_headerRight'>
            <p>王小明的待辦</p>
            <button type='button' onClick={() => navigate('/log_in')}>登出</button>
          </div>
        </header>
        <main>
          <div className='addTodo_box'>
            <input type='text' name='addTodo_box_input' id='addTodo_input' className='addTodo_input' placeholder='新增待辦事項'/>
            <button name='addTodo_button' type='submit' className='addTodo_button'>
              <img src={Img_Plus} alt='Add todo' />
            </button>
          </div>
          <p className='noTodo_text'>目前尚無待辦事項</p>
          <img className='noTodo_img' src={Img_Empty} alt='There is currently no to-do list' />
        </main>
      </div>
    </>
  )
}