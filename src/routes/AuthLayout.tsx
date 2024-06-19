import { Outlet } from 'react-router-dom'

export const AuthLayout: React.FC = () => {

  return (
    <div className='auth_container'>
      <img src='/images/left.svg' alt='online todo list' />
      <div className='auth_right'>
        <Outlet />
      </div>
    </div>
  )
}