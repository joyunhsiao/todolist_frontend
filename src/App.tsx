import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { AuthLayout, ErrorPage, LogIn, SignIn, TodoList } from './routes'

const router = createBrowserRouter(
  createRoutesFromElements(<>
    <Route path='/' element={<TodoList />} />
    <Route element={<AuthLayout />}>
      <Route path='log_in' element={<LogIn />} />
      <Route path='sign_in' element={<SignIn />} />
    </Route>
    <Route path='*' element={<ErrorPage />} />
  </>)
)

export const App = () => {
  return ( <RouterProvider router={router} /> )
}
