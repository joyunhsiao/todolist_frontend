import React, { useState } from 'react'
import { StyledInput } from '../components'
import { useNavigate } from 'react-router-dom'

export const LogIn: React.FC = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const [emailError, setEmailError] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string>('')

  const onEmailChange = (value: string) => setEmail(value)
  const onPasswordChange = (value: string) => setPassword(value)

  const handleLogin = () => {
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
    console.log('submit login')
    navigate('/')
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
            onClick={handleLogin}
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