import axios from 'axios'
import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Img_Checkbox_False from '../assets/images/checkbox_false.svg'
import Img_Checkbox_True from '../assets/images/checkbox_true.svg'
import Img_Close from '../assets/images/close.svg'
import Img_Empty from '../assets/images/empty.svg'
import Img_Logo from '../assets/images/logo.svg'
import Img_Plus from '../assets/images/plus.svg'
import { getCookie } from '../utils'

export const TodoList: React.FC = () => {
  const token = getCookie('token')
  const navigate = useNavigate()
  const isChecked = true
  const [isListEmpty, setIsListEmpty] = useState<boolean>(false)
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null)
  
  const handleLogOut = async () => {
    axios.post('/users/sign_out', {}, {
      baseURL: 'https://todolist-api.hexschool.io/',
      headers: { 'Content-Type': 'application/json', 'authorization': token }
    })
      .then((response) => {
        if (response.data.status) {
          document.cookie = 'token=; path=/; max-age=0'
          navigate('/log_in')
        } else {
          console.error('Error:', response.data.message)
        }
      })
      .catch((error) => {
        console.error('There was an error!', error)
      })
  }

  useEffect(() => {
    // Check whether the token passes verification
    axios.get('/users/checkout', {
      baseURL: 'https://todolist-api.hexschool.io/',
      headers: { 'Content-Type': 'application/json', 'authorization': token }
    })
      .then((response) => {
        if (response.data.status) {
          setIsTokenValid(response.data.status)
        } else {
          console.error('Error:', response.data.message)
        }
      })
      .catch((error) => {
        console.error('There was an error!', error)
      })
  }, [token])

  if (isTokenValid === false) {
    return <Navigate to='/log_in' replace />
  }

  return (
    <>
      <div className='todolist_container'>
        <h1 className='visually_hidden'>TodoList</h1>
        <header className='todolist_header'>
          <img src={Img_Logo} alt='online todo list' />
          <div className='todolist_headerRight'>
            <p>王小明的待辦</p>
            <button type='button' onClick={handleLogOut}>登出</button>
          </div>
        </header>
        <main className='todolist_main'>
          <div className='addTodo_box'>
            <input type='text' name='addTodo_box_input' id='addTodo_input' className='addTodo_input' placeholder='新增待辦事項'/>
            <button name='addTodo_button' type='submit' className='addTodo_button'>
              <img src={Img_Plus} alt='Add todo' />
            </button>
          </div>
          {isListEmpty ? <>
            <p className='noTodo_text'>目前尚無待辦事項</p>
            <img className='noTodo_img' src={Img_Empty} alt='There is currently no to-do list' />
          </> : <>
            <div className='todolist_table'>
              <ul className='todolist_table_header'>
                <li className='active'>全部</li>
                <li>待完成</li>
                <li>已完成</li>
              </ul>
              <ul className='todolist_table_body'>
                <li>
                  <div className='list_main'>
                    <label htmlFor='temp'>
                      <input type='checkbox' name='temp' id='temp' />
                      <img src={isChecked ? Img_Checkbox_True : Img_Checkbox_False} alt={isChecked ? 'This item is checked' : 'This item is not checked'} />
                      待辦事項
                    </label>
                  </div>
                  <button type='button'>
                    <img src={Img_Close} alt='Delete todo' />
                  </button>
                </li>
              </ul>
              <div className='todolist_table_footer'>
                <p>5 個待完成項目</p>
                <a href='#'>清除已完成項目</a>
              </div>
            </div>
          </>}
        </main>
      </div>
    </>
  )
}