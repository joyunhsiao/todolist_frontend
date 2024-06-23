import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StyledInput } from '../components'

export const LogIn: React.FC = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const [emailError, setEmailError] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string>('')

  const onEmailChange = (value: string) => setEmail(value)
  const onPasswordChange = (value: string) => setPassword(value)

  const handleLogIn = () => {
    let hasError = false
    setEmailError('')
    setPasswordError('')

    if (email.trim() === '') {
      setEmailError('此欄位不可為空')
      hasError = true
    }
    if (password.trim() === '') {
      setPasswordError('此欄位不可為空')
      hasError = true
    }

    if (hasError) return

    axios.post('/users/sign_in', { email, password }, {
      baseURL: 'https://todolist-api.hexschool.io/',
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => {
        if (response.data.status) {
          const token = response.data.token
          document.cookie = `token=${token}; path=/; max-age=86400`
          navigate('/')
        } else {
          console.error('Error:', response.data.message)
        }
      })
      .catch((error) => {
        console.error('There was an error!', error)
      })
  }

  return (
    <>
      <h2 className='auth_title logIn_title'>最實用的線上代辦事項服務</h2>
      <StyledInput
        id='email'
        label='Email'
        type='email'
        value={email}
        placeholder='請輸入 Email'
        errorMessage={emailError}
        onChange={onEmailChange}
      />
      <StyledInput
        id='password'
        label='密碼'
        type='password'
        value={password}
        placeholder='請輸入密碼'
        errorMessage={passwordError}
        onChange={onPasswordChange}
      />
      <div className='button_group'>
        <div>
          <button
            name='log_in'
            type='submit'
            className='button_primary'
            onClick={handleLogIn}
          >登入</button>
        </div>
        <div>
          <button
            type='button'
            className='button_secondary'
            onClick={() => navigate('/sign_in')}
          >註冊帳號</button>
        </div>
      </div>
    </>
  )
}