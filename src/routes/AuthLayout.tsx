import { Outlet } from 'react-router-dom'

export const AuthLayout: React.FC = () => {

  return (
    <>
      <h1>AuthLayout</h1>
      <Outlet />
    </>
  )
}