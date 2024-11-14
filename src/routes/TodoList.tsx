import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Img_Checkbox_False from '../assets/images/checkbox_false.svg'
import Img_Checkbox_True from '../assets/images/checkbox_true.svg'
import Img_Close from '../assets/images/close.svg'
import Img_Empty from '../assets/images/empty.svg'
import Img_Logo from '../assets/images/logo.svg'
import Img_Plus from '../assets/images/plus.svg'
import { getCookie } from '../utils'

interface TodoItem {
  id: string;
  createTime: number;
  content: string;
  status: boolean;
}

export const TodoList: React.FC = () => {
  const token = getCookie('token')
  const navigate = useNavigate()
  const [listData, setListData] = useState<TodoItem[]>([])
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null)
  const [addTodoValue, setAddTodoValue] = useState<string>('')
  const [activeTab, setActiveTab] = useState<number>(0)

  const handleTabClick = (event: React.MouseEvent<HTMLAnchorElement>, tabNum: number) => {
    event.preventDefault()
    setActiveTab(tabNum)
  }

  const handleTodoAdd = () => {
    axios.post('/todos', { 'content': addTodoValue }, {
      baseURL: 'https://todolist-api.hexschool.io/',
      headers: { 'Content-Type': 'application/json', 'authorization': token }
    })
      .then((response) => {
        if (response.data.status) {
          getTodos()
        } else {
          console.error('Error:', response.data.message)
        }
      })
      .catch((error) => {
        console.error('There was an error!', error)
      })
  }

  const handleTodoToggle = (id: string) => {
    axios.patch(`/todos/${id}/toggle`, {}, {
      baseURL: 'https://todolist-api.hexschool.io/',
      headers: { 'Content-Type': 'application/json', 'authorization': token }
    })
      .then((response) => {
        if (response.data.status) {
          getTodos()
        } else {
          console.error('Error:', response.data.message)
        }
      })
      .catch((error) => {
        console.error('There was an error!', error)
      })
  }

  const handleClearCompleted = () => {
    listData.filter(item => item.status).forEach(item => handleTodoDelete(item.id))
  }
  
  const handleTodoDelete = (id: string) => {
    axios.delete(`/todos/${id}`, {
      baseURL: 'https://todolist-api.hexschool.io/',
      headers: { 'Content-Type': 'application/json', 'authorization': token }
    })
      .then((response) => {
        if (response.data.status) {
          getTodos()
        } else {
          console.error('Error:', response.data.message)
        }
      })
      .catch((error) => {
        console.error('There was an error!', error)
      })
  }

  const handleLogOut = async () => {
    axios.post('/users/sign_out', {}, {
      baseURL: 'https://todolist-api.hexschool.io/',
      headers: { 'Content-Type': 'application/json', 'authorization': token }
    })
      .finally(() => {
        document.cookie = 'token=; path=/; max-age=0'
        navigate('/log_in')
      })
  }

  const getTodos = useCallback(() => axios.get('/todos', {
    baseURL: 'https://todolist-api.hexschool.io/',
    headers: { 'Content-Type': 'application/json', 'authorization': token }
  })
    .then((response) => {
      if (response.data.status) {
        setListData(response.data.data)
        setAddTodoValue('')
      } else {
        console.error('Error:', response.data.message)
      }
    })
    .catch((error) => {
      console.error('There was an error!', error)
    }), [token])

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
          setIsTokenValid(false)
          document.cookie = 'token=; path=/; max-age=0'
          navigate('/log_in')
        }
      })
      .catch((error) => {
        console.error('There was an error!', error)
        setIsTokenValid(false)
        document.cookie = 'token=; path=/; max-age=0'
        navigate('/log_in')
      })

    getTodos()
  }, [getTodos, navigate, token])

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
            <p>{getCookie('nickname')}的待辦</p>
            <button type='button' onClick={handleLogOut}>登出</button>
          </div>
        </header>
        <main className='todolist_main'>
          <div className='addTodo_box'>
            <input type='text' name='addTodo_box_input' id='addTodo_input' className='addTodo_input' placeholder='新增待辦事項' value={addTodoValue} onChange={e => setAddTodoValue(e.target.value)}/>
            <button name='addTodo_button' type='submit' className='addTodo_button' onClick={handleTodoAdd}>
              <img src={Img_Plus} alt='Add todo' />
            </button>
          </div>
          {listData.length === 0 ? <>
            <p className='noTodo_text'>目前尚無待辦事項</p>
            <img className='noTodo_img' src={Img_Empty} alt='There is currently no to-do list' />
          </> : <>
            <div className='todolist_table'>
              <ul className='todolist_table_header'>
                <li>
                  <a
                    href='#'
                    className={activeTab === 0 ? 'active' : ''}
                    onClick={(e) => handleTabClick(e, 0)}
                  >
                    全部
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className={activeTab === 1 ? 'active' : ''}
                    onClick={(e) => handleTabClick(e, 1)}
                  >
                    待完成
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className={activeTab === 2 ? 'active' : ''}
                    onClick={(e) => handleTabClick(e, 2)}
                  >
                    已完成
                  </a>
                </li>
              </ul>
              <ul className='todolist_table_body'>
                {listData.filter(item => activeTab === 0 ? true : activeTab === 1 ? !item.status : item.status).map(item => 
                  <li key={item.id}>
                    <div className='list_main'>
                      <label htmlFor={item.id}>
                        <input type='checkbox' name={item.id} id={item.id} onClick={() => handleTodoToggle(item.id)}/>
                        <img src={item.status ? Img_Checkbox_True : Img_Checkbox_False} alt={item.status ? 'This item is checked' : 'This item is not checked'} />
                        {item.content}
                      </label>
                    </div>
                    <button type='button' onClick={() => handleTodoDelete(item.id)}>
                      <img src={Img_Close} alt='Delete todo' />
                    </button>
                  </li>
                )}
              </ul>
              <div className='todolist_table_footer'>
                <p>
                  {activeTab === 0
                    ? `${listData.length} 個項目`
                    : activeTab === 1
                      ? `${listData.filter(item => !item.status).length} 個待完成項目`
                      : `${listData.filter(item => item.status).length} 個已完成項目`}
                </p>
                <a href='#' onClick={handleClearCompleted}>清除已完成項目</a>
              </div>
            </div>
          </>}
        </main>
      </div>
    </>
  )
}