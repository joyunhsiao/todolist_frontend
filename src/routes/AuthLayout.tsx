import { Outlet } from 'react-router-dom'
import Img_Left from '../assets/images/left.svg'

export const AuthLayout: React.FC = () => {

  return (
    <div className='auth_container'>
      <h1 className='visually_hidden'>TodoList</h1>
      <img width='386px' src={Img_Left} alt='online todo list' />
      <div className='auth_right'>
        <Outlet />
      </div>
    </div>
  )
}